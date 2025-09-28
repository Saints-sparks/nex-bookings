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
