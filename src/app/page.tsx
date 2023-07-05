"use client";

import { Suspense, use } from "react";
import Loading from "./loading";
const fetchSomething = async () => {
  const response = await fetch("api/currency");
  const data = await response.json();
  return data;
};
export default function Page() {
  const data = use(fetchSomething());
  return (
    <main>
      <div className="m-6 space-y-5">
        <Suspense fallback={<Loading />}>
          <div></div>
        </Suspense>
      </div>
    </main>
  );
}
