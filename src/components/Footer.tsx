import Link from "next/link";
import React from "react";
import { Instagram, X } from "./Icons";
import Image from "next/image";

const Footer = () => (
  <footer className="bg-[#6C35A7] text-white py-12 px-6 md:px-20 lg:px-28  items-center md:items-start flex flex-col gap-10 lg:mt-25 md:mt-0 sm:mt-90">
    <div className="flex flex-col md:flex-row justify-between gap-10 w-full items-center md:items-start">
      <div className="flex flex-col md:flex-row gap-8 lg:gap-16 font-bold text-[20px] md:text-[22px] lg:text-[24px] leading-[49px] text-center md:text-left">
        <Link href="/landing">Home</Link>
        <Link href="/terms-of-service">Terms & Conditions</Link>
        <Link href="/privacy-policy">Privacy Policy</Link>
      </div>
      <div className="flex gap-6 ">
        <Link href="https://www.instagram.com/osisopro/">
          <div className="bg-white w-[56px] h-[56px] flex items-center justify-center rounded-2xl">
            <Instagram />
          </div>
        </Link>
        <Link href="https://x.com/osisopro/">
          <div className="bg-white w-[56px] h-[56px] flex items-center justify-center rounded-2xl">
            <X />
          </div>
        </Link>
      </div>
    </div>
    <div className="flex flex-col md:flex-row justify-between items-center md:items-end gap-6 w-full">
      <Image
        src="/osiso.svg"
        alt="Osiso Pro logo"
        width={44}
        height={44}
        className="w-[44px] h-[44px]"
      />
      <Link
        href="mailto:info@osisopro.com"
        className="relative inline-block text-[24px] font-bold group"
      >
        info@osisopro.com
        <span
          className="
            absolute left-0 -bottom-1 
            h-[2px] bg-white 
            w-full 
            scale-x-0 
            origin-left 
            transition-transform 
            duration-300 
            group-hover:scale-x-100
          "
        />
      </Link>
    </div>
  </footer>
);

export default Footer;
