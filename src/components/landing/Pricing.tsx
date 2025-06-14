"use client";
import { Check } from "lucide-react";
import { useRouter } from "next/navigation";

const plans = [
  {
    name: "Starter Plan",
    price: 2500,
    features: [
      "Create Six  (6) Services",
      "Receive Fifty (50) Whatsapp Notification monthly",
      "Receive Fifty (50) Email Notification monthly",
      "Access to Booking Records",
      "Customizable Website",
      "15,000 Monthly Website Visitors Limit",
    ],
  },
  {
    name: "Premium Plan",
    price: 3500,
    features: [
      "Create Unlimited Services",
      "Receive Unlimited Email Notifications",
      "Receive Unlimited SMS Notifications",
      "Receive Unlimited Whatsapp Notifications",
      "Access to Booking Records",
      "Customizable Website",
      "Unlimited Website Visitors",
    ],
  },
];

export default function Subscriptions() {
  const router = useRouter();

  const handleBuy = (planIndex: number) => {
    // target URL once they’re logged in
    const redirectTo = `/vendor/profile?tab=Subscriptions&planIndex=${planIndex}`;
    // send them to login if not authed
    const token = localStorage.getItem("nex_token");
    if (!token) {
      router.push(`/login?redirect=${encodeURIComponent(redirectTo)}`);
    } else {
      // already authed? go straight
      router.push(redirectTo);
    }
  };
  return (
    <div className="max-w-[1000px] mx-auto py-20 px-6 md:px-0">
      <h1 className="text-[#6C35A7] font-bold text-[25px] md:text-[42px] text-center">
        Pricing Packages
      </h1>
      <p className="text-center font-medium text-[15px] md:text-[19px] mb-10">
        Select whichever package best suits your businesses needs
      </p>
      <div className="grid md:grid-cols-2 gap-6">
        {plans.map((plan, idx) => {
          const isFirst = idx === 0;
          return (
            <div
              key={idx}
              className={`flex flex-col rounded-2xl overflow-hidden p-6 ${
                isFirst ? "bg-[#f2f2f2] text-black" : "bg-[#6C35A7] text-white"
              }`}
            >
              {/* Left column: name, price, desktop button */}
              <div className="flex flex-col   sm:py-4 flex-1">
                <h2 className="text-xl font-semibold sm:mb-2">{plan.name}</h2>
                <p className="font-bold text-[#FFB049] my-4 sm:my-0">
                  <span className="text-lg sm:text-2xl">NGN</span>{" "}
                  <span className="text-4xl sm:text-6xl leading-none">
                    {plan.price}
                  </span>
                  <span className="text-sm sm:text-base text-[#656565]">
                    /month
                  </span>
                </p>
              </div>

              {/* Right column: features */}
              <div className=" flex-1">
                <ul className="space-y-6">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Check size={18} className="text-[#FFB049]" />
                      <span className="font-bold text-[16px] sm:text-[18px]">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Mobile-only Buy button */}
                <button
                  onClick={() => handleBuy(idx)}
                  className={`mt-6 w-full py-3 rounded-full font-medium hover:opacity-90 transition ${
                    isFirst
                      ? "bg-[#6C35A7] text-white"
                      : "bg-white text-[#6C35A7]"
                  }`}
                >
                  Buy Plan
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
