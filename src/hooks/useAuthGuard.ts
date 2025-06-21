// app/hooks/useAuthGuard.ts
"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

const PUBLIC_ROUTES = ["/", "/login", "/signup"];

export function useAuthGuard() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const isPublic =
      PUBLIC_ROUTES.includes(pathname) ||
      (pathname.startsWith("https://osisopro.com/vendor/") &&
        pathname.split("/").length === 3);

    const token = localStorage.getItem("nex_token");

    if (!token && !isPublic) {
      router.replace("/login");
    }
  }, [pathname, router]);
}
