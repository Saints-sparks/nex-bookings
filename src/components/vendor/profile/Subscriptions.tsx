"use client";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Starter Plan",
    price: 1000,
    features: [
      "Create Unlimited Services",
      "Receive Email Notifications",
      "Receive SMS Notifications",
      "Access to Booking Records",
      "Customizable Website",
      "Unlimited Website Visitors",
    ],
  },
  {
    name: "Starter Plan",
    price: 1000,
    features: [
      "Create Unlimited Services",
      "Receive Email Notifications",
      "Receive SMS Notifications",
      "Access to Booking Records",
      "Customizable Website",
      "Unlimited Website Visitors",
    ],
  },
];

export default function Subscriptions() {
  return (
    <div className="w-full ">
      <div className="grid md:grid-cols-2 gap-6">
        {plans.map((plan, idx) => (
          <div
            key={idx}
            className="flex flex-col  bg-[#6C35A7] text-white rounded-2xl overflow-hidden p-6   "
          >
            {/* Left column: name, price, desktop button */}
            <div className="flex flex-col   sm:py-4 flex-1">
              <h2 className="text-xl font-semibold sm:mb-2">{plan.name}</h2>
              <p className="font-bold text-[#FFB049] my-4 sm:my-0">
                <span className="text-lg sm:text-2xl">NGN</span>{" "}
                <span className="text-4xl sm:text-6xl leading-none">
                  {plan.price}
                </span>
                <span className="text-sm sm:text-base text-white">/month</span>
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
              <button className="mt-6 w-full py-3 rounded-full bg-white text-[#6C35A7] font-medium hover:opacity-90 transition">
                Buy Plan
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
