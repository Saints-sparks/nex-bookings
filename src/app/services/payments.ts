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
