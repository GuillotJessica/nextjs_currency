import { useAuthContext } from "@/context/AuthContext";
import { getUserCurrencies, postUserCurrencies } from "@/firebase/store/api";
import { useState, use, Suspense } from "react";
import { Currency } from "../types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export default ({
  currency,
  onchangeSelectedCurrencies,
}: {
  onchangeSelectedCurrencies: (currency: Currency) => void;
  currency: Currency & { selected: boolean };
}) => {
  return (
    <Suspense>
      <div key={currency.id} className="flex flex-row gap-10">
        <input
          type="checkbox"
          checked={currency.selected}
          onChange={() => onchangeSelectedCurrencies(currency)}
        />
        <p>{currency.name}</p>
      </div>
    </Suspense>
  );
};
