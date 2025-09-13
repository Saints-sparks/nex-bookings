// app/vendor/home/page.tsx
"use client";

import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { File as FileIcon } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import { createService, CreateServicePayload } from "@/app/services/service";
import Image from "next/image";
import { Down } from "../Icons";
import { uploadToCloudinary } from "@/lib/cloudinary";

export function ServiceDrawer({
  open,
  onOpenChange,
  onServiceAdded,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onServiceAdded: () => void;
}) {
  const [form, setForm] = useState<{
    title: string;
    price: string;
    percentage: string;
    duration: string;
    durationType: "hours" | "days" | "weeks" | "months";
    isVirtual: "yes" | "no";
    description: string;
    imageUrl: string;
  }>({
    title: "",
    price: "",
    percentage: "0",
    duration: "",
    durationType: "hours",
    isVirtual: "no",
    description: "",
    imageUrl: "",
  });
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  // handle file selection + upload
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
        percentage: Number(form.percentage),
        duration: Number(form.duration),
        durationType: form.durationType,
        isVirtual: form.isVirtual === "yes",
        description: form.description,
        imageUrl: form.imageUrl,
      };
      console.log("Creating service with payload:", payload);
      await createService(payload);
      onServiceAdded();
      setForm({
        title: "",
        price: "",
        percentage: "0",
        duration: "",
        durationType: "hours",
        isVirtual: "no",
        description: "",
        imageUrl: "",
      });
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
          <div className="p-6 flex-1 overflow-y-auto space-y-6">
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

            {/* title, price, percentage, duration inputs */}
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

            <div className="flex gap-4">
              <div className="group flex-1">
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
                  className="p-6 w-full rounded-full border border-transparent focus-visible:border-[#6C35A7] focus-visible:ring-0 mt-2 shadow-none bg-[#F6F6F6]"
                />
              </div>

              <div className="group flex-1">
                <label
                  htmlFor="percentage"
                  className="text-[#807E7E] font-medium"
                >
                  Select Initial Payment (%)
                </label>
                <div className="cursor-pointer relative flex items-center justify-center rounded-full border border-transparent focus-visible:border-[#6C35A7] focus-visible:ring-0 mt-2 shadow-none bg-[#F6F6F6] p-4">
                  <select
                    id="percentage"
                    name="percentage"
                    value={form.percentage}
                    onChange={handleChange}
                    className="appearance-none w-full bg-transparent text-sm font-medium pr-5 cursor-pointer focus:outline-none"
                  >
                    <option value="0">0%</option>
                    <option value="20">20%</option>
                    <option value="50">50%</option>
                    <option value="75">75%</option>
                  </select>
                  <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2">
                    <Down />
                  </span>
                </div>
              </div>
            </div>

            <div className="flex gap-4">

              <div className="group flex-1">
                <label
                  htmlFor="isVirtual"
                  className="text-[#807E7E] font-medium"
                >
                  Virtual Service?
                </label>
                <div className="cursor-pointer relative flex items-center justify-center rounded-full border border-transparent focus-visible:border-[#6C35A7] focus-visible:ring-0 mt-2 shadow-none bg-[#F6F6F6] p-4">
                  <select
                    id="isVirtual"
                    name="isVirtual"
                    value={form.isVirtual}
                    onChange={handleChange}
                    className="appearance-none w-full bg-transparent text-sm font-medium pr-5 cursor-pointer focus:outline-none"
                  >
                    <option value="no">No</option>
                    <option value="yes">Yes</option>
                  </select>
                  <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2">
                    <Down />
                  </span>
                </div>
              </div>

              <div className="group flex-1">
                <label
                  htmlFor="duration"
                  className="text-[#807E7E] font-medium"
                >
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
            </div>

            <div className="group">
              <label
                htmlFor="description"
                className="text-[#807E7E] font-medium"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Give a detailed description of the service..."
                required
                className="w-full h-32 resize-none p-6 rounded-3xl border border-transparent focus-visible:border-[#6C35A7] focus-visible:ring-0 mt-2 shadow-none bg-[#F6F6F6]"
              />
            </div>
            
            {error && <p className="text-red-500">{error}</p>}
          </div>

          {/* actions */}
          <div className="px-6 py-4 border-t flex justify-between gap-2">
            <Button
              disabled={loading || uploading}
              onClick={handleSubmit}
              className="bg-[#6C35A7] text-white w-1/2 rounded-full py-6"
            >
              {loading ? "Saving…" : "Save Service"}
            </Button>
            <Button
              disabled={loading}
              onClick={() => onOpenChange(false)}
              className="text-red-500 bg-transparent w-1/2 rounded-full py-6 hover:bg-red-100 shadow-none"
            >
              Cancel
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}