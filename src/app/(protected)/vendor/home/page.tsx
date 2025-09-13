// app/vendor/home/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import VendorNavbar from "@/components/vendor/NavBar";
import VendorServices from "@/components/vendor/ServicesGrid";
import { ServiceDrawer } from "@/components/vendor/ServiceDrawer";
import { EditServiceDrawer } from "@/components/vendor/EditServiceDrawer";
import Subscriptions from "@/components/vendor/profile/Subscriptions";
import { useServiceManager } from "@/app/hooks/useServiceManager";
import { useSubscriptions } from "@/app/context/SubscriptionContext";

export default function VendorHome() {
  const {
    businessName,
    businessSlug,
    openAdd,
    openEdit,
    selected,
    refreshKey,
    setOpenAdd,
    setOpenEdit,
    onEditClick,
    handleAdded,
    handleUpdated,
  } = useServiceManager();

  // 1️⃣ Removed the use of useSubscriptions since it is no longer needed to gate the "Add Service" button
  // const { userSubs, subsLoading, subsError, refreshUserSubs } = useSubscriptions();

  // 2️⃣ Removed the logic to check for active subscription
  // const hasActiveSubscription =
  //   !subsLoading &&
  //   !subsError &&
  //   userSubs &&
  //   userSubs.some((s) => s.status === "ACTIVE");

  // 3️⃣ Removed local state for the subscription modal and the wrapper for onAddClick
  // const [openSubModal, setOpenSubModal] = useState(false);
  // const onAddClick = () => {
  //   if (hasActiveSubscription) {
  //     setOpenAdd(true);
  //   } else {
  //     setOpenSubModal(true);
  //   }
  // };

  // 4️⃣ Instead, directly use the setOpenAdd function from the useServiceManager hook
  const onAddClick = () => {
    setOpenAdd(true);
  };

  // 5️⃣ Removed the modal change handler
  // const onSubModalChange = (open: boolean) => {
  //   setOpenSubModal(open);
  // };

  return (
    <div className="flex flex-col pb-10 relative">
      <VendorNavbar />

      <div className="max-w-[1000px] lg:min-w-[920px] mx-auto mt-20 p-6 sm:p-10">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-[#6C35A7] font-bold text-3xl">
              {businessName || "Your Business"}
            </h1>
            <p className="font-inter text-[13px] md:text-[18px] leading-[24px] md:leading-[34px] font-medium max-w-[487px]">
              Showcase your expertise online, making it simple for customers to
              instantly access your service details
            </p>
          </div>
          <div className="flex gap-3 hidden sm:flex">
            <Button
              onClick={onAddClick} // 6️⃣ Use the simplified onAddClick
              className="bg-[#6C35A7] p-6 text-[16px] font-500 rounded-full hover:bg-purple-700"
            >
              Add Service
            </Button>
            <Link
              href={`/vendor/${businessSlug}/edit`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="bg-[#FFB049] p-6 text-[16px] font-500 rounded-full hover:bg-yellow-800">
                View Website
              </Button>
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5 lg:gap-4 mb-10 mt-6 text-start">
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

        {/* Services Grid */}
        <VendorServices
          key={refreshKey}
          onAddClick={onAddClick} // 7️⃣ Use the simplified onAddClick here too
          onEdit={onEditClick}
        />
      </div>

      {/* Mobile buttons */}
      <div className="fixed bg-white p-3 w-full bottom-0 left-0 right-0 z-50 sm:hidden">
        <div className="flex gap-3 justify-center">
          <Button
            onClick={onAddClick} // 8️⃣ And here
            className="bg-[#6C35A7] w-1/2 text-[16px] p-6 font-500 rounded-full"
          >
            Add Service
          </Button>
          <Link
            className="w-1/2 text-[16px]"
            href={`/vendor/${businessSlug}/edit`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button className="bg-[#FFB049] text-[16px] p-6 font-500 rounded-full w-full">
              View Website
            </Button>
          </Link>
        </div>
      </div>

      {/* Drawers */}
      <ServiceDrawer
        open={openAdd}
        onOpenChange={setOpenAdd}
        onServiceAdded={handleAdded}
      />
      <EditServiceDrawer
        open={openEdit}
        onOpenChange={setOpenEdit}
        service={selected}
        onServiceUpdated={handleUpdated}
      />

      {/* 9️⃣ Removed the Subscription Prompt Modal component entirely */}
      {/*
      <Dialog open={openSubModal} onOpenChange={onSubModalChange}>
        <DialogContent className="bg-white rounded-2xl p-6 mx-auto overflow-y-auto scrollbar-hide w-[90%] sm:w-[600px] lg:w-[1040px] max-h-[718px] sm:max-w-[900px]">
          <DialogTitle className="text-2xl font-bold mb-4">
            Subscribe to Add Services
          </DialogTitle>
          <Subscriptions />
        </DialogContent>
      </Dialog>
      */}
    </div>
  );
}