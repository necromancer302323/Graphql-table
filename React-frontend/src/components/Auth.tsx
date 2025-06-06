import { gql, useLazyQuery } from "@apollo/client";
import { type ChangeEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const Auth = ({ type }: { type: "signup" | "signin" }) => {
  const navigate = useNavigate();
  const [postInput, setPostInputs] = useState({
    name: "",
    email: "",
    password: "",
  });
  const email = postInput.email;
  const password = postInput.password;
  const getUser = gql`
    query Signin($email: String!, $password: String!) {
      user(email: $email, password: $password) {
        email
        password
        id
      }
    }
  `;
  const addUser = gql`
    query Signup($email: String!, $password: String!) {
      addUser(email: $email, password: $password) {
        email
        password
        id
      }
    }
  `;
  const [getingUser, { data: Userdata }] = useLazyQuery(getUser);
  const [addingUser, { data: addingUserData }] = useLazyQuery(addUser);
    useEffect(()=>{
     if(Userdata!=undefined||addingUserData){
      type=="signin"?navigate("/"):navigate("/signin")
    }
  },[Userdata,addingUserData])
  function gettingUsersData() {
    getingUser({
      variables: {
        email,
        password,
      },
    });
  }
  function additionOfUser() {
    addingUser({
      variables: {
        email,
        password,
      },
    });
    console.log(addingUserData);
  }
  async function sendRequest() {
    try {
      {
        type == "signin" ? gettingUsersData() : additionOfUser();
      }
    } catch (e) {
      alert("an error has happend");
    }
  }

  return (
    <div className="h-screen  flex justify-center flex-col">
      <div className="flex justify-center">
        <div className="px-10 flex flex-col gap-3">
          <div>
            <div className="text-3xl font-extrabold">
              {type == "signup" ? "Create an account" : "Login to your account"}
            </div>
            <div className="text-slate-400 ">
              {type == "signin"
                ? "Don't have an account?"
                : "Already have an account?"}
              <Link
                className="px-5"
                to={type == "signin" ? "/signup" : "/signin"}
              >
                {type == "signin" ? "Sign up" : "Sign in"}
              </Link>
            </div>
          </div>

          {type == "signup" ? (
            <LabbledInput
              Label="Name"
              Placeholder="aaryan"
              type=""
              onChange={(e) => {
                setPostInputs({
                  ...postInput,
                  name: e.target.value,
                });
              }}
            />
          ) : null}
          <LabbledInput
            Label="Email"
            Placeholder="example@gmail.com"
            type=""
            onChange={(e) => {
              setPostInputs({
                ...postInput,
                email: e.target.value,
              });
            }}
          />
          <LabbledInput
            Label="password"
            Placeholder="password"
            type="password"
            onChange={(e) => {
              setPostInputs({
                ...postInput,
                password: e.target.value,
              });
            }}
          />
          <button
            onClick={sendRequest}
            type="button"
            className="mt-5 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 
            focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700
             dark:border-gray-700"
          >
            {type == "signup" ? "Sign up" : "Sign in"}
          </button>
        </div>
      </div>
    </div>
  );
};

interface LablledInputType {
  Label: string;
  Placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type: string;
}

function LabbledInput({
  Label,
  Placeholder,
  onChange,
  type,
}: LablledInputType) {
  return (
    <div>
      <label className="block mb-2 text-sm font-bold text-gray-900 ">
        {Label}
      </label>
      <input
        onChange={onChange}
        type={type || "text"}
        id="first_name"
        className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        placeholder={Placeholder}
        required
      />
    </div>
  );
}
