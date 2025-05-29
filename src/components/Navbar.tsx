import React from "react";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="bg-[#F2F2F2] py-4 px-4 md:px-18 lg:px-26 flex justify-between fixed top-0 left-0 right-0 z-10">
      <Image src="/logo.svg" alt="Nex Bookings logo" width={121} height={35} />
      <div className="flex gap-2 text-[14px] md:text-[15px] font-medium">
        <Link href="https://nex-bookings.vercel.app/">
          <button className="bg-[#6C35A7] text-white rounded-full py-2 w-[96px] md:w-[137px]">
            Log In
          </button>
        </Link>

        <Link href="https://nex-bookings.vercel.app/signup">
          <button className="bg-[#FFB049] rounded-full py-2 w-[137px] hidden md:block">
            Create Account
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
