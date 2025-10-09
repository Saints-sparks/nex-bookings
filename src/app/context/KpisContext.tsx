import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { getBusinessKpis, BusinessKpis } from "@/app/services/bookings";

interface KpisContextType {
  kpis: BusinessKpis | null;
  loading: boolean;
  error: string | null;
  refresh: () => void;
}

const KpisContext = createContext<KpisContextType | undefined>(undefined);

export const useKpis = () => {
  const ctx = useContext(KpisContext);
  if (!ctx) throw new Error("useKpis must be used within a KpisProvider");
  return ctx;
};

interface KpisProviderProps {
  businessId: string;
  children: ReactNode;
}

export const KpisProvider = ({ businessId, children }: KpisProviderProps) => {
  const [kpis, setKpis] = useState<BusinessKpis | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchKpis = () => {
    if (!businessId) return;
    setLoading(true);
    setError(null);
    getBusinessKpis(businessId)
      .then(setKpis)
      .catch(() => setError("Could not load KPIs"))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchKpis();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [businessId]);

  return (
    <KpisContext.Provider value={{ kpis, loading, error, refresh: fetchKpis }}>
      {children}
    </KpisContext.Provider>
  );
};
