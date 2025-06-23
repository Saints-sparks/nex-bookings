"use client";

import { useRedirectIfAuthenticated } from "@/hooks/useRedirectIfAuthenticated";

export default function VendorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useRedirectIfAuthenticated();

  return <>{children}</>;
}
