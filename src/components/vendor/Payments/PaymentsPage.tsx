import React, { useEffect, useState } from "react";
import { getPaymentsHistoryByBusiness, Payment } from "@/app/services/payments";
import { useServiceManager } from "@/app/hooks/useServiceManager";
import Image from "next/image";

const PaymentsPage = () => {
  const { businessId } = useServiceManager();
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!businessId) return;
    setLoading(true);
    setError(null);
    getPaymentsHistoryByBusiness(businessId)
      .then((res) => setPayments(res.payments || []))
      .catch(() => setError("Could not load payments"))
      .finally(() => setLoading(false));
  }, [businessId]);

  if (loading) return <div>Loading payments...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!loading && payments.length === 0) {
    return (
      <section className="p-6 text-center text-black flex flex-col gap-10 justify-center items-center">
        <Image
          src="/empty.svg"
          alt="No payments available"
          width={429}
          height={373}
        />
        <p className="max-w-[487px] text-[13px] md:text-[18px] leading-[28px] md:leading-[34px] font-inter ">
          You have not received any payments yet.
        </p>
      </section>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 gap-y-[4] mt-8">
      {payments.map((payment) => (
        <div
          key={payment.id}
          className="bg-[#F2F2F2] p-4 rounded-2xl mb-4 flex items-center h-20 justify-between"
        >
          <div className="flex items-center">
            <img
              src="/solar_alt-arrow-down-bold-duotone-1.png"
              alt="Transaction Icon"
              className="inline-block mr-4"
            />
            <h4 className="font-bold text-xl text-[#6c35a7]">
              ₦ {payment.amount.toLocaleString()}
            </h4>
          </div>
          <div className="flex flex-col items-end">
            <p className="text-[16px] text-black">
              {new Date(payment.createdAt).toLocaleDateString("en-NG", {
                year: "numeric",
                month: "short",
                day: "2-digit",
              })}
            </p>
            <span className="text-xs text-gray-500">{payment.reference}</span>
            <span className="text-xs text-gray-500 capitalize">
              {payment.type}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PaymentsPage;
