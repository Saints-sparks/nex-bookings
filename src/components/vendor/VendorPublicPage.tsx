// components/vendor/VendorPublicPage.tsx
import Image from "next/image";
import DisplayGrid from "./DisplayGrid";
import type { Service } from "@/app/services/service";

interface Props {
  businessName: string;
  description: string;
  logoUrl: string;
  services: Service[];
}

export default function VendorPublicPage({
  businessName,
  description,
  logoUrl,
  services,
}: Props) {
  return (
    <div className="min-h-screen flex flex-col items-center mx-auto">
      <header className="bg-[#F2F2F2] px-8 py-4 sm:py-2  text-white text-center w-full fixed top-0 z-10">
        <Image
          src={logoUrl}
          alt={businessName}
          width={54}
          height={54}
          className="mx-auto"
        />
      </header>

      <main className="max-w-[1000px] w-full pt-[50px] flex flex-col items-center px-8 sm:px-0">
        {/* Hero */}
        <div className="flex flex-col gap-3 py-10 text-center max-w-[487px]">
          <h1 className="font-bold text-[20px] sm:text-[35px] text-[#6C35A7]">
            {businessName}
          </h1>
          <p className="font-medium text-[14px] sm:text-[18px] font-inter">
            {description}
          </p>
        </div>

        {/* Services */}
        <DisplayGrid services={services} />

        {/* Footer */}
        <footer className="px-5 my-8 flex items-center text-black text-[20px] leading-[34px] w-full hidden sm:flex">
          <div className="flex-grow border-t border-[#807E7E]" />
          <span className="px-4">Powered by Nex Bookings</span>
          <div className="flex-grow border-t border-[#807E7E]" />
        </footer>
      </main>
    </div>
  );
}
