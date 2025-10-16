import api from "@/lib/api";

export interface BusinessKpis {
  bookingsThisMonth: number;
  incomeThisMonth: number;
  bookingsAllTime: number;
  incomeAllTime: number;
}

export async function getBusinessKpis(
  businessId: string
): Promise<BusinessKpis> {
  const res = await api.get<BusinessKpis>(
    `/bookings/business/${businessId}/kpis`
  );
  return res.data;
}

export interface Booking {
  id: string;
  appointmentDate: string;
  bookedServiceId: string;
  customerName: string;
  customerPhoneNumber: string;
  time: string;
  service: {
    id: string;
    title: string;
    images: string[];
    price: number;
    duration: number;
    businessId: string;
    business: {
      id: string;
      businessName: string;
      logo: string;
      userId: string;
    };
  };
}

export interface CreateBookingPayload {
  appointmentDate: string; // e.g. "2025-04-27"
  bookedServiceId: string; // the service ID you pass in
  customerName: string; // can be empty string if optional
  customerPhoneNumber: string; // e.g. "2346678895667"
  time: string; // e.g. "10:00"
}

export async function createBooking(
  data: CreateBookingPayload
): Promise<Booking> {
  const res = await api.post<Booking>("/bookings", data);
  return res.data;
}

export async function getBookingsByBusiness(
  businessId: string
): Promise<Booking[]> {
  const res = await api.get<Booking[]>(`/bookings/business/${businessId}`);
  return res.data;
}
