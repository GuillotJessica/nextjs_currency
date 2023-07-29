"use client";
import React from "react";
import { useAuthContext, signOut } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

function Page() {
  const { user } = useAuthContext();
  const router = useRouter();
  React.useEffect(() => {
    if (user == null) router.push("/");
  }, [user]);

  return (
    <>
      <h1>Only logged in users can view this page</h1>
      <button onClick={() => signOut()}>Signout</button>
    </>
  );
}

export default Page;
