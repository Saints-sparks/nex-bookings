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
