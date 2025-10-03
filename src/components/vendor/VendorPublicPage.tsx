// components/vendor/VendorPublicPage.tsx
"use client";

import Image from "next/image";
import type { Service } from "@/app/services/service";
import PublicDisplayGrid from "./PublicDisplayGrid";
import WorkingHoursModal from "./WorkingHoursModal";
import Link from "next/link";
import { Eye, Facebook, Instagram, Pencil, Share } from "../Icons";
import { Button } from "../ui/button";
import { useState } from "react";

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
}

export default function VendorPublicPage({
  businessName,
  description,
  logoUrl,
  services,
  instagramLink,
  facebookLink,
  phoneNumber,
  workingHours = [],
}: Props) {
  const [workingHoursModalOpen, setWorkingHoursModalOpen] = useState(false);
  return (
    <div className="min-h-screen flex flex-col items-center mx-auto">
      <header className="bg-[#F2F2F2] px-8 py-6 sm:py-2  text-white text-center w-full fixed top-0 z-10 flex justify-center items-center">
        <Image
          src={logoUrl ? logoUrl : "/logo.svg"}
          alt={businessName}
          width={54}
          height={54}
          className="rounded-3xl w-[40px] w-[40px] md:w-[54px] md:h-[54px] object-cover"
        />
        <div className="absolute right-0 lg:right-10 flex text-[#6C35A7] font-bold text-[16px] gap-4 hidden md:flex">
          <div className="flex gap-2 items-center hover:underline transition cursor-pointer md:text-[13px] lg:text-[16px]">
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

      <main className="max-w-[1000px] w-full pt-[100px] flex flex-col items-center px-8 sm:px-0">
        {/* Hero */}
        <div className="flex justify-between w-full mt-10 px-6 lg:px-0">
          <div className="flex flex-1 flex-col gap-3 py-10 ">
            <h1 className="font-bold text-[20px] md:text-[30px] lg:text-[35px] text-[#6C35A7]">
              {businessName}
            </h1>
            <p className="font-medium text-[14px] md:text-[16px] lg:text-[18px] font-inter">
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
                <div className="">
                  {facebookLink && (
                    <Link href={facebookLink} target="_blank">
                      <Facebook />
                    </Link>
                  )}
                  {instagramLink && (
                    <Link href={instagramLink} target="_blank">
                      <Instagram />
                    </Link>
                  )}
                </div>
              )}
            </div>
          </div>
          <Image
            src={logoUrl || "/logo.svg"}
            alt="Vendor Logo"
            width={200}
            height={150}
            className="mx-auto"
          />
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
