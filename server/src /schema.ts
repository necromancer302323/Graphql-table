export const typeDefs = `#graphql
    type Game{
        id:ID!
        title:String!
        platform:[String!]!
    }

    type User{
        id:ID!,
        email:String!,
        password:String!
    }

    type Query{
        user(email:String!,password:String!):User!
        games:[Game]
        addUser(email:String!,password:String!):User!
    }
`;
