// app/(protected)/vendor/layout.tsx
"use client";

import { useAuthGuard } from "@/hooks/useAuthGuard";

export default function VendorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useAuthGuard();

  return <>{children}</>;
}
