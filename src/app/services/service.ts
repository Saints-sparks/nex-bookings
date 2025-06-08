// services/service.ts
import api from "@/lib/api";

export interface Service {
  id: string;
  title: string;
  price: number;
  duration: number;
  durationType: "hours" | "days" | "weeks" | "months";
  imageUrl: string;
  businessId: string;
  business: {
    businessName: string;
    id: string;
    logo: string;
    userId: string;
  };
}

export interface CreateServicePayload {
  businessId: string;
  title: string;
  price: number;
  duration: number;
  durationType: "hours" | "days" | "weeks" | "months";
  imageUrl: string;
}

export async function getServicesByBusiness(
  businessId: string
): Promise<Service[]> {
  // ① fetch EVERY service
  console.log(businessId);
  
  const res = await api.get<Service[]>(`/services`);
  console.log(res.data);
  
  // ② keep only those that match your business
  console.log(res.data.filter((s) => s.businessId === businessId));
  return res.data.filter((s) => s.businessId === businessId);
  
}

export async function createService(
  data: CreateServicePayload
): Promise<Service> {
  // ⚠️ map to uppercase keys
  const body = {
    BusinessId: data.businessId,
    Title: data.title,
    Price: data.price,
    Duration: data.duration,
    DurationType: data.durationType,
    ImageUrl: data.imageUrl,
  };

  const res = await api.post<Service>("/services", body);
  return res.data;
}

export async function updateService(
  id: string,
  data: Omit<CreateServicePayload, "businessId">
): Promise<Service> {
  const body = {
    Title: data.title,
    Price: data.price,
    Duration: data.duration,
    ImageUrl: data.imageUrl,
  };
  const res = await api.put<Service>(`/services/${id}`, body);
  return res.data;
}

export async function deleteService(id: string): Promise<void> {
  await api.delete(`/services/${id}`);
}
