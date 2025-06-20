"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { usePayment } from "@/hooks/usePayment";
import { CheckCircle, XCircle, Loader } from "lucide-react";
import Image from "next/image";
import Spinner from "@/components/Spinner";

function Modal({ children }: { children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50">
      <div className="bg-white rounded-2xl w-[90%] max-w-md p-6 ">
        {children}
      </div>
    </div>
  );
}

function PaymentCallbackContent() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const [message, setMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const { handlePaymentCallback } = usePayment();

  useEffect(() => {
    const verifyPayment = async () => {
      const reference =
        searchParams.get("reference") || searchParams.get("trxref");

      if (!reference) {
        setStatus("error");
        setMessage("No payment reference found");
        return;
      }

      try {
        const success = await handlePaymentCallback(reference);

        if (success) {
          setStatus("success");
          setMessage("Payment successful! Your subscription is now active.");
          setIsModalOpen(true);
          setTimeout(() => router.push("/vendor/home"), 3000);
        } else {
          setStatus("error");
          setMessage("Payment verification failed");
        }
      } catch (error) {
        setStatus("error");
        setMessage("An error occurred while verifying your payment");
      }
    };

    verifyPayment();
  }, [searchParams, handlePaymentCallback, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA] px-4">
      <div className="w-full max-w-md bg-white rounded-2xl p-8 text-center">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <Image
            src="/logo.svg" // Adjust path if needed
            alt="Osiso Logo"
            width={80}
            height={80}
            className="object-contain"
          />
        </div>

        {/* Payment Status */}
        {status === "loading" && (
          <>
            <Loader className="w-12 h-12 text-[#6C35A7] mx-auto mb-4 animate-spin" />
            <h2 className="text-xl font-semibold mb-2 text-[#6C35A7]">
              Verifying Payment...
            </h2>
            <p className="text-gray-600 text-sm">
              Please wait while we confirm your transaction.
            </p>
          </>
        )}

        {status === "success" && (
          <>
            <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-green-700 mb-2">
              Payment Successful
            </h2>
            <p className="text-gray-700 mb-4">{message}</p>
            <p className="text-sm text-gray-500">
              Redirecting to your dashboard...
            </p>
          </>
        )}

        {status === "error" && (
          <>
            <XCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-red-700 mb-2">
              Payment Failed
            </h2>
            <p className="text-gray-700 mb-6">{message}</p>
            <div className="space-y-3">
              <button
                onClick={() => router.push("/vendor/profile")}
                className="w-full bg-[#6C35A7] text-white py-2 px-4 rounded-full hover:bg-[#582a8c] transition"
              >
                Try Again
              </button>
              <button
                onClick={() => router.push("/vendor/home")}
                className="w-full bg-gray-200 text-gray-800 py-2 px-4 rounded-full hover:bg-gray-300 transition"
              >
                Back to Dashboard
              </button>
            </div>
          </>
        )}
      </div>

      {/* Success Modal */}
      {isModalOpen && status === "success" && (
        <Modal>
          <div className="text-center">
            <Image
              src="/logo.svg"
              alt="Osiso Logo"
              width={60}
              height={60}
              className="mx-auto mb-4"
            />
            <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-green-800 mb-2">
              Subscription Activated
            </h2>
            <p className="text-gray-600 mb-2">{message}</p>
            <p className="text-sm text-gray-500">Redirecting...</p>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default function PaymentCallback() {
  return (
    <Suspense
      fallback={
        <div className="h-screen flex items-center justify-center">
          <Spinner />
        </div>
      }
    >
      <PaymentCallbackContent />
    </Suspense>
  );
}
