// app/providers.tsx
"use client";

import { ReactNode } from "react";
import { SubscriptionProvider } from "./context/SubscriptionContext";


export function Providers({ children }: { children: ReactNode }) {
  return <SubscriptionProvider>{children}</SubscriptionProvider>;
}
