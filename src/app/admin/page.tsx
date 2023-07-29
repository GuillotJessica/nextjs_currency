"use client";
import { useEffect, use, useMemo } from "react";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import PageDefault from "../../components/container";
import { Currency } from "../types";
import { postUserCurrencies, useUserCurrencies } from "@/firebase/store/api";
const fetchCurrencies = () =>
  fetch("api/currency").then((response) =>
    response.json().catch((e) => console.error(e))
  );
function Page() {
  const { user } = useAuthContext();
  const router = useRouter();

  const selectedCurrencies = useUserCurrencies();

  useEffect(() => {
    if (user == null) router.push("/");
  }, [user]);
  const { currencies }: { currencies: Currency[] } = use(
    useMemo(() => fetchCurrencies(), [])
  );
  const onchangeSelectedCurrencies = ({
    id,
    name,
    selected = false,
  }: Currency) => {
    if (!selectedCurrencies.find((c) => c.id === id))
      postUserCurrencies([
        ...selectedCurrencies,
        {
          id,
          name,
          selected,
        },
      ]);
    else postUserCurrencies(selectedCurrencies.filter((c) => c.id !== id));
  };
  return (
    <PageDefault title="Admin">
      <>
        <div>
          <ul className="columns-3">
            {currencies.map((currency: Currency) => (
              <div key={currency.id} className="flex flex-row gap-10">
                <input
                  type="checkbox"
                  checked={selectedCurrencies.some((c) => c.id === currency.id)}
                  onChange={() => onchangeSelectedCurrencies(currency)}
                />
                <p>{currency.name}</p>
              </div>
            ))}
          </ul>
        </div>
      </>
    </PageDefault>
  );
}

export default Page;
