"use client";
import { Service } from "@/app/services/service";
import DisplayCard from "./DisplayCard";
import Image from "next/image";
import { Button } from "../ui/button";
import { useState } from "react";
import { ServiceDrawer } from "./ServiceDrawer";
import { useServiceManager } from "@/app/hooks/useServiceManager";

export default function DisplayGrid({ services }: { services: Service[] }) {
  const { openAdd, setOpenAdd, handleAdded, refreshKey } = useServiceManager();

  if (services.length === 0) {
    return (
      <section className="p-6 text-center text-black flex flex-col gap-10 justify-center items-center">
        <Image
          src="/empty.svg"
          alt="No services available"
          width={429}
          height={373}
        />
        <p className="max-w-[487px] text-[13px] md:text-[18px] leading-[28px] md:leading-[34px] font-inter ">
          You have not created any service yet, Click Button below to get
          started
        </p>
        <Button
          onClick={() => setOpenAdd(true)}
          className="bg-[#6C35A7] p-6 text-[16px] font-500 rounded-full hover:bg-purple-700"
        >
          Add Service
        </Button>
        <ServiceDrawer
          open={openAdd}
          onOpenChange={setOpenAdd}
          onServiceAdded={handleAdded}
        />
      </section>
    );
  }
  return (
    <section className="justify-center items-center mx-auto">
      <h2 className="text-center text-[22px] md:text-[28px] lg:text-[30px] font-bold mb-6 text-[#6C35A7]">
        Services Offered
      </h2>
      <div className="grid gap-6 grid-cols-1 [@media(min-width:500px)_and_(max-width:700px)]:grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
        {services.map((svc) => (
          <DisplayCard key={svc.id} service={svc} />
        ))}
      </div>
    </section>
  );
}
