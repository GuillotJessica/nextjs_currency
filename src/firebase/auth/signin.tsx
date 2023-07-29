import firebase_app from "../config";
import {
  signInWithEmailAndPassword,
  getAuth,
  UserCredential,
} from "firebase/auth";
import { FirebaseError } from "@firebase/util";

const auth = getAuth(firebase_app);

export type SignFunction = (
  email: string,
  password: string
) => Promise<{
  result: UserCredential | null;
  error: FirebaseError | null;
}>;
export default async function signIn(email: string, password: string) {
  let result = null,
    error = null;
  console.log({ auth, firebase_app });
  try {
    result = await signInWithEmailAndPassword(auth, email, password);
  } catch (e) {
    if (e instanceof FirebaseError) error = e;
  }

  return { result, error };
}
