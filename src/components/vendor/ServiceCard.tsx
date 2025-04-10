import Image from "next/image";
import { Pen } from "lucide-react";
import Link from "next/link";

export default function ServiceCard() {
  return (
    <div className="rounded-xl overflow-hidden max-w-[343px] bg-white">
      {/* Image Section */}
      <div className="relative">
        <Image
          src="/images/nails.png" // replace with actual image path
          alt="Nail Trimming"
          width={353}
          height={174}
          className="w-full h-48 object-cover"
        />
        {/* Duration Badge */}
        <span className="absolute top-2 right-2 bg-yellow-400 text-sm text-black font-medium px-3 py-1 rounded-full">
          3 Hours
        </span>
      </div>

      {/* Text Content */}
      <div className="px-4 py-3 bg-[#F2F2F2]">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-[#6C35A7]">Nail Trimming</h3>
            <p className="font-bold text-sm mt-1">NGN 7,000</p>
          </div>
          <Link
            href="/vendor/services/edit/1"
            className="flex items-center gap-2 text-[14px] text-[#6C35A7] hover:underline font-[500]"
          >
            Edit <Pen fill="#6C35A7" size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}
