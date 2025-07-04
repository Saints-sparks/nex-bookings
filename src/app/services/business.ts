// services/business.ts
import api from "@/lib/api";

export interface Business {
  businessName: string;
  id: string;
  logo: string;
  slug?: string;
  userId: string;
}

export interface BusinessProfile {
  id: string;
  businessName: string;
  logo: string;
  industry: string;
  slug: string;
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

export async function getBusinessById(id: string): Promise<Business> {
  const res = await api.get<Business>(`/business/${id}`);
  return res.data;
}

export async function getBusinessBySlug(
  slug: string
): Promise<BusinessProfile> {
  try {
    const response = await api.get<BusinessProfile>(`/business/slug/${slug}`);
    return response.data; // Axios returns the parsed body here
  } catch (err: any) {
    // You can inspect err.response?.status if you want a 404‑specific message
    if (err.response?.status === 404) {
      throw new Error("Business not found");
    }
    // rethrow other errors (network, 5xx, etc.)
    throw err;
  }
}

export async function updateBusiness(
  id: string,
  payload: UpdateBusinessPayload
): Promise<Business> {
  const res = await api.put<Business>(`/business/${id}`, payload);
  return res.data;
}
