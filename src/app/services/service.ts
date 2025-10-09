// Fetch a single service by ID
export async function getServiceById(id: string): Promise<Service> {
  const res = await api.get<Service>(`/services/${id}`);
  return res.data;
}
// services/service.ts
import api from "@/lib/api";

export interface Service {
  id: string;
  title: string;
  price: number;
  initialPayment: number;
  percentage?: number;
  isVirtual: boolean;
  description: string;
  duration: number;
  durationType: "hours" | "days" | "weeks" | "months";
  images: string[];
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
  initialPayment: number;
  duration: number;
  durationType: "hours" | "days" | "weeks" | "months";
  isVirtual: boolean;
  description: string;
  images: string[];
}

export async function getServicesByBusiness(
  businessId: string
): Promise<Service[]> {
  const res = await api.get<Service[]>(`/services/business/${businessId}`);
  return res.data ?? [];
}

export async function createService(
  data: CreateServicePayload
): Promise<Service> {
  const res = await api.post<Service>("/services", data);
  return res.data;
}

export async function updateService(
  id: string,
  data: Omit<CreateServicePayload, "businessId">
): Promise<Service> {
  const body = {
    title: data.title,
    price: data.price,
    duration: data.duration,
    durationType: data.durationType,
    isVirtual: data.isVirtual,
    description: data.description,
    images: data.images,
    initialPayment: data.initialPayment,
  };
  const res = await api.put<Service>(`/services/${id}`, body);
  return res.data;
}

export async function deleteService(id: string): Promise<void> {
  await api.delete(`/services/${id}`);
}
