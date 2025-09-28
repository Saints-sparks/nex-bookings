import api from "@/lib/api";

export interface Payout {
  id: string;
  amount: number;
  status: string;
  createdAt: string;
}

export interface PayoutsHistoryResponse {
  payouts: Payout[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export async function getPayoutsHistoryByBusiness(
  businessId: string,
  page = 1,
  limit = 10
): Promise<PayoutsHistoryResponse> {
  const res = await api.get<PayoutsHistoryResponse>(
    `/api/payouts/business/${businessId}/history`,
    {
      params: { page, limit },
    }
  );
  return res.data;
}
