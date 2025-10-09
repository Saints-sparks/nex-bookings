import Image from "next/image";
import { Pen } from "lucide-react";
import { Button } from "../ui/button";

interface ServiceCardProps {
  id: string;
  title: string;
  price: number;
  duration: number;
  durationType: "hours" | "days" | "weeks" | "months";
  images: string[];
  onEdit: () => void;
}

export default function ServiceCard({
  title,
  price,
  duration,
  durationType,
  images,
  onEdit,
}: ServiceCardProps) {
  return (
    <div className="rounded-xl overflow-hidden sm:max-w-[343px] bg-white shadow">
      {/* Image */}
      <div className="relative">
        <Image
          src={images && images.length > 0 ? images[0] : ""}
          alt={title}
          width={353}
          height={174}
          className="h-48 object-cover"
        />
        <span className="absolute top-2 right-2 bg-[#FFB049] text-[12px] font-bold px-3 py-2 rounded-xl font-inter">
          {duration} {durationType.toUpperCase()}
        </span>
      </div>

      {/* Content */}
      <div className="px-4 py-3 bg-[#F2F2F2]">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-[#6C35A7]">{title}</h3>
            <p className="font-bold text-sm mt-1 font-inter">
              NGN {price.toLocaleString()}
            </p>
          </div>
          <Button
            variant="ghost"
            onClick={onEdit}
            className="flex items-center gap-2 text-[14px] text-[#6C35A7] hover:underline font-medium font-inter"
          >
            Edit <Pen fill="#6C35A7" size={14} />
          </Button>
        </div>
      </div>
    </div>
  );
}
