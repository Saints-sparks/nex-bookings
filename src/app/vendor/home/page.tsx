// app/vendor/home/page.tsx
"use client";

import { useEffect, useState } from "react";
import VendorNavbar from "@/components/vendor/NavBar";
import VendorServices from "@/components/vendor/ServicesGrid";
import { ServiceDrawer } from "@/components/vendor/ServiceDrawer";
import { EditServiceDrawer } from "@/components/vendor/EditServiceDrawer";
// import { Service } from "@/services/service";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Service } from "@/app/services/service";

export default function VendorHome() {
  const [businessName, setBusinessName] = useState("");
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [selected, setSelected] = useState<Service | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [businessId, setBusinessId] = useState<string | null>(null);

  useEffect(() => {
    setBusinessId(localStorage.getItem("nex_businessId"));
  }, []);

  useEffect(() => {
    // pull it out of localStorage (or wherever you saved it)
    const name = localStorage.getItem("nex_businessName");
    if (name) setBusinessName(name);
  }, []);

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
      <div className="max-w-[1000px] lg:min-w-[920px] mx-auto mt-20 p-6 sm:p-10">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-[#6C35A7] font-bold text-3xl">
              {businessName || "Your Business"}
            </h1>
            <p className="font-inter text-[13px] md:text-[18px] leading-[24px] md:leading-[34px] font-medium max-w-[487px]">
            Showcase your expertise online, making it simple for customers to instantly access your service details
            </p>
          </div>
          <div className="flex gap-3 hidden sm:flex">
            <Button
              onClick={() => setOpenAdd(true)}
              className="bg-[#6C35A7] p-6 text-[16px] font-500 rounded-full hover:bg-purple-700"
            >
              Add Service
            </Button>
            <Link href={`/vendor/${businessId}`}>
              <Button className="bg-[#FFB049] p-6 text-[16px] font-500 rounded-full hover:bg-yellow-800">
                View Website
              </Button>
            </Link>
          </div>
        </div>
        {/* Services Grid */}
        <VendorServices key={refreshKey} onEdit={onEdit} />
      </div>
      {/* Mobile buttons */}
      <div className="fixed bg-white p-3 w-full bottom-0 left-0 right-0 z-50 sm:hidden">
        <div className="flex gap-3 justify-center">
          <Button
            onClick={() => setOpenAdd(true)}
            className="bg-[#6C35A7] w-1/2 text-[16px] p-6 font-500 rounded-full "
          >
            Add Service
          </Button>
          <Link className="w-1/2 text-[16px] " href={`/vendor/${businessId}`}>
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
