"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { usePayment } from "@/hooks/usePayment";
import { useSubscriptions } from "@/app/context/SubscriptionContext";
import { verifyServiceBookingPayment } from "@/app/services/payments";
import { createBooking } from "@/app/services/bookings";
import { Loader } from "lucide-react";
import Image from "next/image";
import Spinner from "@/components/Spinner";
import { Close, Done } from "@/components/Icons";

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
  const [paymentType, setPaymentType] = useState<
    "subscription" | "booking" | null
  >(null);
  const router = useRouter();
  const { handlePaymentCallback } = usePayment();
  const { refreshUserSubs } = useSubscriptions();
  const planId = localStorage.getItem("pending_plan_id");
  const userRaw = localStorage.getItem("nex_user");
  const user = userRaw ? JSON.parse(userRaw) : null;

  useEffect(() => {
    const verifyPayment = async () => {
      const reference =
        searchParams.get("reference") || searchParams.get("trxref");

      if (!reference) {
        setStatus("error");
        setMessage("No payment reference found");
        return;
      }

      // Check if this is a service booking payment
      const pendingBooking = localStorage.getItem("pendingBooking");

      if (pendingBooking) {
        // Handle service booking payment
        setPaymentType("booking");
        try {
          const bookingDetails = JSON.parse(pendingBooking);

          // Verify payment with backend
          const verificationResponse = await verifyServiceBookingPayment({
            reference,
          });

          if (verificationResponse.status === "success") {
            // Create the booking after successful payment
            await createBooking({
              appointmentDate: bookingDetails.appointmentDate,
              bookedServiceId: bookingDetails.bookedServiceId,
              customerName: bookingDetails.customerName,
              customerPhoneNumber: bookingDetails.customerPhoneNumber,
              time: bookingDetails.time,
            });

            setStatus("success");
            setMessage("Payment successful! Your booking has been confirmed.");
            setIsModalOpen(true);

            // Clear pending booking
            localStorage.removeItem("pendingBooking");

            setTimeout(() => router.replace("/"), 3000);
          } else {
            setStatus("error");
            setMessage("Payment verification failed. Please contact support.");
          }
        } catch (error: any) {
          console.error("Booking payment verification error:", error);
          setStatus("error");
          setMessage(
            "An error occurred while processing your booking. Please contact support."
          );
        }
      } else {
        // Handle subscription payment (existing logic)
        setPaymentType("subscription");
        try {
          const success = await handlePaymentCallback(
            reference,
            planId ?? "",
            user ?? ""
          );

          if (success) {
            setStatus("success");
            setMessage("Payment successful! Your subscription is now active.");
            setIsModalOpen(true);
            // Refresh subscription data to update the cache
            await refreshUserSubs();
            // Clear the pending plan ID
            localStorage.removeItem("pending_plan_id");
            setTimeout(() => router.replace("/vendor/home"), 3000);
          } else {
            setStatus("error");
            setMessage("Error!! Your Payment was not successful");
          }
        } catch (error) {
          setStatus("error");
          setMessage("An error occurred while verifying your payment");
        }
      }
    };

    verifyPayment();
  }, [searchParams]);

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
          <div className="flex flex-col items-center">
            <Done />
            <h2 className="text-xl font-bold text-green-700 mb-2">
              Payment Successful
            </h2>
            <p className="text-gray-700 mb-4">{message}</p>
            <p className="text-sm text-gray-500">
              Redirecting to your dashboard...
            </p>
          </div>
        )}

        {status === "error" && (
          <div className="flex flex-col items-center">
            <Close />
            <h2 className="text-xl font-bold text-red-700 mb-2">
              Payment Failed
            </h2>
            <p className="font-bold text-[16px] sm:text-[17px] mb-6">
              {message}
            </p>
            <div className="space-y-3">
              <button
                onClick={() =>
                  paymentType === "booking"
                    ? router.push("/")
                    : router.push("/vendor/profile")
                }
                className="w-full bg-[#6C35A7] text-white py-2 px-4 rounded-full hover:bg-[#582a8c] transition"
              >
                Try Again
              </button>
              <button
                onClick={() =>
                  paymentType === "booking"
                    ? router.push("/")
                    : router.push("/vendor/home")
                }
                className="w-full bg-gray-200 text-gray-800 py-2 px-4 rounded-full hover:bg-gray-300 transition"
              >
                {paymentType === "booking"
                  ? "Back to Home"
                  : "Back to Dashboard"}
              </button>
            </div>
          </div>
        )}
      </div>
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
