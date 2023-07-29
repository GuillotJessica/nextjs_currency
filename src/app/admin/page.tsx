"use client";
import React from "react";
import { useAuthContext, signOut } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import PageDefault from "../../components/container";

function Page() {
  const { user } = useAuthContext();
  const router = useRouter();
  React.useEffect(() => {
    if (user == null) router.push("/");
  }, [user]);

  return (
    <PageDefault title="Admin">
      <></>
    </PageDefault>
  );
}

export default Page;
