"use client";

import { useState } from "react";
import { toast } from "sonner";
import {
  initializePayment,
  subscribeToPlan,
  verifyPayment,
} from "@/app/services/subscriptions";

export function usePayment() {
  const [isLoading, setIsLoading] = useState(false);

  const processPayment = async (planId: string, email: string) => {
    setIsLoading(true);
    localStorage.setItem("pending_plan_id", planId);
    try {
      // 1. Initialize payment
      const response = await initializePayment({
        plan_id: planId,
        email: email,
      });

      if (response.status === "success") {
        // 2. Redirect to Paystack payment page
        window.location.href = response.data.authorization_url;
        return true;
      } else {
        toast.error("Failed to initialize payment");
        return false;
      }
    } catch (error: any) {
      console.error("Payment initialization error:", error);
      toast.error(
        error.response?.data?.message || "Failed to initialize payment"
      );
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const handlePaymentCallback = async (
    reference: string,
    planId: string,
    user: any
  ) => {
    setIsLoading(true);

    try {
      const response = await verifyPayment({ reference });

      if (response.status === "success") {
        await subscribeToPlan({
          email: user.email,
          userId: user.id,
          username: user.fullName,
          paymentId: reference,
          subscriptionPlanId: planId,
        });
        toast.success("Payment successful! Your subscription is now active.");
        return true;
      } else {
        toast.error("Payment verification failed");
        return false;
      }
    } catch (error: any) {
      console.error("Payment verification error:", error);
      toast.error(
        error.response?.data?.message || "Payment verification failed"
      );
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    processPayment,
    handlePaymentCallback,
    isLoading,
  };
}
