// components/vendor/VendorPublicPage.tsx
import Image from "next/image";
import DisplayGrid from "./DisplayGrid";
import type { Service } from "@/app/services/service";
import { Facebook, Instagram, Pencil, Share } from "../Icons";

interface Props {
  //   businessName: string;
  //   description: string;
  //   logoUrl: string;
  services: Service[];
}

export default function VendorEdit({ services }: Props) {
  return (
    <div className="min-h-screen flex flex-col items-center mx-auto">
      <header className="bg-[#F2F2F2] px-8 py-4 sm:py-2 text-white text-center w-full fixed top-0 z-10 flex items-center justify-center">
        <div className="relative w-full flex items-center justify-center">
          <Image
            src="/nex.svg"
            alt="Vendor Logo"
            width={121}
            height={34}
            className="mx-auto"
          />
          <div className="absolute right-10 flex text-[#6C35A7] font-bold text-[14px] sm:text-[16px] gap-4 hidden md:flex">
            <div className="flex gap-2 items-center hover:underline transition cursor-pointer">
              <Pencil />
              <p>Edit Website</p>
            </div>
            <div className="flex gap-2 items-center hover:underline transition cursor-pointer">
              <Share />
              <p>Share Website Link</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-[1000px] w-full pt-[50px] md:pt-[80px] flex flex-col items-center px-5 sm:px-0">
        {/* Hero */}
        <div className="flex flex-col gap-3 py-10 text-center max-w-[487px]">
          <h1 className="font-bold text-[20px] md:text-[35px] text-[#6C35A7]">
            Edit Header Here
          </h1>
          <p className="font-medium text-[14px] md:text-[18px] font-inter leading-[24px] md:leading-[34px]">
            Enter details about your business here, A paragraph is best suited
          </p>
          <div className="flex gap-10 justify-center mt-5">
            <Facebook />
            <Instagram />
          </div>
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
