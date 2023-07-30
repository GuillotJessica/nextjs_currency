import { getDatabase, set, ref, get, child } from "firebase/database";

import app from "../config";
import { Currency } from "@/app/types";
export const postUserCurrencies = (userCurrencies: Currency[], uid: string) => {
  const db = getDatabase(app);
  set(ref(db, "userCurrencies/" + uid), userCurrencies);
};
export const getUserCurrencies = (uid: string) => {
  const dbRef = ref(getDatabase());
  return get(child(dbRef, "userCurrencies/" + uid))
    .then((snapshot) => {
      if (snapshot.exists()) {
        return snapshot.val() || [];
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });
};
