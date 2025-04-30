import api from "@/lib/api";

export interface WebsiteSettings {
  businessId: string;
  id: string;
  header: string;
  tagline: string;
  instagramLink: string;
  facebookLink: string;
}

export interface CreateWebsiteSettingsPayload {
  businessId: string;
  header: string;
  tagline: string;
  instagramLink: string;
  facebookLink: string;
}

// 1️⃣ Fetch existing settings
export async function getWebsiteSettingsByBusiness(
  businessId: string
): Promise<WebsiteSettings> {
  const res = await api.get<WebsiteSettings>(
    `/website-settings/business/${businessId}`
  );
  return res.data;
}

// 2️⃣ Create new
export async function createWebsiteSettings(
  data: CreateWebsiteSettingsPayload
): Promise<WebsiteSettings> {
  const res = await api.post<WebsiteSettings>("/website-settings", data);
  return res.data;
}

// 3️⃣ Update existing
export async function updateWebsiteSettings(
  id: string,
  data: Omit<CreateWebsiteSettingsPayload, "id">
): Promise<WebsiteSettings> {
  const res = await api.put<WebsiteSettings>(`/website-settings/${id}`, data);
  return res.data;
}
