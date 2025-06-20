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
      (pathname.startsWith("http://localhost:3000/vendor/") &&
        pathname.split("/").length === 3);

    const token = localStorage.getItem("nex_token");

    if (!token && !isPublic) {
      router.replace("/login");
    }
  }, [pathname, router]);
}
