import Link from "next/link";
import React from "react";
import { Instagram, X } from "./Icons";
import Image from "next/image";

const Footer = () => (
  <footer className="bg-[#6C35A7] text-white py-12 px-6 md:px-20 lg:px-28  items-center md:items-start flex flex-col gap-10">
    <div className="flex flex-col md:flex-row justify-between gap-10 w-full items-center md:items-start">
      <div className="flex flex-col md:flex-row gap-8 lg:gap-16 font-bold text-[20px] md:text-[22px] lg:text-[24px] leading-[49px] text-center md:text-left">
        <Link href="#">Home</Link>
        <Link href="/terms-of-service">Terms & Conditions</Link>
        <Link href="/privacy-policy">Privacy Policy</Link>
      </div>
      <div className="flex gap-6 ">
        <div className="bg-white w-[56px] h-[56px] flex items-center justify-center rounded-2xl">
          <Instagram />
        </div>
        <div className="bg-white w-[56px] h-[56px] flex items-center justify-center rounded-2xl">
          <X />
        </div>
      </div>
    </div>
    <div className="flex flex-col md:flex-row justify-between items-center md:items-end gap-6 w-full">
      <Image
        src="/osiso.svg"
        alt="Osiso Pro logo"
        width={135}
        height={38}
        className="w-[112px] h-[32px] md:w-[135px] md:h-[38px]"
      />
      <p className="text-[24px] font-bold">Info@osisobookings.com</p>
    </div>
  </footer>
);

export default Footer;
