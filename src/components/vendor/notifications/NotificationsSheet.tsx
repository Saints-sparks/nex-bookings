"use client";

import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Bell } from "lucide-react";
import Image from "next/image";

export default function NotificationsSheet() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="relative hover:text-primary transition flex flex-col items-center justify-center text-[#807E7E] font-medium cursor-pointer">
          <Bell className="mb-2 sm:mb-0" />
          <p className="hidden sm:block">Notifications</p>
          {/* Optional unread indicator */}
          {/* <span className="absolute -top-1 -right-1 bg-red-500 h-2 w-2 rounded-full" /> */}
        </button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-full lg:max-w-[520px] xl:max-w-[630px] p-4"
      >
        <SheetHeader>
          <SheetTitle className="text-[#6C35A7] text-[22px] sm:text-[24px]">
            Notifications
          </SheetTitle>
        </SheetHeader>
        {/* Notification content goes here */}
        <div className="space-y-4 overflow-y-auto">
          {/* Map through notifications or display a message */}
          <div className="flex flex-col">
            <div className="flex bg-[#F2F2F2] p-4 rounded-t-lg items-center justify-between">
              <div className="flex gap-4">
                <Image
                  src="/images/nails.png" // replace with actual image path
                  alt="Nail Trimming"
                  width={353}
                  height={174}
                  className="w-14 h-14 object-cover rounded-lg"
                />
                <div className="flex flex-col font-bold ">
                  <h2 className="text-[15px] sm:text-[18px] text-[#6C35A7]">
                    Nail Trimming
                  </h2>
                  <p className="text-[12px] sm:text-[14px]">NGN 7,000</p>
                </div>
              </div>
              <div className="">
                <p className="font-medium text-[14px] sm:text-[16px]">
                  Booking Details
                </p>
              </div>
            </div>
            <div className="flex bg-[#FFB049] rounded-b-lg justify-between p-4">
              <div className="flex flex-col">
                <h3 className="text-[14px] sm:text-[17px] font-medium">Date</h3>
                <p className="text-[#6C35A7] text-[11px] sm:text-[14px] font-bold sm:hidden">
                  25/12/24
                </p>
                <p className="text-[#6C35A7] text-[11px] sm:text-[14px] font-bold hidden sm:block">
                  25 December 2024
                </p>
              </div>
              <div className="flex flex-col">
                <h3 className="text-[14px] sm:text-[17px] font-medium">Time</h3>
                <p className="text-[#6C35A7] text-[11px] sm:text-[14px] font-bold">
                  12:30 PM
                </p>
              </div>
              <div className="flex flex-col">
                <h3 className="text-[14px] sm:text-[17px] font-medium">
                  Contact
                </h3>
                <p className="text-[#6C35A7] text-[11px] sm:text-[14px] font-bold">
                  0803 456 2343
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex bg-[#F2F2F2] p-4 rounded-t-lg items-center justify-between">
              <div className="flex gap-4">
                <Image
                  src="/images/nails.png" // replace with actual image path
                  alt="Nail Trimming"
                  width={353}
                  height={174}
                  className="w-14 h-14 object-cover rounded-lg"
                />
                <div className="flex flex-col font-bold ">
                  <h2 className="text-[15px] sm:text-[18px] text-[#6C35A7]">
                    Nail Trimming
                  </h2>
                  <p className="text-[12px] sm:text-[14px]">NGN 7,000</p>
                </div>
              </div>
              <div className="">
                <p className="font-medium text-[14px] sm:text-[16px]">
                  Booking Details
                </p>
              </div>
            </div>
            <div className="flex bg-[#FFB049] rounded-b-lg justify-between p-4">
              <div className="flex flex-col">
                <h3 className="text-[14px] sm:text-[17px] font-medium">Date</h3>
                <p className="text-[#6C35A7] text-[11px] sm:text-[14px] font-bold sm:hidden">
                  25/12/24
                </p>
                <p className="text-[#6C35A7] text-[11px] sm:text-[14px] font-bold hidden sm:block">
                  25 December 2024
                </p>
              </div>
              <div className="flex flex-col">
                <h3 className="text-[14px] sm:text-[17px] font-medium">Time</h3>
                <p className="text-[#6C35A7] text-[11px] sm:text-[14px] font-bold">
                  12:30 PM
                </p>
              </div>
              <div className="flex flex-col">
                <h3 className="text-[14px] sm:text-[17px] font-medium">
                  Contact
                </h3>
                <p className="text-[#6C35A7] text-[11px] sm:text-[14px] font-bold">
                  0803 456 2343
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex bg-[#F2F2F2] p-4 rounded-t-lg items-center justify-between">
              <div className="flex gap-4">
                <Image
                  src="/images/nails.png" // replace with actual image path
                  alt="Nail Trimming"
                  width={353}
                  height={174}
                  className="w-14 h-14 object-cover rounded-lg"
                />
                <div className="flex flex-col font-bold ">
                  <h2 className="text-[15px] sm:text-[18px] text-[#6C35A7]">
                    Nail Trimming
                  </h2>
                  <p className="text-[12px] sm:text-[14px]">NGN 7,000</p>
                </div>
              </div>
              <div className="">
                <p className="font-medium text-[14px] sm:text-[16px]">
                  Booking Details
                </p>
              </div>
            </div>
            <div className="flex bg-[#FFB049] rounded-b-lg justify-between p-4">
              <div className="flex flex-col">
                <h3 className="text-[14px] sm:text-[17px] font-medium">Date</h3>
                <p className="text-[#6C35A7] text-[11px] sm:text-[14px] font-bold sm:hidden">
                  25/12/24
                </p>
                <p className="text-[#6C35A7] text-[11px] sm:text-[14px] font-bold hidden sm:block">
                  25 December 2024
                </p>
              </div>
              <div className="flex flex-col">
                <h3 className="text-[14px] sm:text-[17px] font-medium">Time</h3>
                <p className="text-[#6C35A7] text-[11px] sm:text-[14px] font-bold">
                  12:30 PM
                </p>
              </div>
              <div className="flex flex-col">
                <h3 className="text-[14px] sm:text-[17px] font-medium">
                  Contact
                </h3>
                <p className="text-[#6C35A7] text-[11px] sm:text-[14px] font-bold">
                  0803 456 2343
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex bg-[#F2F2F2] p-4 rounded-t-lg items-center justify-between">
              <div className="flex gap-4">
                <Image
                  src="/images/nails.png" // replace with actual image path
                  alt="Nail Trimming"
                  width={353}
                  height={174}
                  className="w-14 h-14 object-cover rounded-lg"
                />
                <div className="flex flex-col font-bold ">
                  <h2 className="text-[15px] sm:text-[18px] text-[#6C35A7]">
                    Nail Trimming
                  </h2>
                  <p className="text-[12px] sm:text-[14px]">NGN 7,000</p>
                </div>
              </div>
              <div className="">
                <p className="font-medium text-[14px] sm:text-[16px]">
                  Booking Details
                </p>
              </div>
            </div>
            <div className="flex bg-[#FFB049] rounded-b-lg justify-between p-4">
              <div className="flex flex-col">
                <h3 className="text-[14px] sm:text-[17px] font-medium">Date</h3>
                <p className="text-[#6C35A7] text-[11px] sm:text-[14px] font-bold sm:hidden">
                  25/12/24
                </p>
                <p className="text-[#6C35A7] text-[11px] sm:text-[14px] font-bold hidden sm:block">
                  25 December 2024
                </p>
              </div>
              <div className="flex flex-col">
                <h3 className="text-[14px] sm:text-[17px] font-medium">Time</h3>
                <p className="text-[#6C35A7] text-[11px] sm:text-[14px] font-bold">
                  12:30 PM
                </p>
              </div>
              <div className="flex flex-col">
                <h3 className="text-[14px] sm:text-[17px] font-medium">
                  Contact
                </h3>
                <p className="text-[#6C35A7] text-[11px] sm:text-[14px] font-bold">
                  0803 456 2343
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex bg-[#F2F2F2] p-4 rounded-t-lg items-center justify-between">
              <div className="flex gap-4">
                <Image
                  src="/images/nails.png" // replace with actual image path
                  alt="Nail Trimming"
                  width={353}
                  height={174}
                  className="w-14 h-14 object-cover rounded-lg"
                />
                <div className="flex flex-col font-bold ">
                  <h2 className="text-[15px] sm:text-[18px] text-[#6C35A7]">
                    Nail Trimming
                  </h2>
                  <p className="text-[12px] sm:text-[14px]">NGN 7,000</p>
                </div>
              </div>
              <div className="">
                <p className="font-medium text-[14px] sm:text-[16px]">
                  Booking Details
                </p>
              </div>
            </div>
            <div className="flex bg-[#FFB049] rounded-b-lg justify-between p-4">
              <div className="flex flex-col">
                <h3 className="text-[14px] sm:text-[17px] font-medium">Date</h3>
                <p className="text-[#6C35A7] text-[11px] sm:text-[14px] font-bold sm:hidden">
                  25/12/24
                </p>
                <p className="text-[#6C35A7] text-[11px] sm:text-[14px] font-bold hidden sm:block">
                  25 December 2024
                </p>
              </div>
              <div className="flex flex-col">
                <h3 className="text-[14px] sm:text-[17px] font-medium">Time</h3>
                <p className="text-[#6C35A7] text-[11px] sm:text-[14px] font-bold">
                  12:30 PM
                </p>
              </div>
              <div className="flex flex-col">
                <h3 className="text-[14px] sm:text-[17px] font-medium">
                  Contact
                </h3>
                <p className="text-[#6C35A7] text-[11px] sm:text-[14px] font-bold">
                  0803 456 2343
                </p>
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
