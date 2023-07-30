"use client";
import { useEffect, use, useMemo, useState } from "react";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import PageDefault from "../../components/container";
import { Currency } from "../types";
import Currencies from "./_currencies";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();

const fetchCurrencies = () =>
  fetch("api/currency").then((response) => {
    console.log("hej");
    return response.json().catch((e) => console.error(e));
  });
function Page() {
  const { user } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (user == null) router.push("/");
  }, [user]);
  const { currencies }: { currencies: Currency[] } = use(
    useMemo(() => fetchCurrencies(), [])
  );
  return (
    <QueryClientProvider client={queryClient}>
      <PageDefault title="Admin">
        <>
          {/* <Chart currencies={userCurrencies} /> */}
          <div>
            <Currencies currencies={currencies} />
          </div>
        </>
      </PageDefault>
    </QueryClientProvider>
  );
}

export default Page;
const Chart = ({ currencies }: { currencies: Currency[] }) => <div></div>;
