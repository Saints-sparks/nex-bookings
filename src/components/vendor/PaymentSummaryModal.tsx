// components/vendor/PaymentSummaryModal.tsx
"use client";
import { FC } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PaymentSummary } from "@/app/services/payments";

interface PaymentSummaryModalProps {
  trigger: React.ReactNode;
  paymentSummary: PaymentSummary | null;
  serviceImage?: string;
  onMakePayment: () => void;
  loading: boolean;
  error?: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const PaymentSummaryModal: FC<PaymentSummaryModalProps> = ({
  trigger,
  paymentSummary,
  serviceImage,
  onMakePayment,
  loading,
  error,
  open,
  onOpenChange,
}) => {
  if (!paymentSummary) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="p-0 sm:max-w-[500px] max-w-screen sm:w-[500px] rounded-3xl max-h-[90vh] overflow-y-auto">
        <DialogTitle asChild>
          <span className="sr-only">Payment Summary</span>
        </DialogTitle>
        <div className="flex flex-col p-8 bg-white rounded-3xl">
          <h2 className="text-[22px] text-[#212121] font-bold mb-6">
            Payment Summary
          </h2>

          {/* Service Header */}
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-[#F2F2F2] rounded-xl overflow-hidden">
              {serviceImage ? (
                <img
                  src={serviceImage}
                  alt={paymentSummary.serviceTitle}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-[#FFB049] to-[#6C35A7] rounded-lg"></div>
              )}
            </div>
            <div>
              <div className="font-bold text-[#6C35A7] text-[20px] mb-1">
                {paymentSummary.serviceTitle}
              </div>
              <div className="font-bold text-black text-[15px]">
                NGN {paymentSummary.servicePrice.toLocaleString()} •{" "}
                {paymentSummary.initialPaymentPercent}% Initial Payment
              </div>
            </div>
          </div>

          {/* Service Charge */}
          <div className="mb-6">
            <div className="font-bold text-[#6C35A7] mb-2 text-[18px]">
              Service Charge
            </div>
            <div className="text-black text-[20px] font-bold">
              NGN {paymentSummary.downPayment.toLocaleString()}
            </div>
          </div>

          {/* Processing Fee */}
          <div className="mb-6">
            <div className="font-bold text-[#6C35A7] mb-2 text-[18px]">
              Processing Fee
            </div>
            <div className="text-black text-[20px] font-bold">
              NGN {paymentSummary.platformServiceCharge.toLocaleString()} (5%)
            </div>
          </div>

          {/* Total Amount */}
          <div className="mb-8">
            <div className="font-bold text-[#6C35A7] mb-2 text-[18px]">
              Total Amount
            </div>
            <div className="text-black text-[20px] font-bold">
              NGN {paymentSummary.totalAmount.toLocaleString()}
            </div>
          </div>

          {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

          {/* Action Button */}
          <Button
            onClick={onMakePayment}
            disabled={loading}
            className="w-full bg-[#6C35A7] hover:bg-purple-700 py-6 text-[16px] font-medium rounded-full"
          >
            {loading ? "Processing..." : "Make Payment"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentSummaryModal;
