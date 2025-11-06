// components/DisplayCard.tsx
"use client";
import Image from "next/image";
import { Button } from "../ui/button";
// import { BookingModal } from "./booking/BookingModal";
import { Service } from "@/app/services/service";
import { useRouter } from "next/navigation";
import { useMediaQuery } from "react-responsive";
import { BookingModal } from "../booking/BookingModal";

interface DisplayCardProps {
  service: Service;
  onClick?: () => void;
}

export default function DisplayCard({ service, onClick }: DisplayCardProps) {
  const router = useRouter();
  // Tailwind's "sm" below 640px
  const isMobile = useMediaQuery({ maxWidth: 639 });

  const handleClick = () => {
    if (isMobile) {
      router.push(`/booking/${service.id}`);
    } else {
      // On desktop, clicking the card should open service details
      onClick?.();
    }
  };

  const handleBookNowClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent event bubbling to card
    // Same behavior for both mobile and desktop
    onClick?.();
  };

  const trigger = (
    <Button
      onClick={handleBookNowClick}
      className="flex items-center gap-2 text-[16px] bg-[#6C35A7] hover:bg-purple-700 font-bold rounded-full"
    >
      Book Now
    </Button>
  );

  return (
    <div
      className="rounded-xl overflow-hidden sm:max-w-[343px] bg-white border border-[#E0E0E0] cursor-pointer"
      onClick={onClick}
    >
      <div className="relative">
        <Image
          src={
            service.images && service.images.length > 0 ? service.images[0] : ""
          }
          alt={service.title}
          width={353}
          height={174}
          className="h-48 object-cover"
        />
        <span className="absolute top-2 right-2 bg-[#FFB049] text-[11px] sm:text-[12px] font-inter text-black font-bold px-3 py-2 rounded-xl">
          {service.duration} Hours
        </span>
      </div>
      <div className="px-4 py-3 bg-[#F2F2F2]">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-[#6C35A7]">{service.title}</h3>
            <p className="font-bold text-[13px] sm:text-[16px] mt-1 font-inter">
              NGN {service.price}
            </p>
          </div>
          {isMobile
            ? trigger
            : // On desktop, Book Now should open ServiceDetailsModal, not BookingModal directly
              trigger}
        </div>
      </div>
    </div>
  );
}
