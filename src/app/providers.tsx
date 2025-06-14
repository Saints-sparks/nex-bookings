import { useMemo } from "react";
import { SubscriptionProvider } from "./context/SubscriptionContext";

export function Providers({ children }: { children: React.ReactNode }) {
  // pick up the user id (or token) from localStorage or from
  // your auth‑context/searchParams, whatever you already use
  const userJson =
    typeof window !== "undefined" ? localStorage.getItem("nex_user") : null;
  const userId = useMemo(
    () => (userJson ? JSON.parse(userJson).id : "guest"),
    [userJson]
  );

  return (
    // key changes whenever `userId` changes → SubscriptionProvider remounts
    <SubscriptionProvider key={userId}>{children}</SubscriptionProvider>
  );
}
