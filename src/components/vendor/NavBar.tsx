"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import NotificationsSheet from "./notifications/NotificationsSheet";
import Image from "next/image";
import { HomeIcon, ProfileIcon } from "../Icons";
import { useState, useEffect } from "react";

export default function VendorNavbar() {
  const pathname = usePathname();

  // Check for token in localStorage
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("nex_token");
    setIsAuthenticated(!!token);
  }, []);

  const isActive = (href: string) => pathname === href;

  // Base styles for nav links
  const navLinkClasses =
    "hover:text-primary transition flex flex-col items-center justify-center font-medium relative";

  return (
    <nav className="flex md:px-[50px] px-8 py-4 sm:py-2 bg-[#F2F2F2] items-center justify-center fixed top-0 left-0 right-0 z-10">
      <div className="w-[920px] flex justify-between sm:items-center">
        <Image src="/logo.svg" alt="Osiso Pro logo" width={113} height={32} />

        {/* Auth-based navigation */}
        {isAuthenticated ? (
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
              {isActive("/vendor/home") && (
                <span className="absolute -bottom-2 left-0 h-0.5 w-full bg-[#6C35A7]" />
              )}
            </Link>

            {/* Notifications */}
            <div className="relative">
              <NotificationsSheet />
            </div>

            {/* Profile */}
            <Link
              href="/vendor/profile"
              className={`${navLinkClasses} ${
                isActive("/vendor/profile")
                  ? "text-[#6C35A7]"
                  : "text-[#807E7E]"
              }`}
            >
              <ProfileIcon isActive={isActive("/vendor/profile")} />
              <p className="hidden sm:block">Profile</p>
              {isActive("/vendor/profile") && (
                <span className="absolute -bottom-2 left-0 h-0.5 w-full bg-[#6C35A7]" />
              )}
            </Link>
          </div>
        ) : (
          <div className="flex items-center gap-4 py-2">
            <Link href="/login">
              <button className="bg-[#6C35A7] text-white rounded-full py-2 w-[96px] md:w-[137px]">
                Log In
              </button>
            </Link>

            <Link href="/signup">
              <button className="bg-[#FFB049] rounded-full py-2 w-[137px] hidden md:block">
                Create Account
              </button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
