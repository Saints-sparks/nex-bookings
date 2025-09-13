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
  // Check if we're using mock data
  if (userId === "mock_user_id") {
    return {
      id: "mock_business_id",
      businessName: "Mock Business",
      logo: "/images/mock-logo.png",
      slug: "mock-business",
      userId: "mock_user_id"
    };
  }
  
  const res = await api.get<Business>(`/business/user/${userId}`);
  console.log(res.data);
  return res.data;
}

export async function getBusinessById(id: string): Promise<Business> {
  // Check if we're using mock data
  if (id === "mock_business_id") {
    return {
      id: "mock_business_id",
      businessName: "Mock Business",
      logo: "/images/mock-logo.png",
      slug: "mock-business",
      userId: "mock_user_id"
    };
  }
  
  const res = await api.get<Business>(`/business/${id}`);
  return res.data;
}

export async function getBusinessBySlug(slug: string): Promise<BusinessProfile> {
  // Check if we're using mock data
  if (slug === "mock-business") {
    return {
      id: "mock_business_id",
      businessName: "Mock Business",
      logo: "/images/mock-logo.png",
      industry: "Technology",
      slug: "mock-business"
    };
  }
  
  try {
    const response = await api.get<BusinessProfile>(`/business/slug/${slug}`);
    return response.data;
  } catch (err: any) {
    if (err.response?.status === 404) {
      throw new Error("Business not found");
    }
    throw err;
  }
}

export async function updateBusiness(
  id: string,
  payload: UpdateBusinessPayload
): Promise<Business> {
  // Check if we're using mock data
  if (id === "mock_business_id") {
    // For mock data, just return the updated mock business
    return {
      id: "mock_business_id",
      businessName: payload.businessName || "Mock Business",
      logo: payload.logo || "/images/mock-logo.png",
      slug: "mock-business",
      userId: "mock_user_id"
    };
  }
  
  const res = await api.put<Business>(`/business/${id}`, payload);
  return res.data;
}