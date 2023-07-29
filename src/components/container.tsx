import { signOut } from "@/context/AuthContext";
import { ReactNode } from "react";

export default ({
  title,
  children,
  signOutButton = true,
}: {
  title: string;
  children: ReactNode;
  signOutButton?: boolean;
}) => {
  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
        <div className="flex justify-between	">
          <h1 className="text-3xl font-semibold text-purple-700">{title}</h1>
          {signOutButton && <button onClick={() => signOut()}>Signout</button>}
        </div>
        {children}
      </div>
    </div>
  );
};
