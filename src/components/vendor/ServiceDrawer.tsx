// components/vendor/ServiceDrawer.tsx
"use client";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { File } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import { createService, CreateServicePayload } from "@/app/services/service";
// import { createService, CreateServicePayload } from "@/services/service";

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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

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
        imageUrl: form.imageUrl || "", // or upload URL
      };
      console.log("Payload:", payload);

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
            <div className="border border-dashed border-[#6C35A7] rounded-xl p-6 text-center">
              <File size={32} className="mx-auto mb-2" />
              <p>Drag & drop or select image</p>
              <Input
                name="imageUrl"
                placeholder="Image URL"
                value={form.imageUrl}
                onChange={handleChange}
                className="mt-2"
              />
            </div>

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
              disabled={loading}
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
