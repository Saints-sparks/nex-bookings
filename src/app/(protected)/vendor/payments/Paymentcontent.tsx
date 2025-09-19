"use client";

import React, { useState } from "react";
import VendorNavbar from "@/components/vendor/NavBar";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  Card,
  Globe,
} from "@/components/Icons";
import Payments from "@/components/vendor/Payments/PaymentsPage";
import Payouts from "@/components/vendor/Payments/PayoutsPage";
import PaymentsPage from "@/components/vendor/Payments/PaymentsPage";
import PayoutsPage from "@/components/vendor/Payments/PayoutsPage";



const Paymentcontent = () => {
  const [selectedTab, setSelectedTab] = useState("Payments");




  return (
    <div>
      <VendorNavbar />
      <div className="flex flex-col justify-center max-w-[1000px] mx-auto mt-20">
        <div className="grid  grid-cols-2 md:grid-cols-4 gap-4 md:gap-5 lg:gap-4 mb-10 mt-6 text-start">
          <div className="flex flex-col bg-[#F2F2F2] p-4 rounded-2xl gap-2">
            <h4 className="text-[#6C35A7] font-bold text-sm md:text-base lg:text-lg">
              Bookings (This Month)
            </h4>
            <h1 className="text-black font-bold text-lg md:text-xl lg:text-2xl">
              104
            </h1>
          </div>
          <div className="flex flex-col bg-[#F2F2F2] p-4 rounded-2xl gap-2">
            <h4 className="text-[#6C35A7] font-bold text-sm md:text-base lg:text-lg">
              Income (This Month)
            </h4>
            <h1 className="text-black font-bold text-lg md:text-xl lg:text-2xl">
              ₦ 104,000
            </h1>
          </div>
          <div className="flex flex-col bg-[#F2F2F2] p-4 rounded-2xl gap-2">
            <h4 className="text-[#6C35A7] font-bold text-sm md:text-base lg:text-lg">
              Bookings (All Time)
            </h4>
            <h1 className="text-black font-bold text-lg md:text-xl lg:text-2xl">
              1364
            </h1>
          </div>
          <div className="flex flex-col bg-[#F2F2F2] p-4 rounded-2xl gap-2">
            <h4 className="text-[#6C35A7] font-bold text-sm md:text-base lg:text-lg">
              Income (All Time)
            </h4>
            <h1 className="text-black font-bold text-lg md:text-xl lg:text-2xl">
              ₦ 104,000,000
            </h1>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white w-full p-2 border-y border-[#CBCACA] overflow-x-auto">
          <div className="flex gap-20 px-6 justify-center">
            {[
              { label: "Payments", icon: <Card /> },
              { label: "Payouts", icon: <Globe /> },
            ].map((tab) => {
              const isActive = selectedTab === tab.label;
              return (
                <div
                  key={tab.label}
                  className="flex flex-col items-center relative"
                >
                  <Button
                    onClick={() => setSelectedTab(tab.label)}
                    className="bg-transparent text-[#6C35A7] shadow-none py-0 hover:bg-transparent"
                  >
                    {tab.icon} {tab.label}
                  </Button>
                  {isActive && (
                    <span className="absolute -bottom-2 left-0 h-0.5 w-full bg-[#6C35A7]" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Tab Panels */}
        {selectedTab === "Payments" && <PaymentsPage/>}
        {selectedTab === "Payouts" && <PayoutsPage />}
      </div>
    </div>
  );
};

export default Paymentcontent;