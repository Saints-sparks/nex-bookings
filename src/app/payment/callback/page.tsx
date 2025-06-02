"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { usePayment } from "@/hooks/usePayment";
import { CheckCircle, XCircle, Loader } from "lucide-react";

function Modal({ children }: { children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6">{children}</div>
    </div>
  );
}

function PaymentCallbackContent() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const { handlePaymentCallback } = usePayment();

  useEffect(() => {
    const verifyPayment = async () => {
      const reference = searchParams.get("reference") || searchParams.get("trxref");

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
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        {status === "loading" && (
          <>
            <Loader className="w-16 h-16 text-blue-500 mx-auto mb-4 animate-spin" />
            <h2 className="text-xl font-semibold mb-2">Verifying Payment</h2>
            <p className="text-gray-600">Please wait while we verify your payment...</p>
          </>
        )}

        {status === "success" && (
          <>
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-green-800 mb-2">Payment Successful!</h2>
            <p className="text-gray-600 mb-4">{message}</p>
            <p className="text-sm text-gray-500">Redirecting to dashboard...</p>
          </>
        )}

        {status === "error" && (
          <>
            <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-red-800 mb-2">Payment Failed</h2>
            <p className="text-gray-600 mb-6">{message}</p>
            <div className="space-y-3">
              <button
                onClick={() => router.push("/vendor/profile")}
                className="w-full bg-[#6C35A7] text-white py-2 px-4 rounded-lg hover:opacity-90"
              >
                Try Again
              </button>
              <button
                onClick={() => router.push("/vendor/home")}
                className="w-full bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400"
              >
                Back to Dashboard
              </button>
            </div>
          </>
        )}
      </div>

      {isModalOpen && (
        <Modal>
          <div className="text-center">
            {status === "success" && (
              <>
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h2 className="text-xl font-semibold text-green-800 mb-2">Payment Successful!</h2>
                <p className="text-gray-600 mb-4">{message}</p>
              </>
            )}

            {status === "error" && (
              <>
                <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                <h2 className="text-xl font-semibold text-red-800 mb-2">Payment Failed</h2>
                <p className="text-gray-600 mb-4">{message}</p>
              </>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
}

export default function PaymentCallback() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PaymentCallbackContent />
    </Suspense>
  );
}