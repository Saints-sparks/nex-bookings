import api from "@/lib/api";

/** Matches your Go DTO */
export interface ReferralWalletResponse {
  userId: string;
  name: string;
  balance: number; // plain number, eg 30000
}

// New interfaces for payout flow
export interface Bank {
  id: string;
  name: string;
  code: string;
}

export interface VerifyBankAccountRequest {
  accountNumber: string;
  bankCode: string;
}

export interface VerifyBankAccountResponse {
  accountName: string;
  accountNumber: string;
  bankCode: string;
  bankName: string;
  isValid: boolean;
  message: string;
}

export interface NameMatchCheckRequest {
  userName: string;
  accountName: string;
}

export interface NameMatchCheckResponse {
  matchCount: number;
  isValid: boolean;
}

export interface ReferralPayoutRequest {
  withdrawAmount: number;
  bankCode: string;
  accountNumber: string;
  accountName: string;
}

export interface ReferralPayoutResponse {
  id: string;
  withdrawAmount: number;
  status: string;
  walletBalance: number;
}

/** GET /referrals/wallet — returns { userId, name, balance } */
export async function getReferralWallet(): Promise<ReferralWalletResponse> {
  const res = await api.get<ReferralWalletResponse>("/referrals/wallet");
  return res.data;
}

/** GET /referrals/banks — returns list of banks */
export async function getBanks(): Promise<Bank[]> {
  const res = await api.get<Bank[]>("/referrals/banks");
  return res.data;
}

/** POST /referrals/verify-bank — verify bank account */
export async function verifyBankAccount(
  request: VerifyBankAccountRequest
): Promise<VerifyBankAccountResponse> {
  const res = await api.post<VerifyBankAccountResponse>(
    "/referrals/verify-bank",
    request
  );
  return res.data;
}

/** POST /referrals/check-name-match — check if bank name matches user name */
export async function checkNameMatch(
  request: NameMatchCheckRequest
): Promise<NameMatchCheckResponse> {
  const res = await api.post<NameMatchCheckResponse>(
    "/referrals/check-name-match",
    request
  );
  return res.data;
}

/** POST /referrals/request-payout — request payout */
export async function requestPayout(
  request: ReferralPayoutRequest
): Promise<ReferralPayoutResponse> {
  const res = await api.post<ReferralPayoutResponse>(
    "/referrals/request-payout",
    request
  );
  return res.data;
}
