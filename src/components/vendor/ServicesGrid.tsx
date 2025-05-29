import { getServicesByBusiness, Service } from "@/app/services/service";
import ServiceCard from "@/components/vendor/ServiceCard";
import { useEffect, useState } from "react";
import SkeletonCard from "./SkeletonCard";
import Image from "next/image";
import { Button } from "../ui/button";
import { useServiceManager } from "@/app/hooks/useServiceManager";
import { ServiceDrawer } from "./ServiceDrawer";

export default function VendorServices({
  onEdit,
}: {
  onEdit: (svc: Service) => void;
}) {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { openAdd, setOpenAdd, handleAdded } = useServiceManager();

  useEffect(() => {
    const businessId = localStorage.getItem("nex_businessId");
    if (!businessId) {
      setError("No business found. Please log in again.");
      setLoading(false);
      return;
    }
    console.log(businessId);

    getServicesByBusiness(businessId)
      .then(setServices)
      .catch((err) => {
        console.error(err);
        setError(err.message || "Failed to load services.");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    // render a grid of 6 skeleton cards
    return (
      <section className="mx-auto">
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </section>
    );
  }
  if (error) return <p className="p-6 text-red-500">{error}</p>;
  if (!loading && services.length === 0) {
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
    <section className=" justify-center items-center mx-auto">
      <div className="grid gap-6 grid-cols-1 [@media(min-width:500px)_and_(max-width:700px)]:grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 ">
        {services.map((svc) => (
          <ServiceCard
            key={svc.id}
            id={svc.id}
            title={svc.title}
            price={svc.price}
            duration={svc.duration}
            imageUrl={svc.imageUrl}
            onEdit={() => onEdit(svc)}
          />
        ))}
      </div>
    </section>
  );
}
