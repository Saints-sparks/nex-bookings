"use client";

import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState, useEffect } from "react";
import { deleteService, Service, updateService } from "@/app/services/service";
import Image from "next/image";
import { Down } from "../Icons";

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
      <SheetTitle asChild>
          <span className="sr-only">Edit Service</span>
        </SheetTitle>
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
            <div className="group">
              <label htmlFor="title" className="text-[#807E7E] font-medium">
                Service Title
              </label>
              <Input
                id="title"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Barbing"
                required
                className="p-6 rounded-full border border-transparent focus-visible:border-[#6C35A7] focus-visible:ring-0 mt-2 shadow-none bg-[#F6F6F6]"
              />
            </div>
            <div className="group">
              <label htmlFor="price" className="text-[#807E7E] font-medium">
                Price
              </label>
              <Input
                id="price"
                name="price"
                value={form.price}
                onChange={handleChange}
                placeholder="0"
                required
                className="p-6 rounded-full border border-transparent focus-visible:border-[#6C35A7] focus-visible:ring-0 mt-2 shadow-none bg-[#F6F6F6]"
              />
            </div>
            <div className="group">
              <label htmlFor="duration" className="text-[#807E7E] font-medium">
                Duration
              </label>
              <div className="mt-2 flex gap-2">
                <Input
                  id="duration"
                  name="duration"
                  type="number"
                  value={form.duration}
                  onChange={handleChange}
                  placeholder="0"
                  required
                  className="flex-1 p-6 rounded-full border border-transparent focus-visible:border-[#6C35A7] focus-visible:ring-0 mt-2 shadow-none bg-[#F6F6F6]"
                />
                <div className="flex px-3 items-center justify-center rounded-full border border-transparent focus-visible:border-[#6C35A7] focus-visible:ring-0 mt-2 shadow-none bg-[#F6F6F6]">
                  <select
                    id="durationType"
                    name="durationType"
                    // value={form.durationType}
                    // onChange={handleChange}
                    className="appearance-none  text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                  >
                    <option value="hours">Hours</option>
                    <option value="days">Days</option>
                    <option value="weeks">Weeks</option>
                    <option value="months">Months</option>
                  </select>
                  <Down />
                  <div className=""></div>
                </div>
              </div>
            </div>

            {error && <p className="text-red-500">{error}</p>}
          </div>

          {/* --- Actions --- */}
          <div className="px-6 py-4 border-t flex justify-between gap-2">
            
            <Button
              disabled={loading || uploading}
              onClick={handleSave}
              className="bg-[#6C35A7] text-white w-1/2 rounded-full py-6"
            >
              {loading ? "Saving…" : "Save Changes"}
            </Button>
            <Button
              disabled={loading}
              onClick={handleDelete}
              className="text-red-500 bg-transparent w-1/2 rounded-full py-6 hover:bg-red-100"
            >
              {loading ? "Deleting…" : "Delete Service"}
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
