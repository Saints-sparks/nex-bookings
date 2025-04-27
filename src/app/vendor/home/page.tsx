// app/vendor/home/page.tsx
"use client";

import { useState } from "react";
import VendorNavbar from "@/components/vendor/NavBar";
import VendorServices from "@/components/vendor/ServicesGrid";
import { ServiceDrawer } from "@/components/vendor/ServiceDrawer";
import { EditServiceDrawer } from "@/components/vendor/EditServiceDrawer";
// import { Service } from "@/services/service";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Service } from "@/app/services/service";

export default function VendorHome() {
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [selected, setSelected] = useState<Service | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleServiceAdded = () => {
    setOpenAdd(false);
    setRefreshKey((k) => k + 1);
  };
  const handleServiceUpdated = () => {
    setRefreshKey((k) => k + 1);
  };

  const onEdit = (svc: Service) => {
    setSelected(svc);
    setOpenEdit(true);
  };

  return (
    <div className="flex flex-col pb-10 relative">
      <VendorNavbar />
      <div className="max-w-[1000px] mx-auto mt-20 p-6 sm:p-10">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-[#6C35A7] font-bold text-3xl">
              Shola Enterprises
            </h1>
            <p className="font-inter font-medium max-w-[487px]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et
            </p>
          </div>
          <div className="flex gap-3">
            <Button
              onClick={() => setOpenAdd(true)}
              className="bg-[#6C35A7] p-6 text-[16px] font-500 rounded-full hover:bg-purple-700"
            >
              Add Service
            </Button>
            <Link href="/vendor/shola-enterprises">
              <Button className="bg-[#FFB049] p-6 text-[16px] font-500 rounded-full hover:bg-yellow-800">
                View Website
              </Button>
            </Link>
          </div>
        </div>

        {/* Services Grid */}
        <VendorServices key={refreshKey} onEdit={onEdit} />

        {/* Fallback message */}
        {/* (VendorServices handles empty and loading states) */}
      </div>

      {/* Drawers */}
      <ServiceDrawer
        open={openAdd}
        onOpenChange={setOpenAdd}
        onServiceAdded={handleServiceAdded}
      />
      <EditServiceDrawer
        open={openEdit}
        onOpenChange={setOpenEdit}
        service={selected}
        onServiceUpdated={handleServiceUpdated}
      />
    </div>
  );
}
