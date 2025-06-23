import { Suspense } from "react";
import SignUpDetailsPage from "./Signup";
import Spinner from "@/components/Spinner";

export default function SignUpPageWrapper() {
  return (
    <Suspense
      fallback={
        <div className="h-screen flex items-center justify-center">
          <Spinner />
        </div>
      }
    >
      <SignUpDetailsPage />
    </Suspense>
  );
}
