"use client";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Starter Plan",
    price: 11,
    features: [
      "20,000 Visitors",
      "20,000 Visitors",
      "20,000 Visitors",
      "20,000 Visitors",
    ],
    isActive: false,
  },
  {
    name: "Starter Plan",
    price: 11,
    features: [
      "20,000 Visitors",
      "20,000 Visitors",
      "20,000 Visitors",
      "20,000 Visitors",
    ],
    isActive: true,
  },
  {
    name: "Starter Plan",
    price: 11,
    features: [
      "20,000 Visitors",
      "20,000 Visitors",
      "20,000 Visitors",
      "20,000 Visitors",
    ],
    isActive: false,
  },
];

export default function Subscriptions() {
  return (
    <div className="w-full p-0 sm:p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`rounded-2xl p-6 flex flex-col  ${
              plan.isActive
                ? "bg-[#6C35A7] text-white"
                : "bg-[#F2F2F2] text-black w-full"
            }`}
          >
            <h2 className="text-lg font-semibold mb-2">{plan.name}</h2>
            <p className="text-3xl font-bold text-[#FFB049] mb-1 text-[48px] sm:text-[52px]">
              ${plan.price}
              <span
                className={`text-sm ${
                  plan.isActive ? "text-white" : "text-[#656565]"
                }`}
              >
                /month
              </span>
            </p>

            <ul className="mt-6 space-y-3">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-center gap-2">
                  <Check size={18} className="text-[#FFB049]" />
                  <span
                    className={`font-bold ${
                      plan.isActive ? "text-white" : "text-[#454545]"
                    }`}
                  >
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
            <button
              className={`mt-6 px-6 py-3 rounded-full font-medium transition w-full ${
                plan.isActive
                  ? "bg-white text-[#6C35A7] hover:opacity-90"
                  : "bg-[#6C35A7] text-white hover:bg-[#5a2d95]"
              }`}
            >
              {plan.isActive ? "Cancel Plan" : "Buy Plan"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
