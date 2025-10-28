// components/vendor/VendorPublicPage.tsx
"use client";

import Image from "next/image";
import type { Service } from "@/app/services/service";
import PublicDisplayGrid from "./PublicDisplayGrid";
import WorkingHoursModal from "./WorkingHoursModal";
import VendorReviewsModal from "./VendorReviewsModal";
import Link from "next/link";
import { Eye, Facebook, Instagram, Pencil, Share } from "../Icons";
import { Button } from "../ui/button";
import { useState } from "react";
import { postReviewBySlug, Review } from "@/app/services/business";

interface WorkingHour {
  day: string;
  isOpen: boolean;
  openTime: string;
  closeTime: string;
}

interface Props {
  businessName: string;
  description: string;
  logoUrl: string;
  services: Service[];
  instagramLink: string;
  facebookLink: string;
  phoneNumber?: string;
  workingHours?: WorkingHour[];
  averageRating?: number;
  reviews?: Review[];
  businessSlug?: string;
}

export default function VendorPublicPage({
  businessName,
  description,
  logoUrl,
  services,
  instagramLink,
  facebookLink,
  averageRating,
  phoneNumber,
  workingHours = [],
  reviews = [],
  businessSlug,
}: Props) {
  const [workingHoursModalOpen, setWorkingHoursModalOpen] = useState(false);
  const [reviewsModalOpen, setReviewsModalOpen] = useState(false);

  const handlePostReview = async (review: {
    name: string;
    rating: number;
    comment: string;
  }) => {
    if (!businessSlug) return;

    try {
      await postReviewBySlug(businessSlug, {
        name: review.name,
        rating: review.rating,
        comment: review.comment,
      });
      // Optionally refresh the page or update the reviews state
      window.location.reload();
    } catch (error) {
      console.error("Failed to post review:", error);
    }
  };
  return (
    <div className="min-h-screen flex flex-col items-center mx-auto">
      <header className="bg-[#F2F2F2] px-8 py-4 sm:py-2  text-white text-center w-full fixed top-0 z-10 flex justify-center items-center">
        <Image
          src={logoUrl ? logoUrl : "/logo.svg"}
          alt={businessName}
          width={54}
          height={54}
          className="rounded-3xl w-[40px] w-[40px] md:w-[54px] md:h-[54px] object-cover"
        />
        <div className="absolute right-4 lg:right-10 flex text-[#6C35A7] font-bold text-[16px] gap-4 hidden md:flex">
          <div
            onClick={() => setReviewsModalOpen(true)}
            className="flex gap-2 items-center hover:underline transition cursor-pointer md:text-[13px] lg:text-[16px]"
          >
            <Pencil />
            <p>View Reviews</p>
          </div>

          <div
            onClick={() => setWorkingHoursModalOpen(true)}
            className="flex gap-2 items-center hover:underline transition cursor-pointer md:text-[13px] lg:text-[16px]"
          >
            <Eye />
            <p>View Working Hours</p>
          </div>
        </div>
      </header>

      <main className="max-w-[1000px] w-full pt-[50px] flex flex-col items-center sm:px-0">
        {/* Hero */}
        <div className="flex flex-col md:flex-row justify-between w-full mt-10 px-6 lg:px-0 mb-10">
          <div className="flex flex-1 flex-col gap-3 py-10 ">
            <h1 className="font-bold text-[20px] md:text-[30px] lg:text-[32px] text-[#6C35A7]">
              {businessName}
            </h1>
            <p className="font-medium text-[14px] md:text-[16px] lg:text-[17px] font-inter max-w-[400px]">
              {description}
            </p>
            <div className="flex gap-6 items-center  mt-5">
              <Button
                className="bg-[#6C35A7] text-white rounded-full py-6 px-10 font-medium text-[15px]"
                onClick={() =>
                  phoneNumber && window.open(`tel:${phoneNumber}`, "_self")
                }
                disabled={!phoneNumber}
              >
                Call Vendor
              </Button>
              {(facebookLink || instagramLink) && (
                <div className="flex gap-3">
                  {facebookLink && (
                    <Link href={facebookLink} target="_blank" className="bg-[#F2F2F2] rounded-full flex justify-center items-center p-3 transition">
                      <Facebook />
                    </Link>
                  )}
                  {instagramLink && (
                    <Link href={instagramLink} target="_blank" className="bg-[#F2F2F2] rounded-full flex justify-center items-center p-3 transition">
                      <Instagram />
                    </Link>
                  )}
                </div>
              )}
            </div>
          </div>
          {/* Player Card with Vendor Logo */}
          <div className="relative mx-auto">
            <Image
              src="https://res.cloudinary.com/ddbs7m7nt/image/upload/v1761575705/player-card_xhtppp.png"
              alt="Player Card"
              width={200}
              height={150}
              className="mx-auto"
            />
            {/* Vendor Logo positioned in center of player card */}
            <div className="absolute inset-0 bottom-30 flex items-center justify-center">
              <Image
                src={logoUrl || "/logo.svg"}
                alt="Vendor Logo"
                width={80}
                height={80}
                className="rounded-full object-cover w-[90px] h-[90px]"
              />
            </div>
            <div className="absolute inset-x-0 bottom-18 font-bold text-[27px] flex items-center justify-center text-white max-w-[150px] mx-auto text-nowrap overflow-hidden text-ellipsis">
              {businessName}
            </div>
            <div className="absolute inset-x-0 bottom-12 font-medium text-[14px]  text-white max-w-[150px] mx-auto overflow-hidden text-ellipsis text-nowrap">
              VENDOR RATING: ⭐️{" "}
              <span className="font-inter">{averageRating}</span>
            </div>
          </div>
        </div>

        {/* Services */}
        <PublicDisplayGrid services={services} businessName={businessName} />

        {/* Working Hours Modal */}
        <WorkingHoursModal
          trigger={<div />}
          workingHours={workingHours}
          open={workingHoursModalOpen}
          onOpenChange={setWorkingHoursModalOpen}
        />

        {/* Reviews Modal */}
        <VendorReviewsModal
          trigger={<div />}
          reviews={reviews}
          open={reviewsModalOpen}
          onOpenChange={setReviewsModalOpen}
          onPostReview={handlePostReview}
        />

        {/* Footer */}
        <footer className="px-5 my-8 flex items-center text-black text-[20px] leading-[34px] w-full hidden sm:flex">
          <div className="flex-grow border-t border-[#807E7E]" />
          <span className="px-4">Powered by Osiso Pro</span>
          <div className="flex-grow border-t border-[#807E7E]" />
        </footer>
      </main>
    </div>
  );
}
