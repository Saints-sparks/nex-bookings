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

type SubPlan   = SubscriptionPlan[];
type SubUser   = { subscriptionPlanId: string; status: string }[];

type Ctx = {
  plans:    SubPlan;
  plansLoading: boolean;
  plansError:   string | null;

  userSubs: SubUser;
  subsLoading: boolean;
  subsError:   string | null;

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
  refreshPlans:    () => {},
  refreshUserSubs: () => {},
});

export function SubscriptionProvider({ children }: { children: ReactNode }) {
  // Plans state
  const [plans, setPlans]           = useState<SubPlan>([]);
  const [plansLoading, setPL]       = useState(true);
  const [plansError, setPE]         = useState<string | null>(null);

  // UserSubs state
  const [userSubs, setUserSubs]     = useState<SubUser>([]);
  const [subsLoading, setSL]        = useState(true);
  const [subsError, setSE]          = useState<string | null>(null);

  // Fetch plans
  const fetchPlans = () => {
    setPL(true);
    getSubscriptionPlans()
      .then((p) => {
        setPlans(p);
        setPE(null);
      })
      .catch((err: any) => setPE(err.message || "Failed to load plans"))
      .finally(() => setPL(false));
  };

  // Fetch user subscriptions
  const fetchUserSubs = () => {
    setSL(true);
    const raw = localStorage.getItem("nex_user");
    if (!raw) {
      setUserSubs([]);
      return setSL(false);
    }
    const user = JSON.parse(raw);
    getUserSubscriptions(user.id)
      .then((subs: UserSubscriptionResponse[]) => {
        const arr = Array.isArray(subs) ? subs : [];
        setUserSubs(
          arr.map((s) => ({
            subscriptionPlanId: s.subscriptionPlanId,
            status: s.status,
          }))
        );
        setSE(null);
      })
      .catch((err) => setSE(err.message || "Failed to load subs"))
      .finally(() => setSL(false));
  };

  // Kick them off once
  useEffect(fetchPlans, []);
  useEffect(fetchUserSubs, []);

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
