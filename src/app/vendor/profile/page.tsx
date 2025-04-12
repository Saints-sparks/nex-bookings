"use client";
import { Button } from "@/components/ui/button";
import { CircleUserRound, CreditCard, Globe, Settings } from "lucide-react";
import VendorNavbar from "@/components/vendor/NavBar";
import Image from "next/image";
import { useState } from "react";
import AccountInfo from "@/components/vendor/profile/AccountInformation";
import WebsiteSettings from "@/components/vendor/profile/WebsiteSettings";
import Subscriptions from "@/components/vendor/profile/Subscriptions";
import AccountSettings from "@/components/vendor/profile/AccountSettings";

export default function Profile() {
  const [selectedTab, setSelectedTab] = useState("Account Information");
  const tabs = [
    {
      label: "Account Information",
      icon: <CircleUserRound className="text-[#6C35A7]" />,
    },
    { label: "Website Settings", icon: <Globe className="text-[#6C35A7]" /> },
    { label: "Subscriptions", icon: <CreditCard className="text-[#6C35A7]" /> },
    {
      label: "Account Settings",
      icon: <Settings className="text-[#6C35A7]" />,
    },
  ];

  return (
    <div className="">
      <VendorNavbar />
      <div className="flex flex-col justify-center max-w-[1000px] mx-auto mt-20">
        {/* Top Section */}
        <div className="flex flex-col p-6 sm:p-10 justify-between items-center sm:items-center gap-4">
          <div className="flex items-center w-full justify-between">
            <div className="flex flex-col sm:flex-row gap-10 items-center text-center sm:text-left w-full sm:w-auto">
              <Image
                src="/images/shola.png" // replace with actual image path
                alt="Nail Trimming"
                width={180}
                height={180}
              />
              <div className="flex flex-col gap-3">
                <h1 className="text-[#6C35A7] font-bold text-3xl">
                  Shola Enterprises
                </h1>
                <p className="font-medium ">+234 567 335 2349</p>
              </div>
            </div>
            <div>
              <Button className="bg-red-500 flex-1 text-[16px] p-6 font-500 rounded-full hidden sm:flex hover:bg-red-600">
                Log Out
              </Button>
            </div>
          </div>

          <div className="bg-white w-full items-center justify-between p-2 flex flex-col gap-4 border-y border-[#CBCACA] overflow-x-auto">
            <div className="flex gap-2 overflow-x-auto w-full justify-between px-6">
              {tabs.map((tab) => {
                const isActive = selectedTab === tab.label;
                return (
                  <div key={tab.label} className="flex flex-col items-center">
                    <Button
                      onClick={() => setSelectedTab(tab.label)}
                      className={`text-[#6C35A7] shadow-none items-center bg-transparent hover:bg-transparent py-0
                      }`}
                    >
                      {tab.icon}
                      {tab.label}
                    </Button>
                    {isActive && (
                      <span className="w-2 h-2 rounded-full bg-[#6C35A7]"></span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          {selectedTab === "Account Information" && <AccountInfo />}
          {selectedTab === "Website Settings" && <WebsiteSettings />}
          {selectedTab === "Subscriptions" && <Subscriptions />}
          {selectedTab === "Account Settings" && <AccountSettings />}
        </div>
      </div>
    </div>
  );
}
