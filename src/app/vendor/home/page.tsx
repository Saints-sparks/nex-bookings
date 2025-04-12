"use client";
import { Button } from "@/components/ui/button";
import VendorNavbar from "@/components/vendor/NavBar";
import { ServiceDrawer } from "@/components/vendor/ServiceDrawer";
import VendorServices from "@/components/vendor/ServicesGrid";
import { useState } from "react";

export default function VendorHome() {
  const [openDrawer, setOpenDrawer] = useState(false);
  return (
    <div className="flex flex-col justify-center mx-auto w-full  relative pb-10 justify-between">
      {" "}
      {/* add bottom padding */}
      <VendorNavbar />
      <div className="flex flex-col justify-center max-w-[1000px] mx-auto mt-20">
        {/* Top Section */}
        <div className="flex flex-col p-6 sm:p-10 justify-between items-center sm:items-center gap-4">
          <div className="flex items-center w-full justify-between">
            <div className="flex flex-col gap-3">
              <h1 className="text-[#6C35A7] font-bold text-3xl">
                Shola Enterprises
              </h1>
              <p className="font-medium max-w-[487px]">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et{" "}
              </p>
            </div>
            {/* Buttons - Hidden on mobile */}
            <div className="hidden md:flex gap-3">
              <Button
                onClick={() => setOpenDrawer(true)}
                className="bg-[#6C35A7] p-6 text-[16px] font-500 rounded-full hover:bg-purple-700"
              >
                Add Service
              </Button>
              <Button className="bg-[#FFB049] p-6 text-[16px] font-500 rounded-full hover:bg-yellow-800">
                View Website
              </Button>
            </div>
          </div>
          {/* Services Grid */}
          <div>
            <VendorServices />
          </div>
          <div className="px-5 my-8 items-center justify-center text-black text-[20px] leading-[34px] w-full hidden sm:flex">
            <div className="flex-grow border-t border-[#807E7E]"></div>
            <span className="px-4">Nothing to see here</span>
            <div className="flex-grow border-t border-[#807E7E]"></div>
          </div>
        </div>
      </div>
      {/* Mobile buttons */}
      <div className="fixed bg-white p-3 w-full bottom-0 left-0 right-0 z-50 sm:hidden">
        <div className="flex gap-3 justify-center">
          <Button
            onClick={() => setOpenDrawer(true)}
            className="bg-[#6C35A7] flex-1 text-[16px] p-6 font-500 rounded-full"
          >
            Add Service
          </Button>
          <Button className="bg-[#FFB049] flex-1 text-[16px] p-6 font-500 rounded-full">
            View Website
          </Button>
        </div>
      </div>
      <ServiceDrawer open={openDrawer} onOpenChange={setOpenDrawer} />
    </div>
  );
}
