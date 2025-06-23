// hooks/useRedirectIfAuthenticated.ts
"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function useRedirectIfAuthenticated() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("nex_token");
    if (token) {
      // replace so user can’t go “back” to login/signup
      router.replace("/vendor/home");
    }
  }, [router]);
}
