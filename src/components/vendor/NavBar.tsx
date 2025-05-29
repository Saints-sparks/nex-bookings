"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import NotificationsSheet from "./notifications/NotificationsSheet";
import Image from "next/image";
import { HomeIcon, ProfileIcon } from "../Icons";

export default function VendorNavbar() {
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href;

  // Base styles for nav links
  const navLinkClasses =
    "hover:text-primary transition flex flex-col items-center justify-center font-medium relative";

  return (
    <nav className="flex md:px-[50px] px-8 py-4 sm:py-2 bg-[#F2F2F2] items-center justify-center fixed top-0 left-0 right-0 z-10">
      <div className="w-[920px] flex justify-between sm:items-center">
        <Image
          src="/logo.svg"
          alt="Nex Bookings logo"
          width={113}
          height={32}
        />

        <div className="flex items-center gap-4 sm:gap-6">
          {/* Home */}
          <Link
            href="/vendor/home"
            className={`${navLinkClasses} ${
              isActive("/vendor/home") ? "text-[#6C35A7]" : "text-[#807E7E]"
            }`}
          >
            <HomeIcon isActive={isActive("/vendor/home")} />
            <p className="hidden sm:block">Home</p>
            {/* Active underline positioned at bottom of navbar */}
            {isActive("/vendor/home") && (
              <span className="absolute -bottom-2 left-0 h-0.5 w-full bg-[#6C35A7]" />
            )}
          </Link>

          <div className="relative">
            <NotificationsSheet />
          </div>

          {/* Profile */}
          <Link
            href="/vendor/profile"
            className={`${navLinkClasses} ${
              isActive("/vendor/profile") ? "text-[#6C35A7]" : "text-[#807E7E]"
            }`}
          >
            <ProfileIcon isActive={isActive("/vendor/profile")} />
            <p className="hidden sm:block">Profile</p>
            {isActive("/vendor/profile") && (
              <span className="absolute -bottom-2 left-0 h-0.5 w-full bg-[#6C35A7]" />
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
}
