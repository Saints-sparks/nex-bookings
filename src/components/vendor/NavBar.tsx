"use client";

import { Home, Bell, CircleUserRound } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import NotificationsDrawer from "./notifications/NotificationsSheet";
import NotificationsSheet from "./notifications/NotificationsSheet";
// import NotificationsDrawer from "@/components/vendor/NotificationsDrawer"; // <- import it here

export default function VendorNavbar() {
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href;

  const navLinkClasses =
    "hover:text-primary transition flex flex-col items-center justify-center relative font-medium";

  return (
    <nav className="flex md:px-[50px] px-8 py-4 sm:py-2 bg-[#F2F2F2] items-center justify-center">
      <div className="w-[920px] flex justify-between sm:items-center">
        <div className="text-[22px] sm:text-[29px] font-bold text-[#6C35A7]">
          Logo
        </div>

        <div className="flex items-center gap-4 sm:gap-6">
          {/* Home */}
          <Link
            href="/vendor/home"
            className={`${navLinkClasses} ${
              isActive("/vendor/home") ? "text-[#6C35A7]" : "text-[#807E7E]"
            }`}
          >
            <Home className="mb-2 sm:mb-0" />
            <p className="hidden sm:block">Home</p>
            {isActive("/vendor/home") && (
              <span className="absolute -bottom-1 h-2 w-2 bg-[#6C35A7] rounded-full" />
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
            <CircleUserRound className="mb-2 sm:mb-0" />
            <p className="hidden sm:block">Profile</p>
            {isActive("/vendor/profile") && (
              <span className="absolute -bottom-1 h-2 w-2 bg-[#6C35A7] rounded-full" />
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
}
