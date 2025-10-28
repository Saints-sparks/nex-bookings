"use client";

import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState, useEffect } from "react";
import { deleteService, Service, updateService } from "@/app/services/service";
import Image from "next/image";
import { Down } from "../Icons";
import { uploadToCloudinary } from "@/lib/cloudinary";

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
    durationType: "hours" as "hours" | "days" | "weeks" | "months",
    images: [] as string[],
  });
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  // Prefill form when service changes
  useEffect(() => {
    if (service) {
      setForm({
        title: service.title,
        price: String(service.price),
        duration: String(service.duration),
        durationType: service.durationType,
        images: service.images || [],
      });
    }
  }, [service]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  // handle multiple file selection + upload
  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setUploading(true);
    setError("");
    try {
      const urls: string[] = [];
      for (const file of Array.from(files)) {
        const url = await uploadToCloudinary(file);
        urls.push(url);
      }
      setForm((p) => ({ ...p, images: [...p.images, ...urls] }));
    } catch (err: any) {
      setError("Image upload failed");
    } finally {
      setUploading(false);
    }
  };

  // Remove image
  const removeImage = (url: string) => {
    setForm((p) => ({ ...p, images: p.images.filter((img) => img !== url) }));
  };

  // Save updates
  const handleSave = async () => {
    if (!service) return;
    setError("");
    setLoading(true);
    try {
      await updateService(service.id, {
        title: form.title,
        price: parseFloat(form.price),
        duration: parseInt(form.duration),
        durationType: form.durationType,
        isVirtual: service.isVirtual,
        description: service.description,
        images: form.images,
        initialPayment: service.initialPayment,
      });
      onServiceUpdated();
      onOpenChange(false);
    } catch (err: any) {
      setError(err.message || "Failed to update service");
    } finally {
      setLoading(false);
    }
  };

  // Delete service
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
            {/* Image Upload / Preview */}
            <div className="border border-dashed border-[#6C35A7] rounded-xl p-6 text-center">
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
                Supported format: JPG, PNG. You can upload multiple images. Make
                sure the files are not too large.
              </p>
              <input
                id="file-upload"
                type="file"
                accept="image/*"
                multiple
                onChange={handleFile}
                className="hidden"
              />
              {uploading && <p className="text-sm mt-2">Uploading…</p>}
              {form.images.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4 justify-center">
                  {form.images.map((img) => (
                    <div key={img} className="relative inline-block">
                      <Image
                        src={img}
                        width={100}
                        height={80}
                        alt="Preview"
                        className="object-contain rounded-md border"
                      />
                      <button
                        type="button"
                        className="absolute -top-2 -right-2 bg-white rounded-full p-1 border shadow"
                        onClick={() => removeImage(img)}
                        aria-label="Remove image"
                      >
                        <span className="text-xs">✕</span>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Title, Price, Duration */}
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
                type="number"
                min="0"
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
                <div className="cursor-pointer relative flex px-3 items-center justify-center rounded-full border border-transparent focus-visible:border-[#6C35A7] focus-visible:ring-0 mt-2 shadow-none bg-[#F6F6F6]">
                  <select
                    id="durationType"
                    name="durationType"
                    value={form.durationType}
                    onChange={handleChange}
                    className="appearance-none text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium pr-5 cursor-pointer"
                  >
                    <option value="hours">Hours</option>
                    <option value="days">Days</option>
                    <option value="weeks">Weeks</option>
                    <option value="months">Months</option>
                  </select>
                  <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2">
                    <Down />
                  </span>
                </div>
              </div>
            </div>

            {error && <p className="text-red-500">{error}</p>}
          </div>

          {/* Actions */}
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
