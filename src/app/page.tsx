"use client";
import React, { useState } from "react";
import Container from "../components/container";
import signIn, { SignFunction } from "@/firebase/auth/signin";
import { useRouter } from "next/navigation";
import signUp from "@/firebase/auth/signup";
import { validateEmail } from "@/utils/validate";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
const handleSign = async (
  action: SignFunction,
  email: string,
  password: string,
  setError: React.Dispatch<
    React.SetStateAction<{
      message: string;
    } | null>
  >,
  router: AppRouterInstance
) => {
  const { error } = await action(email, password);
  if (error) {
    setError(error);
    return console.error(error);
  }

  // else successful
  return router.push("/admin");
};
function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<{ message: string } | null>(null);
  const router = useRouter();

  const form = [
    {
      htmlFor: "email",
      text: "Email",
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setEmail(e.target.value),
      type: "email",
    },
    {
      htmlFor: "password",
      text: "Password",
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setPassword(e.target.value),
      type: "password",
    },
  ];
  const handleClick = (action: SignFunction) => {
    handleSign(action, email, password, setError, router);
  };
  return (
    <Container title="Sign In" signOutButton={false}>
      <>
        <div className="mt-6">
          {form.map(({ htmlFor, text, onChange, type }) => (
            <div key={text} className="mb-2">
              <label
                htmlFor={htmlFor}
                className="block text-sm font-semibold text-gray-800"
              >
                {text}
              </label>
              <input
                onChange={onChange}
                type={type}
                className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
          ))}

          <button className="text-xs text-purple-600 hover:underline">
            Forget Password?
          </button>
          {error ? <p className="text-red-600">{error.message}</p> : null}
          <div className="mt-6">
            <button
              disabled={!validateEmail(email)}
              onClick={(e) => handleClick(signIn)}
              className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
            >
              Login
            </button>
          </div>
        </div>

        <p className="mt-8 text-xs font-light text-center text-gray-700">
          Don't have an account?
          <button
            disabled={!validateEmail(email) && !password.length}
            onClick={() => handleClick(signUp)}
            className="font-medium text-purple-600 hover:underline"
          >
            Sign up
          </button>
        </p>
      </>
    </Container>
  );
}

export default Page;
