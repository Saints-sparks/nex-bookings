"use client";
import { Button } from "@/components/ui/button";
import VendorNavbar from "@/components/vendor/NavBar";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AccountInfo from "@/components/vendor/profile/AccountInformation";
import WebsiteSettings from "@/components/vendor/profile/WebsiteSettings";
import Subscriptions from "@/components/vendor/profile/Subscriptions";
import AccountSettings from "@/components/vendor/profile/AccountSettings";
import { Account, Card, Globe, Settings, Pencil } from "@/components/Icons";

export default function Profile() {
  const router = useRouter();
  const [businessName, setBusinessName] = useState("");
  const [user, setUser] = useState<any>(null);
  const [selectedTab, setSelectedTab] = useState("Account Information");
  const tabs = [
    {
      label: "Account Information",
      icon: <Account />,
    },
    { label: "Website Settings", icon: <Globe /> },
    { label: "Subscriptions", icon: <Card /> },
    {
      label: "Account Settings",
      icon: <Settings />,
    },
  ];

  useEffect(() => {
    // pull it out of localStorage (or wherever you saved it)
    const name = localStorage.getItem("nex_businessName");
    const userStr = localStorage.getItem("nex_user");
    if (name) setBusinessName(name);
    if (userStr) {
      setUser(JSON.parse(userStr)); // 👈 this right here
    }
  }, []);

  const handleLogout = () => {
    // 1️⃣ clear localStorage keys
    localStorage.removeItem("nex_token");
    localStorage.removeItem("nex_user");
    localStorage.removeItem("nex_userId");
    localStorage.removeItem("nex_businessId");
    // 2️⃣ redirect to login
    router.push("/login");
  };

  if (!user) return null;

  return (
    <div>
      <VendorNavbar />
      <div className="flex flex-col justify-center max-w-[1000px] mx-auto mt-20">
        {/* Top Section */}
        <div className="flex flex-col p-6 sm:p-10 gap-4">
          <div className="flex flex-col md:flex-row items-center w-full justify-between">
            {/* avatar + name */}
            <div className="flex flex-col sm:flex-row gap-10 items-center text-center sm:text-left">
              <div className="relative">
                {/* Placeholder upload box */}
                <div className="w-33 h-33  md:w-57 md:h-57 bg-[#F2F2F2] rounded-3xl flex items-center justify-center text-[23px] text-[#6C35A7] font-bold">
                  Upload Photo
                </div>
                <div className="absolute -bottom-2 -right-2 bg-[#FFB049] rounded-full p-2 shadow-md cursor-pointer hover:bg-gray-100 transition">
                  <Pencil />
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <h1 className="text-[#6C35A7] font-bold text-3xl">
                  {businessName || "Your Business"}
                </h1>
                <p className="font-medium font-inter text-[13px] md:text-[17px]">
                  {user.phoneNumber}
                </p>
              </div>
            </div>

            {/* Log Out */}
            <Button
              onClick={handleLogout}
              className="bg-red-500 text-white text-[16px] p-6 rounded-full hover:bg-red-600 mt-5 sm:mt-0"
            >
              Log Out
            </Button>
          </div>

          {/* Tabs */}
          <div className="bg-white w-full p-2 border-y border-[#CBCACA] overflow-x-auto">
            <div className="flex justify-between px-6">
              {tabs.map((tab) => {
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
                      {tab.icon}
                      {tab.label}
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
          {selectedTab === "Account Information" && (
            <AccountInfo businessName={businessName} user={user} />
          )}
          {selectedTab === "Website Settings" && <WebsiteSettings />}
          {selectedTab === "Subscriptions" && <Subscriptions />}
          {selectedTab === "Account Settings" && <AccountSettings />}
        </div>
      </div>
    </div>
  );
}
