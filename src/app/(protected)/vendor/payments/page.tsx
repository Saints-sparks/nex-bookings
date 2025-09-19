/* app/vendor/profile/page.tsx */
export const dynamic = "auto"; // enable prerendering by default

import React, { Suspense } from "react";
import Paymentcontent from "./Paymentcontent";
import Spinner from "@/components/Spinner";

export default function PaymentPage() {
  return (
    <Suspense
      fallback={
        <div className="h-screen flex items-center justify-center">
          <Spinner />
        </div>
      }
    >
      <Paymentcontent />
    </Suspense>
  );
}
