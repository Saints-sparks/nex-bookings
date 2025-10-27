"use client";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import api from "@/lib/api";
import Spinner from "@/components/Spinner";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface PaymentReceipt {
  status: string;
  amount: number;
  currency: string;
  reference: string;
  paid_at: string;
  customer: {
    email: string;
    name?: string;
  };
  [key: string]: any;
}

function PaymentCallbackContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [receipt, setReceipt] = useState<PaymentReceipt | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const reference =
      searchParams.get("reference") || searchParams.get("trxref");
    if (!reference) {
      setError("No payment reference found in URL.");
      setLoading(false);
      return;
    }
    api
      .post("/api/payments/verify", { reference })
      .then((res) => {
        setReceipt(res.data.data || res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(
          err?.response?.data?.message || "Payment verification failed."
        );
        setLoading(false);
      });
  }, [searchParams]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F9F7FF] px-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full flex flex-col items-center mt-20">
        <h1 className="text-2xl font-bold text-[#6C35A7] mb-4">
          Payment Status
        </h1>
        {loading && <Spinner />}
        {error && <div className="text-red-500 text-center my-4">{error}</div>}
        {receipt && (
          <>
            <div className="text-green-600 font-bold text-lg mb-2">
              {receipt.status === "success"
                ? "Payment Successful!"
                : "Payment Status: " + receipt.status}
            </div>
            <div className="mb-2 text-gray-700">
              <span className="font-semibold">Amount:</span> {receipt.currency}{" "}
              {Number(receipt.amount) / 100}
            </div>
            <div className="mb-2 text-gray-700">
              <span className="font-semibold">Reference:</span>{" "}
              {receipt.reference}
            </div>
            <div className="mb-2 text-gray-700">
              <span className="font-semibold">Paid At:</span>{" "}
              {receipt.paid_at
                ? new Date(receipt.paid_at).toLocaleString()
                : "-"}
            </div>
            <div className="mb-2 text-gray-700">
              <span className="font-semibold">Customer:</span>{" "}
              {receipt.customer?.email}
            </div>
            <Link href="/" className="mt-6 w-full">
              <Button className="w-full bg-[#6C35A7] text-white">
                Go to Dashboard
              </Button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default function PaymentCallbackPage() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center min-h-screen">
          <Spinner />
        </div>
      }
    >
      <PaymentCallbackContent />
    </Suspense>
  );
}
