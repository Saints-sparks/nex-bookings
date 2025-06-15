import React, { Suspense } from "react";
import LoginForm from "./LoginForm";
import Spinner from "@/components/Spinner";
// import LoginClient from "./LoginClient";

export default function LoginPage() {
  return (
    <Suspense fallback={<Spinner />}>
      <LoginForm />
    </Suspense>
  );
}
