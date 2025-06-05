import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { typeDefs } from "./schema";
import db from "./db";
import jwt, { JwtPayload } from "jsonwebtoken";

const JWT_SECRET = "1122";
const app = express();
const resolvers = {
  Query: {
    games(_: any, __: any, context) {
      if (!context.user) {
        throw new Error("Unauthorized");
      }

      return db.games;
    },
    user(_, args: any, { res }) {
      const user = db.user.find((user) => {
        return user.email === args.email && user.password === args.password;
      });
      if (!user) {
        throw new Error("Invalid credentials");
      }

      const token = jwt.sign({ userId: user.id }, JWT_SECRET);
      res.setHeader("Set-Cookie", `token=${token};HttpOnly; Path=/;`);

      return user;
    },
  },
  Mutation: {
    addUser(_, args: any) {
      //@ts-ignore
      db.user.push({
        id: Math.floor(1 + Math.random() * 3).toString(),
        email: args.email,
        password: args.password,
      });
      return db.user[db.user.length - 1];
    },
  },
};
const server = new ApolloServer({
  typeDefs,
  resolvers,
});
await server.start();
app.use(
  "/graphql",
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
  bodyParser.json(),
  expressMiddleware(server, {
    context: async ({ req, res }) => {
      const rawCookies = req.headers.cookie || "";
      const token = rawCookies
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];
      if (token) {
        try {
          const decoded = jwt.verify(token, JWT_SECRET);
          if (typeof decoded === "object" && "userId" in decoded) {
            const user = db.user.find((e) => e.id == decoded.userId);

            if (user) {
              return { req, res, user };
            }
          }
        } catch (err) {
          console.log("JWT verification error:", err.message);
        }
      }
      return { req, res };
    },
  })
);
app.listen(4000, () => {
  console.log("🚀 Server ready at http://localhost:4000/graphql");
});
