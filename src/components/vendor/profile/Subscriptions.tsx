"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Check } from "lucide-react";
import { useSubscriptions } from "@/app/context/SubscriptionContext";
import { usePayment } from "@/hooks/usePayment";

export default function Subscriptions() {
  // 1️⃣ grab everything from your merged context
  const {
    plans,
    plansLoading,
    plansError,
    userSubs,
    subsLoading,
    subsError,
    refreshUserSubs,
  } = useSubscriptions();

  // 2️⃣ which plan is currently being processed?
  const [loadingPlanId, setLoadingPlanId] = useState<string | null>(null);

  const router = useRouter();
  const { processPayment, isLoading: paymentLoading } = usePayment();

  // 3️⃣ when they click Buy, run payment and then refresh userSubs
  const handleSubscribe = async (planId: string) => {
    const raw = localStorage.getItem("nex_user");
    const user = raw ? JSON.parse(raw) : null;
    if (!user) {
      toast.error("Please log in.");
      return;
    }

    setLoadingPlanId(planId);
    try {
      const success = await processPayment(planId, user.email);
      if (success) {
        // re-fetch the user’s subscriptions so context updates
        refreshUserSubs();
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || err.message);
    } finally {
      setLoadingPlanId(null);
    }
  };

  // 4️⃣ unified loading / error states
  if (plansLoading || subsLoading) {
    return <p>Loading subscriptions…</p>;
  }
  if (plansError) {
    return <p className="text-red-600">{plansError}</p>;
  }
  if (subsError) {
    return <p className="text-red-600">{subsError}</p>;
  }

  // 5️⃣ render the plan cards
  return (
    <div className="w-full">
      <div className="grid md:grid-cols-2 gap-6">
        {plans.map((plan, idx) => {
          const isFirst = idx === 0;
          const isProcessing = loadingPlanId === plan.id;
          const userSub = userSubs.find(
            (s) => s.subscriptionPlanId === plan.id
          );
          const isActive = userSub?.status === "ACTIVE";

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
                    {plan.price}
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

              <div className="flex-1">
                <ul className="space-y-6">
                  {plan.features.map((f) => (
                    <li key={f.id} className="flex items-center gap-2">
                      <Check size={18} className="text-[#FFB049]" />
                      <span className="font-bold text-[16px] sm:text-[18px]">
                        {f.description}
                      </span>
                    </li>
                  ))}
                </ul>

                {isActive ? (
                  <button
                    onClick={() => router.push(`/subscriptions/${plan.id}`)}
                    className="mt-6 w-full py-3 rounded-full font-medium bg-white text-[#6C35A7] hover:opacity-90 transition"
                  >
                    View Plan
                  </button>
                ) : (
                  <button
                    onClick={() => handleSubscribe(plan.id)}
                    disabled={isProcessing || paymentLoading}
                    className={`mt-6 w-full py-3 rounded-full font-medium hover:opacity-90 transition ${
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
    </div>
  );
}
