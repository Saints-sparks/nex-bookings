"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import VendorNavbar from "@/components/vendor/NavBar";
import VendorServices from "@/components/vendor/ServicesGrid";
import { ServiceDrawer } from "@/components/vendor/ServiceDrawer";
import { EditServiceDrawer } from "@/components/vendor/EditServiceDrawer";
import { useServiceManager } from "@/app/hooks/useServiceManager";
import { useSubscriptions } from "@/app/context/SubscriptionContext";
import { KpisProvider, useKpis } from "@/app/context/KpisContext";

const KpiGrid: React.FC = () => {
  const { kpis, loading, error } = useKpis();

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5 lg:gap-4 mb-10 mt-6 text-start">
      <div className="flex flex-col bg-[#F2F2F2] p-4 rounded-2xl gap-2">
        <h4 className="text-[#6C35A7] font-bold text-sm md:text-base lg:text-lg">
          Bookings (This Month)
        </h4>
        <h1 className="text-black font-bold text-lg md:text-xl lg:text-2xl">
          {loading ? "..." : error ? "-" : kpis?.bookingsThisMonth ?? "-"}
        </h1>
      </div>

      <div className="flex flex-col bg-[#F2F2F2] p-4 rounded-2xl gap-2">
        <h4 className="text-[#6C35A7] font-bold text-sm md:text-base lg:text-lg">
          Income (This Month)
        </h4>
        <h1 className="text-black font-bold text-lg md:text-xl lg:text-2xl">
          {loading ? "..." : error ? "-" : `₦ ${kpis?.incomeThisMonth?.toLocaleString() ?? "-"}`}
        </h1>
      </div>

      <div className="flex flex-col bg-[#F2F2F2] p-4 rounded-2xl gap-2">
        <h4 className="text-[#6C35A7] font-bold text-sm md:text-base lg:text-lg">
          Bookings (All Time)
        </h4>
        <h1 className="text-black font-bold text-lg md:text-xl lg:text-2xl">
          {loading ? "..." : error ? "-" : kpis?.bookingsAllTime ?? "-"}
        </h1>
      </div>

      <div className="flex flex-col bg-[#F2F2F2] p-4 rounded-2xl gap-2">
        <h4 className="text-[#6C35A7] font-bold text-sm md:text-base lg:text-lg">
          Income (All Time)
        </h4>
        <h1 className="text-black font-bold text-lg md:text-xl lg:text-2xl">
          {loading ? "..." : error ? "-" : `₦ ${kpis?.incomeAllTime?.toLocaleString() ?? "-"}`}
        </h1>
      </div>
    </div>
  );
};

export default function VendorHome() {
  const {
    businessName,
    businessSlug,
    businessId,
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

  // subscription pieces (kept as-is)
  const { userSubs, subsLoading, subsError, refreshUserSubs } = useSubscriptions();

  const hasActiveSubscription =
    !subsLoading &&
    !subsError &&
    userSubs &&
    userSubs.some((s) => s.status === "ACTIVE");

  const [openSubModal, setOpenSubModal] = useState(false);

  // simplified add-click from your notes
  const onAddClick = () => {
    setOpenAdd(true);
  };

  const onSubModalChange = (open: boolean) => {
    setOpenSubModal(open);
  };

  if (!businessId) return null;


  return (
    <div className="flex flex-col pb-10 relative">
      <VendorNavbar />

      {/* Wrap page content with KpisProvider so child components can use the KPI context.
          The previous useEffect that fetched KPIs has been removed. */}
      <KpisProvider businessId={businessId}>
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

          {/* KPI Grid now uses the KpisContext via useKpis */}
          <KpiGrid />

          {/* Services Grid */}
          <VendorServices
            key={refreshKey}
            onAddClick={onAddClick}
            onEdit={onEditClick}
          />
        </div>
      </KpisProvider>

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
      <ServiceDrawer open={openAdd} onOpenChange={setOpenAdd} onServiceAdded={handleAdded} />
      <EditServiceDrawer
        open={openEdit}
        onOpenChange={setOpenEdit}
        service={selected}
        onServiceUpdated={handleUpdated}
      />

      {/* Subscription modal removed intentionally (as per your notes) */}
    </div>
  );
}
