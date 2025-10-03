"use client";
// import { Service } from "@/app/services/service";
import DisplayCard from "./DisplayCard";
import ServiceDetailsModal from "./ServiceDetailsModal";
import { BookingModal } from "../booking/BookingModal";
import { useState } from "react";
import { getServiceById, Service } from "@/app/services/service";
import Image from "next/image";
import { useServiceManager } from "@/app/hooks/useServiceManager";

export default function PublicDisplayGrid({
  services,
  businessName,
}: {
  services: Service[];
  businessName: string;
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(false);

  const handleCardClick = async (serviceId: string) => {
    setLoading(true);
    try {
      const svc = await getServiceById(serviceId);
      setSelectedService(svc);
      setModalOpen(true);
    } finally {
      setLoading(false);
    }
  };

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
          No Services have been added by {businessName}
        </p>
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
          <DisplayCard
            key={svc.id}
            service={svc}
            onClick={() => handleCardClick(svc.id)}
          />
        ))}
      </div>
      <ServiceDetailsModal
        service={selectedService}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onContinueBooking={() => {
          setModalOpen(false);
          setBookingModalOpen(true);
        }}
      />
      {selectedService && (
        <BookingModal
          trigger={<div />}
          serviceId={selectedService.id}
          serviceImage={selectedService.images?.[0]}
          open={bookingModalOpen}
          onOpenChange={setBookingModalOpen}
        />
      )}
    </section>
  );
}
