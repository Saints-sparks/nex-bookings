// components/vendor/profile/Subscriptions.tsx
"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Check } from "lucide-react";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useSubscriptions } from "@/app/context/SubscriptionContext";
import { usePayment } from "@/hooks/usePayment";
import { format } from "date-fns";

export default function Subscriptions() {
  const {
    plans,
    plansLoading,
    plansError,
    userSubs,
    subsLoading,
    subsError,
    refreshUserSubs,
  } = useSubscriptions();

  const [viewing, setViewing] = useState<string | null>(null);
  const [loadingPlanId, setLoadingPlanId] = useState<string | null>(null);
  const [viewPlanId, setViewPlanId] = useState<string | null>(null);

  const router = useRouter();
  const { processPayment, isLoading: paymentLoading } = usePayment();

  // Refresh subscriptions when component mounts to ensure fresh data
  useEffect(() => {
    refreshUserSubs();
  }, []);

  const handleSubscribe = async (planId: string) => {
    const raw = localStorage.getItem("nex_user");
    const user = raw ? JSON.parse(raw) : null;
    if (!user) {
      toast.error("Please log in.");
      return;
    }

    if (activeSub) {
      toast.error("You already have an active subscription.");
      return;
    }

    setLoadingPlanId(planId);
    try {
      const success = await processPayment(planId, user.email);
      if (success) {
        // Don't show success toast here - payment is just being initialized
        // The success toast will be shown after payment verification in the callback
        toast.info("Redirecting to payment...");
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || err.message);
    } finally {
      setLoadingPlanId(null);
    }
  };

  if (plansLoading || subsLoading) {
    return <p>Loading subscriptions…</p>;
  }
  if (plansError) {
    return (
      <div className="text-red-600">
        <p>{plansError}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Retry
        </button>
      </div>
    );
  }
  if (subsError) {
    return (
      <div className="text-red-600">
        <p>{subsError}</p>
        {subsError.includes("Session expired") && (
          <p className="mt-2 text-sm">Please log out and log back in.</p>
        )}
        <button
          onClick={() => refreshUserSubs()}
          className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Retry
        </button>
      </div>
    );
  }

  // find active subscription
  const activeSub = userSubs && userSubs.find((s) => s.status === "ACTIVE");

  // when viewing a plan, grab both plan details and subscription record
  const viewedPlan = plans.find((p) => p.id === viewPlanId) || null;
  const viewedSub =
    activeSub && activeSub.subscriptionPlanId === viewPlanId ? activeSub : null;

  return (
    <div className="w-full">
      {/* Header with refresh button */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Subscriptions</h2>
        <button
          onClick={() => {
            refreshUserSubs();
            toast.info("Refreshing subscriptions...");
          }}
          disabled={subsLoading}
          className="px-4 py-2 bg-[#6C35A7] text-white rounded-lg hover:bg-[#582a8c] transition disabled:opacity-50"
        >
          {subsLoading ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {plans.map((plan, idx) => {
          const isFirst = idx === 0;
          const isProcessing = loadingPlanId === plan.id;
          const isActive = activeSub?.subscriptionPlanId === plan.id;

          return (
            <div
              key={plan.id}
              className={`relative flex flex-col rounded-2xl overflow-hidden p-6 ${
                isFirst ? "bg-[#f2f2f2] text-black" : "bg-[#6C35A7] text-white"
              }`}
            >
              {isActive && (
                <span className="absolute top-3 right-3 bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                  Active
                </span>
              )}

              <div className="flex flex-col sm:py-4 flex-1">
                <h3 className="text-xl font-semibold sm:mb-2">{plan.name}</h3>
                <p className="font-bold text-[#FFB049] my-4 sm:my-0">
                  <span className="text-lg sm:text-2xl">{plan.currency}</span>{" "}
                  <span className="text-4xl sm:text-6xl leading-none">
                    {plan.price.toLocaleString()}
                  </span>
                  <span
                    className={`text-sm sm:text-base ${
                      isFirst ? "text-[#656565]" : "text-white"
                    }`}
                  >
                    /{plan.billingCycle.toLowerCase()}
                  </span>
                </p>
              </div>

              <ul className="flex-1 space-y-4">
                {plan.features.map((f) => (
                  <li key={f.id} className="flex items-center gap-2">
                    <Check size={18} className="text-[#FFB049]" />
                    <span className="font-bold text-[16px] sm:text-[18px]">
                      {f.description}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-6">
                {isActive ? (
                  <button
                    onClick={() => setViewing(activeSub.id)}
                    className={`w-full py-3 rounded-full font-medium hover:opacity-90 transition ${
                      isFirst
                        ? "bg-[#6C35A7] text-white"
                        : "bg-white text-[#6C35A7]"
                    }`}
                  >
                    View Details
                  </button>
                ) : (
                  <button
                    onClick={() => handleSubscribe(plan.id)}
                    disabled={isProcessing || paymentLoading || !!activeSub}
                    className={`w-full py-3 rounded-full font-medium hover:opacity-90 transition ${
                      isFirst
                        ? "bg-[#6C35A7] text-white"
                        : "bg-white text-[#6C35A7]"
                    }`}
                  >
                    {isProcessing ? "Processing…" : "Buy Plan"}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* ——— Details Modal ——— */}
      <Dialog open={!!viewing} onOpenChange={() => setViewing(null)}>
        <DialogContent className="bg-white rounded-2xl p-6 mx-auto w-[90%] sm:w-[400px]">
          <DialogTitle className="text-2xl font-bold mb-4">
            Subscription Details
          </DialogTitle>

          {viewing &&
            (() => {
              const sub = userSubs.find((s) => s.id === viewing)!;
              return (
                <div className="space-y-6">
                  <div>
                    <p className="font-semibold">Plan Name</p>
                    <p className="text-[#6C35A7] font-bold text-lg mt-1">
                      {sub.subscriptionPlan.name}
                    </p>
                  </div>

                  <div>
                    <p className="font-semibold">Plan Price</p>
                    <p className="text-[#6C35A7] font-bold text-lg mt-1">
                      {sub.subscriptionPlan.currency}{" "}
                      {sub.subscriptionPlan.price.toLocaleString()}
                    </p>
                  </div>

                  <div>
                    <p className="font-semibold">Expiry Date</p>
                    <p className="text-[#6C35A7] font-bold text-lg mt-1">
                      {format(new Date(sub.endDate), "dd/MM/yy")}
                    </p>
                  </div>
                </div>
              );
            })()}
        </DialogContent>
      </Dialog>
    </div>
  );
}
