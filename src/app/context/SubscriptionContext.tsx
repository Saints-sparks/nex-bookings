// context/SubscriptionContext.tsx
"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import {
  getSubscriptionPlans,
  getUserSubscriptions,
  SubscriptionPlan,
  UserSubscriptionResponse,
} from "@/app/services/subscriptions";

type SubPlan = SubscriptionPlan[];
type SubUser = UserSubscriptionResponse[];

type Ctx = {
  plans: SubPlan;
  plansLoading: boolean;
  plansError: string | null;

  userSubs: SubUser;
  subsLoading: boolean;
  subsError: string | null;

  refreshPlans: () => void;
  refreshUserSubs: () => void;
};

const SubscriptionContext = createContext<Ctx>({
  plans: [],
  plansLoading: true,
  plansError: null,
  userSubs: [],
  subsLoading: true,
  subsError: null,
  refreshPlans: () => {},
  refreshUserSubs: () => {},
});

export function SubscriptionProvider({ children }: { children: ReactNode }) {
  // ─── State ────────────────────────────────────────────────────────────────
  const [plans, setPlans] = useState<SubPlan>([]);
  const [plansLoading, setPL] = useState(true);
  const [plansError, setPE] = useState<string | null>(null);

  const [userSubs, setUserSubs] = useState<SubUser>([]);
  const [subsLoading, setSL] = useState(true);
  const [subsError, setSE] = useState<string | null>(null);

  // Track the current user ID (or null) from localStorage.nex_user
  const [currentUserId, setCurrentUserId] = useState<string | null>(() => {
    if (typeof window === "undefined") return null;
    const raw = localStorage.getItem("nex_user");
    return raw ? JSON.parse(raw).id : null;
  });

  // ─── Helpers ──────────────────────────────────────────────────────────────
  const fetchPlans = async () => {
    setPL(true);
    try {
      const p = await getSubscriptionPlans();
      setPlans(p);
      setPE(null);
    } catch (err: any) {
      setPE(err.message || "Failed to load plans");
    } finally {
      setPL(false);
    }
  };

  const fetchUserSubs = async () => {
    setSL(true);
    try {
      const raw = localStorage.getItem("nex_user");
      if (!raw) {
        setUserSubs([]);
        return;
      }
      const user = JSON.parse(raw);
      const subs = await getUserSubscriptions(user.id);
      const arr = Array.isArray(subs) ? subs : [];
      setUserSubs(subs);
      setSE(null);
    } catch (err: any) {
      setSE(err.message || "Failed to load subs");
    } finally {
      setSL(false);
    }
  };

  // ─── Broadcast same‑tab localStorage changes ───────────────────────────────
  // Monkey‑patch setItem once, so that every call also dispatches "local-storage"
  useEffect(() => {
    const rawSet = localStorage.setItem;
    localStorage.setItem = function (key, value) {
      rawSet.apply(this, [key, value]);
      window.dispatchEvent(new Event("local-storage"));
    };
    return () => {
      // restore if needed
      localStorage.setItem = rawSet;
    };
  }, []);

  // ─── Listen for storage changes (same tab + other tabs) ────────────────────
  useEffect(() => {
    const handler = () => {
      const raw = localStorage.getItem("nex_user");
      setCurrentUserId(raw ? JSON.parse(raw).id : null);
    };
    window.addEventListener("storage", handler); // other tabs
    window.addEventListener("local-storage", handler); // same tab
    return () => {
      window.removeEventListener("storage", handler);
      window.removeEventListener("local-storage", handler);
    };
  }, []);

  // ─── Whenever user changes, re-fetch everything ────────────────────────────
  useEffect(() => {
    (async () => {
      await fetchPlans();
      await fetchUserSubs();
    })();
  }, [currentUserId]);

  // ─── Render ────────────────────────────────────────────────────────────────
  return (
    <SubscriptionContext.Provider
      value={{
        plans,
        plansLoading,
        plansError,
        userSubs,
        subsLoading,
        subsError,
        refreshPlans: fetchPlans,
        refreshUserSubs: fetchUserSubs,
      }}
    >
      {children}
    </SubscriptionContext.Provider>
  );
}

export function useSubscriptions() {
  return useContext(SubscriptionContext);
}
