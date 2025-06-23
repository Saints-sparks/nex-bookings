"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import {
  getWebsiteSettingsByBusiness,
  createWebsiteSettings,
  updateWebsiteSettings,
  WebsiteSettings as WS,
  CreateWebsiteSettingsPayload,
} from "@/app/services/website";
import { toast } from "sonner";

const PLACEHOLDERS: Record<
  keyof Omit<CreateWebsiteSettingsPayload, "businessId">,
  string
> = {
  header: "e.g. Shola Enterprises",
  tagline: "e.g. Your business tagline",
  instagramLink: "e.g. instagram.com/yourhandle",
  facebookLink: "e.g. facebook.com/yourpage",
};

// Utility to ensure URLs include protocol
function normalizeUrl(url: string) {
  if (!url) return url;
  return url.match(/^https?:\/\//i) ? url : `https://${url}`;
}

export default function WebsiteSettings() {
  const [formData, setFormData] = useState<CreateWebsiteSettingsPayload>({
    businessId: "",
    header: "",
    tagline: "",
    instagramLink: "",
    facebookLink: "",
  });
  const [settingsId, setSettingsId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const fields: {
    label: string;
    name: keyof Omit<CreateWebsiteSettingsPayload, "businessId">;
  }[] = [
    { label: "Header", name: "header" },
    { label: "Tagline", name: "tagline" },
    { label: "Instagram Link", name: "instagramLink" },
    { label: "Facebook Link", name: "facebookLink" },
  ];

  useEffect(() => {
    const businessId = localStorage.getItem("nex_businessId");
    if (!businessId) {
      setError("No business selected.");
      setLoading(false);
      return;
    }

    getWebsiteSettingsByBusiness(businessId)
      .then((data: WS) => {
        setFormData({
          businessId: data.businessId,
          header: data.header,
          tagline: data.tagline,
          instagramLink: data.instagramLink,
          facebookLink: data.facebookLink,
        });
        setSettingsId(data.id);
      })
      .catch((err: any) => {
        if (err.response?.status === 404) {
          setFormData((f) => ({ ...f, businessId }));
        } else {
          setError(err.message || "Failed to load settings.");
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSave = async () => {
    setSaving(true);
    setError("");
    try {
      // Normalize links before sending
      const payload: CreateWebsiteSettingsPayload = {
        ...formData,
        instagramLink: normalizeUrl(formData.instagramLink),
        facebookLink: normalizeUrl(formData.facebookLink),
      };

      if (settingsId) {
        await updateWebsiteSettings(settingsId, payload);
        toast.success("Settings updated successfully!");
      } else {
        const created = await createWebsiteSettings(payload);
        setSettingsId(created.id);
        toast.success("Settings created successfully!");
      }
    } catch (err: any) {
      setError(err.message || "Failed to save settings.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="w-full flex justify-center py-10">
        <p className="text-gray-500">Loading settings…</p>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6">
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        {fields.map((field) => (
          <div key={field.name} className="flex flex-col gap-2 group">
            <Label
              htmlFor={field.name}
              className="text-[#807E7E] font-medium group-focus-within:text-[#6C35A7]"
            >
              {field.label}
            </Label>
            <Input
              id={field.name}
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              placeholder={PLACEHOLDERS[field.name]}
              disabled={saving}
              className="p-6 rounded-full border border-transparent focus-visible:border-[#6C35A7] focus-visible:ring-0 mt-2 shadow-none bg-[#F6F6F6]"
            />
          </div>
        ))}
      </div>

      <Button
        onClick={handleSave}
        disabled={saving}
        className="w-full sm:w-auto bg-[#6C35A7] rounded-full py-7 px-14 font-medium text-[16px] hover:bg-purple-700"
      >
        {saving ? "Saving…" : "Save Changes"}
      </Button>
    </div>
  );
}
