// hooks/useServiceManager.ts
import { useEffect, useState, useCallback } from "react";
import type { Service } from "@/app/services/service";

export function useServiceManager() {
  // business info
  const [businessName, setBusinessName] = useState<string>("");
  const [businessId, setBusinessId] = useState<string | null>(null);

  // drawer & refresh state
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [selected, setSelected] = useState<Service | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    setBusinessId(localStorage.getItem("nex_businessId"));
    const name = localStorage.getItem("nex_businessName");
    if (name) setBusinessName(name);
  }, []);

  const onAddClick = () => setOpenAdd(true);
  const onEditClick = (svc: Service) => {
    setSelected(svc);
    setOpenEdit(true);
  };

  const handleAdded = useCallback(() => {
    setOpenAdd(false);
    setRefreshKey((k) => k + 1);
  }, []);

  const handleUpdated = useCallback(() => {
    setOpenEdit(false);
    setRefreshKey((k) => k + 1);
  }, []);

  return {
    businessName,
    businessId,
    openAdd,
    setOpenAdd,
    openEdit,
    setOpenEdit,
    selected,
    refreshKey,
    onAddClick,
    onEditClick,
    handleAdded,
    handleUpdated,
  };
}
