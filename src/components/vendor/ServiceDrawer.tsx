"use client";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { File as FileIcon } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import { createService, CreateServicePayload } from "@/app/services/service";
import Image from "next/image";

// 👉 helper to do unsigned, client‐side Cloudinary uploads
async function uploadToCloudinary(file: File): Promise<string> {
  const cloudName = "ddbs7m7nt"; // ← replace
  const uploadPreset = "presetOne"; // ← replace

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    {
      method: "POST",
      body: formData,
    }
  );
  if (!res.ok) throw new Error("Upload failed");
  const data = await res.json();
  return data.secure_url as string;
}

export function ServiceDrawer({
  open,
  onOpenChange,
  onServiceAdded,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onServiceAdded: () => void;
}) {
  const [form, setForm] = useState({
    title: "",
    price: "",
    duration: "",
    imageUrl: "",
  });
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  // new: handle file selection + upload
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

  const handleSubmit = async () => {
    setError("");
    setLoading(true);
    try {
      const businessId = localStorage.getItem("nex_businessId");
      if (!businessId) throw new Error("Missing business ID");
      const payload: CreateServicePayload = {
        businessId,
        title: form.title,
        price: Number(form.price),
        duration: Number(form.duration),
        imageUrl: form.imageUrl,
      };
      await createService(payload);
      onServiceAdded();
      setForm({ title: "", price: "", duration: "", imageUrl: "" });
    } catch (err: any) {
      setError(err.message || "Failed to create service");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full lg:max-w-[500px] p-0">
        <SheetTitle asChild>
          <span className="sr-only">Add New Service</span>
        </SheetTitle>
        <div className="flex flex-col h-full bg-white">
          <div className="px-6 py-4 border-b flex justify-between items-center">
            <h2 className="text-xl font-semibold text-[#6C35A7]">
              Add New Service
            </h2>
          </div>
          <div className="p-6 flex-1 overflow-y-auto space-y-4">
            {/* file picker */}
            <div className="border border-dashed border-[#6C35A7] rounded-xl p-6 text-center">
              <FileIcon size={32} className="mx-auto mb-2" />
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
              {form.imageUrl && (
                <Image
                  src={form.imageUrl}
                  width={343}
                  height={141}
                  alt="Preview"
                  className="mt-4 mx-auto h-24 object-contain"
                />
              )}
            </div>

            {/* title, price, duration */}
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
                  placeholder={field === "title" ? "Barbing" : "0"}
                  required
                  className="mt-2"
                />
              </div>
            ))}

            {error && <p className="text-red-500">{error}</p>}
          </div>

          <div className="px-6 py-4 border-t flex justify-end">
            <Button
              disabled={loading || uploading}
              onClick={handleSubmit}
              className="bg-[#6C35A7] text-white"
            >
              {loading ? "Saving…" : "Save Service"}
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
