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
  userId: string;
  businessName: string;
  logo: string;
  industry: string;
  slug: string;
  workingHours: WorkingHour[];
  address: string;
  phoneNumber: string;
  email: string;
  description: string;
  createdAt: string;
}

export interface UpdateBusinessPayload {
  businessName?: string;
  industry?: string;
  logo?: string;
}

export interface WorkingHour {
  day: string;
  isOpen: boolean;
  openTime: string;
  closeTime: string;
}

export interface Review {
  id: string | number;
  name: string;
  rating: number; // 0-5
  comment: string;
}

export async function getBusinessByUser(userId: string): Promise<Business> {
  // Check if we're using mock data
  if (userId === "mock_user_id") {
    return {
      id: "mock_business_id",
      businessName: "Mock Business",
      logo: "/images/mock-logo.png",
      slug: "mock-business",
      userId: "mock_user_id",
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
      userId: "mock_user_id",
    };
  }

  const res = await api.get<Business>(`/business/${id}`);
  return res.data;
}

export async function getBusinessBySlug(
  slug: string
): Promise<BusinessProfile> {
  // Check if we're using mock data
  if (slug === "mock-business") {
    return {
      id: "mock_business_id",
      userId: "mock_user_id",
      businessName: "Mock Business",
      logo: "/images/mock-logo.png",
      industry: "Technology",
      slug: "mock-business",
      workingHours: [
        {
          day: "Monday",
          openTime: "09:00",
          closeTime: "17:00",
          isOpen: true,
        },
      ],
      address: "123 Mock Street",
      phoneNumber: "+1234567890",
      email: "mock@business.com",
      description: "Mock business description",
      createdAt: "2025-10-03T10:30:00Z",
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
      userId: "mock_user_id",
    };
  }

  const res = await api.put<Business>(`/business/${id}`, payload);
  return res.data;
}

export async function getBusinessWorkingHours(
  businessId: string
): Promise<WorkingHour[]> {
  const res = await api.get<WorkingHour[]>(
    `/business/${businessId}/working-hours`
  );
  return res.data;
}

export async function updateBusinessWorkingHours(
  businessId: string,
  hours: WorkingHour[]
): Promise<void> {
  await api.put(`/business/${businessId}/working-hours`, hours);
}

export async function getReviewsByBusinessId(
  businessId: string
): Promise<Review[]> {
  const res = await api.get<Review[]>(`/business/${businessId}/reviews`);
  return res.data;
}

export async function postReviewBySlug(
  slug: string,
  payload: { name: string; rating: number; comment: string }
): Promise<Review> {
  const res = await api.post<Review>(`/business/slug/${slug}/reviews`, payload);
  return res.data;
}
