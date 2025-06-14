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
    businessId,
    openAdd,
    openEdit,
    selected,
    refreshKey,
    setOpenAdd,
    setOpenEdit,
    onAddClick: origOnAddClick,
    onEditClick,
    handleAdded,
    handleUpdated,
  } = useServiceManager();

  // 1️⃣ grab subscriptions state from context
  const { userSubs, subsLoading, subsError, refreshUserSubs } =
    useSubscriptions();

  // 2️⃣ derive whether there’s an active subscription
  const hasActiveSubscription =
    !subsLoading && !subsError && userSubs.some((s) => s.status === "ACTIVE");

  // local state for the subscription modal & pending action
  const [openSubModal, setOpenSubModal] = useState(false);

  // 3️⃣ wrap the original add-click
  const onAddClick = () => {
    if (hasActiveSubscription) {
      setOpenAdd(true);
    } else {
      setOpenSubModal(true);
    }
  };

  // 4️⃣ when the modal closes, re-open the drawer if needed
  const onSubModalChange = (open: boolean) => {
    setOpenSubModal(open);
  };

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
              onClick={onAddClick}
              className="bg-[#6C35A7] p-6 text-[16px] font-500 rounded-full hover:bg-purple-700"
            >
              Add Service
            </Button>
            <Link
              href={`/vendor/${businessId}/edit`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="bg-[#FFB049] p-6 text-[16px] font-500 rounded-full hover:bg-yellow-800">
                View Website
              </Button>
            </Link>
          </div>
        </div>

        {/* Services Grid */}
        <VendorServices key={refreshKey} onEdit={onEditClick} />
      </div>

      {/* Mobile buttons */}
      <div className="fixed bg-white p-3 w-full bottom-0 left-0 right-0 z-50 sm:hidden">
        <div className="flex gap-3 justify-center">
          <Button
            onClick={onAddClick}
            className="bg-[#6C35A7] w-1/2 text-[16px] p-6 font-500 rounded-full"
          >
            Add Service
          </Button>
          <Link
            className="w-1/2 text-[16px]"
            href={`/vendor/${businessId}`}
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

      {/* Subscription Prompt Modal */}
      <Dialog open={openSubModal} onOpenChange={onSubModalChange}>
        <DialogContent className="bg-white rounded-2xl p-6 mx-auto overflow-y-auto scrollbar-hide w-[90%] sm:w-[600px] lg:w-[1040px] max-h-[718px] sm:max-w-[900px]">
          <DialogTitle className="text-2xl font-bold mb-4">
            Subscribe to Add Services
          </DialogTitle>
          <Subscriptions />
        </DialogContent>
      </Dialog>
    </div>
  );
}
