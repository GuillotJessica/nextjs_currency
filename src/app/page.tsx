"use client";
import React, { useState } from "react";
import signIn, { SignFunction } from "@/firebase/auth/signin";
import { useRouter } from "next/navigation";
import signUp from "@/firebase/auth/signup";
import { validateEmail } from "@/utils/validate";

function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<{ message: string } | null>(null);
  const router = useRouter();

  const handleSign = async (action: SignFunction) => {
    const { result, error } = await action(email, password);
    if (error) {
      setError(error);
      return console.error(error);
    }

    // else successful
    return router.push("/admin");
  };
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
  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
        <h1 className="text-3xl font-semibold text-center text-purple-700">
          Sign in
        </h1>
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
              onClick={(e) => handleSign(signIn)}
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
            onClick={() => handleSign(signUp)}
            className="font-medium text-purple-600 hover:underline"
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
}

export default Page;
