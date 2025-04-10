// components/vendor/Navbar.tsx
"use client";

import { Home, Bell, CircleUserRound } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function VendorNavbar() {
  const pathname = usePathname();

  // Utility function to check if the link is active
  const isActive = (href: string) => pathname === href;

  // Common classes for each link item
  const navLinkClasses =
    "hover:text-primary transition flex flex-col items-center justify-center relative font-[500]";

  return (
    <nav className="flex items-center justify-between px-6 py-2 bg-[#F2F2F2]">
      {/* Logo */}
      <div className="text-[29px] font-bold text-[#6C35A7]">Logo</div>

      {/* Icons */}
      <div className="flex items-center gap-6">
        {/* Home */}
        <Link href="/vendor/home" className={`${navLinkClasses} ${isActive("/vendor/home") ? "text-[#6C35A7]" : "text-[#807E7E]"}`}>
          <Home />
          <p>Home</p>
          {isActive("/vendor/home") && (
            <span className="absolute -bottom-1 h-2 w-2 bg-[#6C35A7] rounded-full" />
          )}
        </Link>

        {/* Notifications */}
        <Link href="/vendor/notifications" className={`${navLinkClasses} ${isActive("/vendor/notifications") ? "text-primary" : "text-[#807E7E]"}`}>
          <Bell />
          <p>Notifications</p>
          {isActive("/vendor/notifications") && (
            <span className="absolute -bottom-1 h-2 w-2 bg-primary rounded-full" />
          )}
        </Link>

        {/* Profile */}
        <Link href="/vendor/profile" className={`${navLinkClasses} ${isActive("/vendor/profile") ? "text-primary" : "text-[#807E7E]"}`}>
          <CircleUserRound />
          <p>Profile</p>
          {isActive("/vendor/profile") && (
            <span className="absolute -bottom-1 h-2 w-2 bg-primary rounded-full" />
          )}
        </Link>
      </div>
    </nav>
  );
}
