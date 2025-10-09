/* app/vendor/profile/ProfileClient.tsx */
"use client";
import React, { useEffect, useState, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import VendorNavbar from "@/components/vendor/NavBar";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import AccountInfo from "@/components/vendor/profile/AccountInformation";
import WebsiteSettings from "@/components/vendor/profile/WebsiteSettings";
import Wallets from "@/components/vendor/profile/Wallets";
import WorkHours from "@/components/vendor/profile/WorkHours";
import AccountSettings from "@/components/vendor/profile/AccountSettings";
import {
  Account,
  Card,
  Globe,
  Settings,
  Pencil,
  Gift,
} from "@/components/Icons";
import { getBusinessById, updateBusiness } from "@/app/services/business";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { Loader2 } from "lucide-react";

export default function ProfileClient() {
  const router = useRouter();
  const params = useSearchParams();
  const initialTab = params.get("tab") || "Account Information";

  const [businessName, setBusinessName] = useState("");
  const [user, setUser] = useState<any>(null);
  const [selectedTab, setSelectedTab] = useState(initialTab);
  const [profilePic, setProfilePic] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      const name = localStorage.getItem("nex_businessName");
      const userStr = localStorage.getItem("nex_user");
      const id = localStorage.getItem("nex_businessId");
      if (id) {
        const business = await getBusinessById(id);
        setProfilePic(business.logo); // Remove or use as needed
        // You can use 'business' as needed here
      }

      if (name) setBusinessName(name);
      if (userStr) setUser(JSON.parse(userStr));
    };
    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    router.push("/login");
  };

  const handlePencilClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadToCloudinary(file);
      const businessId = localStorage.getItem("nex_businessId");
      if (!businessId) throw new Error("Missing business ID");
      await updateBusiness(businessId, { logo: url });
      setProfilePic(url);
      localStorage.setItem("nex_businessLogo", url);
    } catch (err: any) {
      console.error("Logo upload/update failed:", err);
    } finally {
      setUploading(false);
    }
  };

  if (!user) {
    return null;
  }

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
                {profilePic ? (
                  <Image
                    src={profilePic}
                    alt="Profile Photo"
                    width={128}
                    height={128}
                    className="rounded-3xl w-33 h-33 md:w-57 md:h-57 object-cover"
                  />
                ) : (
                  <div className="w-33 h-33 md:w-57 md:h-57 bg-[#F2F2F2] rounded-3xl flex items-center justify-center text-[17px] md:text-[23px] text-[#6C35A7] font-bold">
                    Upload Photo
                  </div>
                )}

                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  className="hidden"
                  onChange={handleFileChange}
                />

                <div
                  onClick={handlePencilClick}
                  className="absolute -bottom-2 -right-2 bg-[#FFB049] rounded-full p-2 shadow-md cursor-pointer hover:bg-gray-100 transition"
                >
                  <Pencil />
                </div>

                {uploading && (
                  <div className="absolute inset-0 bg-white/90 backdrop-blur-sm flex items-center justify-center rounded-3xl">
                    <Loader2 className="w-8 h-8 animate-spin text-[#6C35A7]" />
                  </div>
                )}
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
              {[
                { label: "Account Information", icon: <Account /> },
                { label: "Website Settings", icon: <Globe /> },
                { label: "Wallets", icon: <Card /> },
                { label: "Work Hours", icon: <Gift /> },
                { label: "Account Settings", icon: <Settings /> },
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
          {selectedTab === "Account Information" && (
            <AccountInfo businessName={businessName} user={user} />
          )}
          {selectedTab === "Website Settings" && <WebsiteSettings />}
          {selectedTab === "Wallets" && <Wallets />}
          {selectedTab === "Work Hours" && <WorkHours />}
          {selectedTab === "Account Settings" && <AccountSettings />}
        </div>
      </div>
    </div>
  );
}
