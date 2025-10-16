import React, { useState } from "react";
import Image from "next/image";
import { Service } from "@/app/services/service";
import { Button } from "../ui/button";

interface ServiceDetailsModalProps {
  service: Service | null;
  open: boolean;
  onClose: () => void;
  onContinueBooking?: () => void;
}

export default function ServiceDetailsModal({
  service,
  open,
  onClose,
  onContinueBooking,
}: ServiceDetailsModalProps) {
  const [previewSrc, setPreviewSrc] = useState<string | null>(null);

  if (!open || !service) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#000000]/30">
      <div className="bg-white rounded-4xl max-w-[700px] w-full p-8 relative ">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-2xl text-[#6C35A7] hover:text-[#532b8a]"
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>
        {/* Title */}
        <h2 className="text-[22px] text-[#212121] font-bold mb-6">
          Service Details
        </h2>
        {/* Service Header */}
        <div className="flex items-center gap-4 mb-4">
          <Image
            src={service.images[0] || "/images/nails.png"}
            alt={service.title}
            width={64}
            height={64}
            className="rounded-xl object-cover w-16 h-16"
          />
          <div>
            <div className="font-bold text-[#6C35A7] text-[20px] mb-1">
              {service.title}
            </div>
            <div className="font-bold text-black text-[15px]">
              NGN {service.price.toLocaleString()} &nbsp;
              <span className="text-black font-normal">•</span>
              &nbsp;{service.initialPayment}% Initial Payment
            </div>
          </div>
        </div>
        {/* Description */}
        <div className="mt-6">
          <div className="font-bold text-[#6C35A7] mb-2 text-[18px]">
            Service Description
          </div>
          <div className="text-black text-[15px] mb-4">
            {service.description}
          </div>
        </div>
        {/* Service Pictures */}
        <div className="mt-6">
          <div className="font-bold text-[#6C35A7] mb-2 text-[18px]">
            Service Pictures
          </div>
          <div className="flex gap-4 flex-wrap">
            {service.images.map((img, idx) => (
              <div
                key={idx}
                className="rounded-xl overflow-hidden w-[140px] h-[140px]"
              >
                <img
                  src={img}
                  alt={service.title + " image " + (idx + 1)}
                  width={140}
                  height={140}
                  className="rounded-xl object-cover w-[140px] h-[140px] cursor-pointer"
                  onClick={() => setPreviewSrc(img)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Image preview overlay */}
        {previewSrc && (
          <div
            className="fixed inset-0 z-60 flex items-center justify-center bg-black/70"
            onClick={() => setPreviewSrc(null)}
            role="dialog"
            aria-modal="true"
          >
            <div className="p-4 max-w-[95%] max-h-[95%]">
              <button
                className="absolute top-6 right-6 text-white text-3xl z-70"
                onClick={(e) => {
                  e.stopPropagation();
                  setPreviewSrc(null);
                }}
                aria-label="Close preview"
              >
                &times;
              </button>
              <img
                src={previewSrc}
                alt="Preview"
                className="max-w-[90vw] max-h-[80vh] object-contain rounded-xl mx-auto block"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </div>
        )}
        {/* Continue Bookings Button */}
        <div className="mt-8 flex justify-start">
          <Button
            className="bg-[#6C35A7] text-white rounded-full px-10 py-6 text-[15px] font-medium"
            onClick={onContinueBooking}
          >
            Continue Bookings
          </Button>
        </div>
      </div>
    </div>
  );
}
