// services/auth.ts
import api from "@/lib/api";

export interface SignupPayload {
  businessName: string;
  email: string;
  fullName: string;
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

export async function signup(data: SignupPayload) {
  const res = await api.post("/auth/signup", data);
  return res.data;
}

export async function completeSignup(data: CompleteSignupPayload): Promise<CompleteSignupResponse> {
  const res = await api.post("/auth/complete-signup", data);
  return res.data;
}

export async function signin(data: SigninPayload): Promise<SigninResponse> {
  const res = await api.post<SigninResponse>("/auth/signin", data);
  return res.data;
}
