import React from "react";
import Link from "next/link";
import { Review } from "@/app/services/business";

interface VendorReviewsProps {
  reviews: Review[];
  title?: string;
  onAddService?: () => void;
  addServiceHref?: string; // for navigation if needed
}

function Star({ filled }: { filled: boolean }) {
  return (
    <svg
      width={20}
      height={20}
      fill={filled ? "#FFB049" : "#D9D9D9"}
      viewBox="0 0 20 20"
      className="inline-block"
    >
      <polygon points="10,1 12.5,7.5 19,7.5 13.5,12 15.5,18.5 10,14.5 4.5,18.5 6.5,12 1,7.5 7.5,7.5" />
    </svg>
  );
}

export default function VendorReviews({
  reviews,
  title = "Vendors Reviews",
  onAddService,
  addServiceHref = "/vendor/profile?tab=Services",
}: VendorReviewsProps) {
  const isEmpty = !reviews || reviews.length === 0;
  return (
    <section className="w-screen my-10 bg-[#F2F2F2] p-10 ">
      <div className="max-w-[1000px] mx-auto">
        <h2 className="text-[24px] md:text-[30px] font-bold text-[#6C35A7] mb-6">
          {title}
        </h2>
        {isEmpty ? (
          <div className="flex flex-col items-center justify-center  rounded-2xl">
            <p className="text-black text-center text-[18px] max-w-[487px] font-medium mb-6">
              Vendor has not received any review yet, Click Button below to get
              started
            </p>
          </div>
        ) : (
          <div className="flex gap-6 overflow-x-auto pb-4 hide-scrollbar">
            {reviews.map((review: Review) => (
              <div
                key={review.id}
                className="min-w-[320px] max-w-[350px] bg-white rounded-2xl p-6 flex-shrink-0 "
              >
                <div className="font-bold text-[#FFB049] text-[18px] mb-2">
                  {review.name}
                </div>
                <div className="mb-3">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} filled={i <= review.rating} />
                  ))}
                </div>
                <div className="text-black font-medium text-[14px] leading-[22px]">
                  {review.comment}
                </div>
              </div>
            ))}
          </div>
        )}
        <style jsx>{`
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }
          .hide-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}</style>
      </div>
    </section>
  );
}
