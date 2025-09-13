import React from "react";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="bg-[#000] max-w-7xl mx-auto py-6 px-6 md:px-6 lg:px-6 flex flex-row justify-between items-center fixed top-6 left-10 right-10 z-10 rounded-full shadow-lg">
  <Image src="/logo.svg" alt="Nex Bookings logo" width={121} height={35} />
  <div className="flex gap-2 text-[14px] md:text-[15px] font-medium">
    <Link href="/login">
      <button className="bg-[#6C35A7] text-white rounded-full py-2 px-4 md:w-[137px]">
        Log In
      </button>
    </Link>

    <Link href="/signup">
      <button className="bg-[#FFB049] rounded-full py-2 px-4 w-[137px] hidden md:block">
        Create Account
      </button>
    </Link>
  </div>
</div>
  );
};

export default Navbar;
