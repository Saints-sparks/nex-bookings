// services/business.ts
import api from "@/lib/api";

export interface Business {
  businessName: string;
  id: string;
  logo: string;
  userId: string;
}

export interface UpdateBusinessPayload {
  businessName?: string;
  industry?: string;
  logo?: string;
}

export async function getBusinessByUser(userId: string): Promise<Business> {
  const res = await api.get<Business>(`/business/user/${userId}`);
  console.log(res.data);
  
  return res.data;
}

export async function updateBusiness(
  id: string,
  payload: UpdateBusinessPayload
): Promise<Business> {
  const res = await api.put<Business>(`/business/${id}`, payload);
  return res.data;
}
