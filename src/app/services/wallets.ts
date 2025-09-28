import api from "@/lib/api";

export interface WalletTransaction {
  id: string;
  paymentRef: string;
  bookingId: string;
  businessId: string;
  vendorId: string;
  amount: number;
  serviceCharge: number;
  vendorShare: number;
  type: string;
  status: string;
  createdAt: string;
}

export interface WalletSummary {
  balance: number;
  transactions: WalletTransaction[];
}

export async function getWalletSummary(): Promise<WalletSummary> {
  const res = await api.get<WalletSummary>("/api/wallet/summary");
  return res.data;
}
