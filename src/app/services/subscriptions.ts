// services/subscriptions.ts
import api from "@/lib/api";

// Payment interfaces
export interface PaymentInitializeRequest {
  plan_id: string;
  email: string;
}

export interface PaymentInitializeResponse {
  status: string;
  message: string;
  data: {
    authorization_url: string;
    access_code: string;
    reference: string;
    plan_name: string;
    amount: number;
  };
}

export interface PaymentVerifyRequest {
  reference: string;
}

export interface PaymentVerifyResponse {
  status: string;
  message: string;
  data: {
    reference: string;
    amount: number;
    status: string;
    paid_at: string;
    currency: string;
    gateway_response: string;
    customer: {
      email: string;
      name: string;
    };
  };
}

// DTOs
export interface FeatureDTO {
  id: string;
  feature: {
    id: string;
    name: string;
    description: string;
    monthlyLimit: number;
  };
  subscriptionPlan: {
    id: string;
    name: string;
    price: number;
    currency: string;
    billingCycle: string;
    description: string;
  };
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  currency: string;
  billingCycle: string;
  description: string;
  features: Array<{
    id: string;
    name: string;
    description: string;
    monthlyLimit: number;
  }>;
}

export interface CreateUserSubscriptionPayload {
  email: string;
  userId: string;
  username: string;
  paymentId: string;
  subscriptionPlanId: string;
  startDate?: string;
}

export interface UserSubscriptionResponse {
  id: string;
  userId: string;
  username: string;
  email: string;
  subscriptionPlanId: string;
  paymentId: string;
  startDate: string;
  endDate: string;
  nextBillingDate: string;
  status: "ACTIVE" | "INACTIVE" | "CANCELLED"; // Adjust if there are other possible values
  createdAt: string;
  updatedAt: string;
  subscriptionPlan: {
    id: string;
    name: string;
    price: number;
    currency: string;
    billingCycle: string;
    description: string;
    createdAt: string;
    updatedAt: string;
  };
}

export interface PaginatedSubscriptions {
  data: UserSubscriptionResponse[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

/**
 * Fetch features grouped by subscription plan
 */
export async function getSubscriptionPlans(): Promise<SubscriptionPlan[]> {
  const res = await api.get<FeatureDTO[]>("/subscription-plans/features");
  const data = res.data;
  // Group features by plan
  const map = new Map<string, SubscriptionPlan>();
  data.forEach((item) => {
    const planId = item.subscriptionPlan.id;
    if (!map.has(planId)) {
      map.set(planId, {
        id: planId,
        name: item.subscriptionPlan.name,
        price: item.subscriptionPlan.price,
        currency: item.subscriptionPlan.currency,
        billingCycle: item.subscriptionPlan.billingCycle,
        description: item.subscriptionPlan.description,
        features: [],
      });
    }
    const plan = map.get(planId)!;
    plan.features.push({
      id: item.feature.id,
      name: item.feature.name,
      description: item.feature.description,
      monthlyLimit: item.feature.monthlyLimit,
    });
  });
  return Array.from(map.values());
}

/**
 * Subscribe the authenticated user to a plan
 */
export async function subscribeToPlan(
  data: CreateUserSubscriptionPayload
): Promise<UserSubscriptionResponse> {
  const payload = {
    email: data.email,
    userId: data.userId,
    username: data.username,
    paymentId: data.paymentId,
    subscriptionPlanId: data.subscriptionPlanId,
    startDate: data.startDate || new Date().toISOString(),
  };

  const res = await api.post<UserSubscriptionResponse>(
    "/subscription-plans/subscriptions",
    payload
  );
  return res.data;
}

/**
 * Get all subscriptions for a given user
 */

export async function getUserSubscriptions(
  userId: string
): Promise<UserSubscriptionResponse[]> {
  const res = await api.get<PaginatedSubscriptions>(
    `/subscription-plans/subscriptions/user/${userId}`
  );
  // **unwrap** the `data` array:
  return res.data.data;
}

export async function initializePayment(data: PaymentInitializeRequest): Promise<PaymentInitializeResponse> {
  const token = localStorage.getItem("nex_token");
  const response = await api.post<PaymentInitializeResponse>("/api/payments/initialize", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export async function verifyPayment(data: PaymentVerifyRequest): Promise<PaymentVerifyResponse> {
  const token = localStorage.getItem("nex_token");
  const response = await api.post<PaymentVerifyResponse>("/api/payments/verify", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}
