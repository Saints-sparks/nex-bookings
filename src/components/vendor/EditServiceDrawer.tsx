// components/vendor/EditServiceDrawer.tsx
"use client";

import { Sheet, SheetContent } from "@/components/ui/sheet";
import { File } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState, useEffect } from "react";
import { deleteService, Service, updateService } from "@/app/services/service";
// import { updateService, Service } from "@/services/service";

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
  const [error, setError] = useState("");

  // Prefill when `service` changes
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

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
            {/* Image URL */}
            <div className="border border-dashed border-[#6C35A7] rounded-xl p-6 text-center">
              <File size={32} className="mx-auto mb-2" />
              <p>Current Image:</p>
              <img
                src={form.imageUrl}
                alt="Service"
                className="mx-auto h-24 object-contain"
              />
              <Input
                name="imageUrl"
                placeholder="Image URL"
                value={form.imageUrl}
                onChange={handleChange}
                className="mt-2"
              />
            </div>

            {/* Title, Price, Duration */}
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

          <div className="px-6 py-4 border-t flex justify-between">
            <Button
              disabled={loading}
              onClick={handleDelete}
              className="text-red-500 bg-transparent"
            >
              {loading ? "Deleting…" : "Delete Service"}
            </Button>
            <Button
              disabled={loading}
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
