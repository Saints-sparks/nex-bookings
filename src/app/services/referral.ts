import api from "@/lib/api";

/** Matches your Go DTO */
export interface ReferralWalletResponse {
  userId: string;
  name: string;
  balance: number; // plain number, eg 30000
}

/** GET /referrals/wallet — returns { userId, name, balance } */
export async function getReferralWallet(): Promise<ReferralWalletResponse> {
  const res = await api.get<ReferralWalletResponse>("/referrals/wallet");
  return res.data;
}
