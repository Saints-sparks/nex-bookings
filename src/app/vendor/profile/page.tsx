"use client";
import { Button } from "@/components/ui/button";
import {
  CircleUserRound,
  CreditCard,
  Globe,
  Pencil,
  Settings,
} from "lucide-react";
import VendorNavbar from "@/components/vendor/NavBar";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AccountInfo from "@/components/vendor/profile/AccountInformation";
import WebsiteSettings from "@/components/vendor/profile/WebsiteSettings";
import Subscriptions from "@/components/vendor/profile/Subscriptions";
import AccountSettings from "@/components/vendor/profile/AccountSettings";

export default function Profile() {
  const router = useRouter();
  const [businessName, setBusinessName] = useState("");
  const [user, setUser] = useState<any>(null);
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
          <div className="flex items-center w-full justify-between">
            {/* avatar + name */}
            <div className="flex flex-col sm:flex-row gap-10 items-center text-center sm:text-left">
              <div className="relative w-fit">
                <Image
                  src="/images/shola.png"
                  alt="Profile"
                  width={180}
                  height={180}
                  className="shadow-2xl rounded-3xl"
                />
                <div className="absolute -bottom-2 -right-2 bg-[#FFB049] rounded-full p-2 shadow-md cursor-pointer hover:bg-gray-100 transition">
                  <Pencil fill="#6C35A7" className="w-4 h-4" />
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <h1 className="text-[#6C35A7] font-bold text-3xl">
                  {businessName || "Your Business"}
                </h1>
                <p className="font-medium">{user.phoneNumber}</p>
              </div>
            </div>

            {/* Log Out */}
            <Button
              onClick={handleLogout}
              className="bg-red-500 text-white text-[16px] p-4 rounded-full hover:bg-red-600"
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
                  <div key={tab.label} className="flex flex-col items-center">
                    <Button
                      onClick={() => setSelectedTab(tab.label)}
                      className="bg-transparent text-[#6C35A7] shadow-none py-0 hover:bg-transparent"
                    >
                      {tab.icon}
                      {tab.label}
                    </Button>
                    {isActive && (
                      <span className="w-2 h-2 rounded-full bg-[#6C35A7] mt-1" />
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
