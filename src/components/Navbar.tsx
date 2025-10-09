import React from "react";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="bg-[#fff] mx-auto py-4 px-4 md:px-6 lg:px-6 flex flex-row justify-between items-center fixed top-6 left-8 right-8 sm:left-14 sm:right-14 md:left-25 md:right-25 z-10 rounded-full shadow-sm">
      <Image src="/logo.svg" alt="Nex Bookings logo" width={111} height={32} className="w-20 h-auto md:w-[111px]" />
      <div className="flex gap-2 text-[14px] md:text-[15px] font-medium">
        <Link href="/login">
          <button className="bg-[#6C35A7] text-white rounded-full py-2 px-4 w-[100px] sm:w-[120px] md:w-[137px]">
            Log In
          </button>
        </Link>

        <Link href="/signup">
          <button className="bg-[#FFB049] rounded-full py-2 px-4 w-[100px] sm:w-[120px] md:w-[137px] hidden md:block">
            Create Account
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;