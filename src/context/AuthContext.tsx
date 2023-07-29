"use client";
import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  onAuthStateChanged,
  getAuth,
  User,
  signOut as FirebaseSignout,
} from "firebase/auth";
import firebase_app from "@/firebase/config";
import { useRouter } from "next/navigation";

export const signOut = () => {
  const auth = getAuth(firebase_app);
  FirebaseSignout(auth).then(() => {
    console.log("sign out!");
  });
};
export const AuthContext = createContext<{ user: User | null }>({ user: null });

export const useAuthContext = () =>
  useContext<{ user: User | null }>(AuthContext);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const auth = getAuth(firebase_app);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
        router.push("/");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      {loading ? <div>Loading...</div> : children}
    </AuthContext.Provider>
  );
};
