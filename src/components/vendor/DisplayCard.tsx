import Image from "next/image";
import { Button } from "../ui/button";
import { BookingModal } from "./BookingModal";
import { Service } from "@/app/services/service";

interface DisplayCardProps {
  service: Service;
}

export default function DisplayCard({ service }: DisplayCardProps) {
  return (
    <div className="rounded-xl overflow-hidden sm:max-w-[343px] bg-white border border-[#E0E0E0]">
      {/* Image Section */}
      <div className="relative">
        <Image
          src={service.imageUrl} // replace with actual image path
          alt="Nail Trimming"
          width={353}
          height={174}
          className="h-48 object-cover"
        />
        {/* Duration Badge */}
        <span className="absolute top-2 right-2 bg-yellow-400 text-[11px] font-inter sm:text-[12px] text-black font-bold px-3 py-1 rounded-full">
          {service.duration} Hours
        </span>
      </div>

      {/* Text Content */}
      <div className="px-4 py-3 bg-[#F2F2F2]">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-[#6C35A7]">{service.title}</h3>
            <p className="font-bold text-[13px] sm:text-[16px] mt-1 font-inter">
              NGN {service.price}
            </p>
          </div>
          <BookingModal
            serviceId={service.id}
            trigger={
              <Button className="flex items-center gap-2 text-[16px] bg-[#6C35A7] hover:bg-purple-700 font-bold rounded-full">
                Book Now
              </Button>
            }
          />
        </div>
      </div>
    </div>
  );
}
