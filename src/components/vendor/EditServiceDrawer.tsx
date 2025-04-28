"use client";

import { Sheet, SheetContent } from "@/components/ui/sheet";
import { File as FileIcon } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState, useEffect } from "react";
import { deleteService, Service, updateService } from "@/app/services/service";
import Image from "next/image";

// -------- Cloudinary upload helper (unsigned) --------
async function uploadToCloudinary(file: File): Promise<string> {
  const cloudName = "YOUR_CLOUD_NAME"; // ← replace
  const uploadPreset = "YOUR_UPLOAD_PRESET"; // ← replace

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    { method: "POST", body: formData }
  );
  if (!res.ok) throw new Error("Upload failed");
  const data = await res.json();
  return data.secure_url as string;
}

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  service: Service | null;
  onServiceUpdated: () => void;
}

export function EditServiceDrawer({
  open,
  onOpenChange,
  service,
  onServiceUpdated,
}: Props) {
  const [form, setForm] = useState({
    title: "",
    price: "",
    duration: "",
    imageUrl: "",
  });
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  // 1) Prefill form when `service` prop changes
  useEffect(() => {
    if (service) {
      setForm({
        title: service.title,
        price: String(service.price),
        duration: String(service.duration),
        imageUrl: service.imageUrl,
      });
    }
  }, [service]);

  // 2) Handle text inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  // 3) Handle file selection & Cloudinary upload
  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError("");
    try {
      const url = await uploadToCloudinary(file);
      setForm((p) => ({ ...p, imageUrl: url }));
    } catch (err: any) {
      console.error(err);
      setError("Image upload failed");
    } finally {
      setUploading(false);
    }
  };

  // 4) Save updates
  const handleSave = async () => {
    if (!service) return;
    setError("");
    setLoading(true);
    try {
      await updateService(service.id, {
        title: form.title,
        price: Number(form.price),
        duration: Number(form.duration),
        imageUrl: form.imageUrl,
      });
      onServiceUpdated();
      onOpenChange(false);
    } catch (err: any) {
      setError(err.message || "Failed to update service");
    } finally {
      setLoading(false);
    }
  };

  // 5) Delete service
  const handleDelete = async () => {
    if (!service) return;
    setError("");
    setLoading(true);
    try {
      await deleteService(service.id);
      onServiceUpdated();
      onOpenChange(false);
    } catch (err: any) {
      setError(err.message || "Failed to delete service");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full lg:max-w-[500px] p-0">
        <div className="flex flex-col h-full bg-white">
          <div className="px-6 py-4 border-b flex justify-between items-center">
            <h2 className="text-xl font-semibold text-[#6C35A7]">
              Edit Service
            </h2>
          </div>

          <div className="p-6 flex-1 overflow-y-auto space-y-4">
            {/* --- Image Upload / Preview --- */}
            <div className="border border-dashed border-[#6C35A7] rounded-xl p-6 text-center flex flex-col items-center">
              <div className="flex mb-2 items-center justify-start mx-auto">
                <div className="">
                  <FileIcon size={32} className="mx-auto mb-2" />
                  <p>Current Image:</p>
                </div>
                {form.imageUrl && (
                  <Image
                    src={form.imageUrl}
                    width={100}
                    height={100}
                    alt="Service"
                    className="h-24 object-contain"
                  />
                )}
              </div>

              <p className="font-bold text-black">
                Drag & drop files or{" "}
                <label
                  htmlFor="file-upload"
                  className="text-[#6C35A7] cursor-pointer"
                >
                  Browse
                </label>
              </p>
              <p className="text-sm text-[#807E7E]">
                Supported format: JPG, PNG. Make sure the files are not too
                large.
              </p>
              <input
                id="file-upload"
                type="file"
                accept="image/*"
                onChange={handleFile}
                className="hidden"
              />
              {uploading && <p className="text-sm mt-2">Uploading…</p>}
            </div>

            {/* --- Title, Price, Duration --- */}
            {["title", "price", "duration"].map((field) => (
              <div key={field} className="group">
                <label htmlFor={field} className="text-[#807E7E] font-medium">
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
                <Input
                  id={field}
                  name={field}
                  value={(form as any)[field]}
                  onChange={handleChange}
                  placeholder={field === "title" ? "Service Title" : "0"}
                  required
                  className="mt-2"
                />
              </div>
            ))}

            {error && <p className="text-red-500">{error}</p>}
          </div>

          {/* --- Actions --- */}
          <div className="px-6 py-4 border-t flex justify-between">
            <Button
              disabled={loading}
              onClick={handleDelete}
              className="text-red-500 bg-transparent"
            >
              {loading ? "Deleting…" : "Delete Service"}
            </Button>
            <Button
              disabled={loading || uploading}
              onClick={handleSave}
              className="bg-[#6C35A7] text-white"
            >
              {loading ? "Saving…" : "Save Changes"}
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
