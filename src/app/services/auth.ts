// services/auth.ts
import api from "@/lib/api";

export interface SignupPayload {
  businessName: string;
  email: string;
  fullName: string;
  referralCode?: string; // Optional, for referral programs
}

export interface CompleteSignupPayload {
  userId: string;
  password: string;
  phoneNumber: string;
  industry: string;
}

export interface CompleteSignupResponse {
  user: {
    id: string;
    email: string;
    fullName: string;
    subscription?: string;
  };
  business: {
    id: string;
    userId: string;
    businessName: string;
    logo?: string;
  };
}

export interface SigninPayload {
  email: string;
  password: string;
}

export interface SigninResponse {
  accessToken: string;
  user: {
    email: string;
    fullName: string;
    id: string;
    subscription: string;
  };
}

export interface IntrospectResponse {
  user: {
    id: string;
    email: string;
    fullName: string;
    phoneNumber: string;
  };
  business: {
    id: string;
    userId: string;
    businessName: string;
    industry: string;
  };
  referralCode: string;
}

export interface RequestOtpPayload {
  email: string;
}
export interface OtpResponse {
  message: string;
  email: string;
}

export interface ConfirmOtpPayload {
  email: string;
  otp: string;
}
export interface ConfirmOtpResponse {
  message: string;
}

export interface ResetPasswordWithOtpPayload {
  email: string;
  otp: string;
  newPassword: string;
}
export interface ResetPasswordWithOtpResponse {
  message: string;
}

export async function signup(data: SignupPayload) {
  const res = await api.post("/auth/signup", data);
  return res.data;
}

export async function completeSignup(
  data: CompleteSignupPayload
): Promise<CompleteSignupResponse> {
  const res = await api.post("/auth/complete-signup", data);
  return res.data;
}

export async function signin(data: SigninPayload): Promise<SigninResponse> {
  const res = await api.post<SigninResponse>("/auth/signin", data);
  return res.data;
}

export async function introspect(): Promise<IntrospectResponse> {
  const res = await api.get<IntrospectResponse>("/auth/introspect");
  return res.data;
}

// 4️⃣ Request a “verify email” OTP
export async function requestEmailVerificationOtp(
  data: RequestOtpPayload
): Promise<OtpResponse> {
  const res = await api.post<OtpResponse>(
    "/auth/verify-email/request-otp",
    data
  );
  return res.data;
}

// 5️⃣ Confirm the “verify email” OTP
export async function confirmEmailVerificationOtp(
  data: ConfirmOtpPayload
): Promise<ConfirmOtpResponse> {
  const res = await api.post<ConfirmOtpResponse>(
    "/auth/verify-email/confirm-otp",
    data
  );
  return res.data;
}

// 6️⃣ Request a “reset password” OTP
export async function requestPasswordResetOtp(
  data: RequestOtpPayload
): Promise<OtpResponse> {
  const res = await api.post<OtpResponse>(
    "/auth/reset-password/request-otp",
    data
  );
  return res.data;
}

// 7️⃣ Confirm the “reset password” OTP and set new password
export async function confirmPasswordResetWithOtp(
  data: ResetPasswordWithOtpPayload
): Promise<ResetPasswordWithOtpResponse> {
  const res = await api.post<ResetPasswordWithOtpResponse>(
    "/auth/reset-password/confirm-otp",
    data
  );
  return res.data;
}
