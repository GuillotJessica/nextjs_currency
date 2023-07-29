import { getDatabase, set, ref, get, child } from "firebase/database";
import { getAuth } from "firebase/auth";

import app from "../config";
import { Currency } from "@/app/types";
import { useEffect, useState } from "react";
const db = getDatabase(app);
const auth = getAuth(app);
const userCurrencyDb = "userCurrencies/" + auth.currentUser?.uid;
export const postUserCurrencies = (userCurrencies: Currency[]) => {
  set(ref(db, userCurrencyDb), userCurrencies);
  console.log("set" + JSON.stringify(userCurrencies));
};
export const useUserCurrencies = () => {
  const [userCurrencies, setUserCurrencies] = useState<Currency[]>([]);
  const dbRef = ref(getDatabase());
  useEffect(() => {
    get(child(dbRef, userCurrencyDb))
      .then((snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val());
          setUserCurrencies(snapshot.val() || []);
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  return userCurrencies;
};
