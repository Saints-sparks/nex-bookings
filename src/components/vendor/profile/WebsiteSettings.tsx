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
  tagline: "e.g. +234 801 234 5678",
  instagramLink: "e.g. instagram.com/yourhandle",
  facebookLink: "e.g. facebook.com/yourpage",
};

export default function WebsiteSettings() {
  const currentUser = {
    header: "Shola Enterprises",
    tagline: "+234 801 234 5678",
    instagram: "instagram.com",
    facebook: "facebook.com",
  };

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
      .catch((err) => {
        if (err.response?.status === 404) {
          // No settings yet — start with a blank form
          setFormData((f) => ({ ...f, businessId }));
        } else {
          setError(err.message || "Failed to load settings.");
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setSaving(true);
    setError("");
    try {
      if (settingsId) {
        // update
        await updateWebsiteSettings(settingsId, {
          businessId: formData.businessId,
          header: formData.header,
          tagline: formData.tagline,
          instagramLink: formData.instagramLink,
          facebookLink: formData.facebookLink,
        });
        toast.success("Settings Updates Successfully!");
      } else {
        // create
        const created = await createWebsiteSettings(formData);
        setSettingsId(created.id);
        toast.success("Settings Created Successfully!");
      }
      // optional: show a toast here
    } catch (err: any) {
      setError(err.message || "Failed to save settings.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="w-full">
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
              value={formData[field.name as keyof typeof formData]}
              onChange={handleChange}
              placeholder={PLACEHOLDERS[field.name]}
              className="p-6 rounded-full border border-transparent focus-visible:border-[#6C35A7] focus-visible:ring-0 mt-2 shadow-none bg-[#F6F6F6]"
            />
          </div>
        ))}
      </div>
      <Button
        type="submit"
        onClick={handleSave}
        className="w-full sm:w-auto bg-[#6C35A7] rounded-full py-7 px-14 font-medium text-[16px] mt-4 hover:bg-purple-700 mt-10"
      >
        {saving ? "Saving…" : "Save Changes"}
      </Button>
    </div>
  );
}
