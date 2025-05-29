"use client";

import { useEffect, useState } from "react";
import { Check } from "lucide-react";
// import { getSubscriptionPlans, SubscriptionPlan, subscribeToPlan } from "@/services/subscriptions";
import { useRouter } from "next/navigation";
import { toast } from "sonner"; // or your preferred toast library
import {
  getSubscriptionPlans,
  subscribeToPlan,
  SubscriptionPlan,
} from "@/app/services/subscriptions";

export default function Subscriptions() {
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [loadingPlanId, setLoadingPlanId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchPlans() {
      try {
        const data = await getSubscriptionPlans();
        setPlans(data);
      } catch (err: any) {
        setError("Failed to load plans. Please try again.");
      }
    }
    fetchPlans();
  }, []);

  const handleSubscribe = async (planId: string) => {
    const raw = localStorage.getItem("nex_user");
    const user = raw ? JSON.parse(raw) : null;
    if (!user) return toast.error("Please log in.");

    setLoadingPlanId(planId);
    try {
      // 1. Integrate payment flow → get actual paymentId
      const paymentId = "YOUR_PAYMENT_GATEWAY_ID";
      // 2. Call subscribe
      await subscribeToPlan({
        email: user.email,
        userId: user.id,
        username: user.fullName,
        paymentId,
        subscriptionPlanId: planId,
      });
      toast.success("Subscription successful!");
      router.refresh();
    } catch (err: any) {
      toast.error(err.response?.data?.message || err.message);
    } finally {
      setLoadingPlanId(null);
    }
  };

  if (error) {
    return <p className="text-red-600">{error}</p>;
  }

  return (
    <div className="w-full">
      <div className="grid md:grid-cols-2 gap-6">
        {plans.map((plan, idx) => {
          const isFirst = idx === 0;
          const isLoading = loadingPlanId === plan.id;

          return (
            <div
              key={plan.id}
              className={`flex flex-col rounded-2xl overflow-hidden p-6 ${
                isFirst ? "bg-[#f2f2f2] text-black" : "bg-[#6C35A7] text-white"
              }`}
            >
              <div className="flex flex-col sm:py-4 flex-1">
                <h2 className="text-xl font-semibold sm:mb-2">{plan.name}</h2>
                <p className="font-bold text-[#FFB049] my-4 sm:my-0">
                  <span className="text-lg sm:text-2xl">{plan.currency}</span>{" "}
                  <span className="text-4xl sm:text-6xl leading-none">
                    {plan.price}
                  </span>
                  <span className="text-sm sm:text-base text-white">
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

                <button
                  onClick={() => handleSubscribe(plan.id)}
                  disabled={isLoading}
                  className={`mt-6 w-full py-3 rounded-full font-medium hover:opacity-90 transition ${
                    isFirst
                      ? "bg-[#6C35A7] text-white"
                      : "bg-white text-[#6C35A7]"
                  }`}
                >
                  {isLoading ? "Processing..." : "Buy Plan"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
