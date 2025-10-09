import React, { useEffect, useState } from "react";
import { getPayoutsHistoryByBusiness, Payout } from "@/app/services/payouts";
import { useServiceManager } from "@/app/hooks/useServiceManager";
import Image from "next/image";

const PayoutsPage = () => {
  const { businessId } = useServiceManager();
  const [payouts, setPayouts] = useState<Payout[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!businessId) return;
    setLoading(true);
    setError(null);
    getPayoutsHistoryByBusiness(businessId)
      .then((res) => setPayouts(res.payouts || []))
      .catch(() => setError("Could not load payouts"))
      .finally(() => setLoading(false));
  }, [businessId]);

  if (loading) return <div>Loading payouts...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!loading && payouts.length === 0) {
    return (
      <section className="p-6 text-center text-black flex flex-col gap-10 justify-center items-center">
        <Image
          src="/empty.svg"
          alt="No payouts available"
          width={429}
          height={373}
        />
        <p className="max-w-[487px] text-[13px] md:text-[18px] leading-[28px] md:leading-[34px] font-inter ">
          You have not made any payouts yet.
        </p>
      </section>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 gap-y-[4] mt-8">
      {payouts.map((payout) => (
        <div
          key={payout.id}
          className="bg-[#F2F2F2] p-4 rounded-2xl mb-4 flex items-center h-20 justify-between"
        >
          <div className="flex items-center">
            <img
              src="/solar_alt-arrow-down-bold-duotone.png"
              alt="Transaction Icon"
              className="inline-block mr-4"
            />
            <h4 className="font-bold text-xl text-[#6c35a7]">
              ₦ {payout.amount.toLocaleString()}
            </h4>
          </div>
          <div className="flex flex-col items-end">
            <p className="text-[16px] text-black">
              {new Date(payout.createdAt).toLocaleDateString("en-NG", {
                year: "numeric",
                month: "short",
                day: "2-digit",
              })}
            </p>
            <span
              className={`text-xs ${
                payout.status === "paid" ? "text-green-600" : "text-yellow-600"
              } capitalize`}
            >
              {payout.status}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PayoutsPage;
