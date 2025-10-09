import api from "@/lib/api";

export interface Payment {
  id: string;
  reference: string;
  amount: number;
  status: string;
  type: string;
  createdAt: string;
}

export interface PaymentsHistoryResponse {
  payments: Payment[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface PaymentSummary {
  serviceId: string;
  serviceTitle: string;
  servicePrice: number;
  initialPaymentPercent: number;
  downPayment: number;
  platformServiceCharge: number;
  totalAmount: number;
}

export interface Bank {
  id: number;
  name: string;
  slug: string;
  code: string;
  longcode: string;
  gateway: string;
  pay_with_bank: boolean;
  active: boolean;
  is_deleted: boolean;
  country: string;
  currency: string;
  type: string;
  createdAt: string;
  updatedAt: string;
}

export async function getPaymentsHistoryByBusiness(
  businessId: string,
  page = 1,
  limit = 10
): Promise<PaymentsHistoryResponse> {
  const res = await api.get<PaymentsHistoryResponse>(
    `/api/payments/business/${businessId}/history`,
    {
      params: { page, limit },
    }
  );
  return res.data;
}

export async function getPaymentSummary(
  serviceId: string
): Promise<PaymentSummary> {
  const res = await api.get<PaymentSummary>(
    `/api/payments/summary?serviceId=${serviceId}`
  );
  return res.data;
}

export const getBanks = async (): Promise<Bank[]> => {
  const response = await api.get("/api/payments/banks");
  return response.data;
};

export interface AccountVerificationRequest {
  account_number: string;
  bank_code: string;
}

export interface AccountVerificationResponse {
  account_number: string;
  account_name: string;
  bank_id: number;
}

export const verifyAccount = async (
  data: AccountVerificationRequest
): Promise<AccountVerificationResponse> => {
  const response = await api.post("/api/payments/verify-account", data);
  return response.data;
};

export interface PayoutRequest {
  amount: number;
  account_number: string;
  bank_code: string;
}

export interface PayoutResponse {
  status: boolean;
  message: string;
  transaction_id: string;
  amount: number;
  service_charge: number;
  net_amount: number;
  account_number: string;
  bank_name: string;
  account_name: string;
  paystack_reference: string;
  estimated_arrival: string;
}

export interface PayoutError {
  error: string;
  details: string;
}

export const requestPayout = async (
  data: PayoutRequest
): Promise<PayoutResponse> => {
  const response = await api.post("/api/payments/request-payout", data);
  return response.data;
};

export interface ServiceBookingPayment {
  serviceId: string;
  serviceTitle: string;
  servicePrice: number;
  initialPaymentPercent: number;
  downPayment: number;
  platformServiceCharge: number;
  totalAmount: number;
  customerEmail: string;
  customerName: string;
  customerPhoneNumber: string;
  appointmentDate: string;
  appointmentTime: string;
}

export interface PaymentInitializationResponse {
  status: boolean;
  message: string;
  payment_reference: string;
  authorization_url: string;
  access_code: string;
  amount: number;
}

export const initializeServiceBookingPayment = async (
  data: ServiceBookingPayment
): Promise<PaymentInitializationResponse> => {
  const response = await api.post(
    "/api/payments/initialize-service-booking",
    data
  );
  return response.data;
};

export interface PaymentVerificationRequest {
  reference: string;
}

export interface PaymentVerificationResponse {
  status: string;
  message: string;
  data?: any;
}

export const verifyServiceBookingPayment = async (
  data: PaymentVerificationRequest
): Promise<PaymentVerificationResponse> => {
  const response = await api.post("/api/payments/verify-service-booking", data);
  return response.data;
};
