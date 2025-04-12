"use client";

import { Sheet, SheetContent } from "@/components/ui/sheet";
import { File } from "lucide-react";
import { Input } from "../ui/input";

export function ServiceDrawer({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="p-0 w-full lg:max-w-[500px] xl:max-w-[630px] xl:w-[630px]"
      >
        <div className="flex flex-col w-full h-full bg-white shadow-lg">
          <div className="flex justify-between items-center px-6 py-4 border-b">
            <h2 className="text-xl font-semibold text-[#6C35A7]">
              Add New Service
            </h2>
            <button onClick={() => onOpenChange(false)}></button>
          </div>

          {/* Content */}
          <div className="p-6 flex-1 overflow-y-auto">
            {/* Upload area */}
            <div className="flex flex-col justify-center items-center border border-dashed border-[#6C35A7] rounded-xl px-6 py-10 text-center ">
              <File className="mb-3" />
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
                accept=".jpg,.jpeg,.png"
                className="hidden"
                onChange={(e) => console.log(e.target.files)}
              />
            </div>

            {/* Form Fields */}
            <div className="space-y-4 mt-6">
              <div className="group">
                <label
                  htmlFor="title"
                  className="text-[#807E7E] font-medium group-focus-within:text-[#6C35A7]"
                >
                  Service Title
                </label>
                <Input
                  id="title"
                  name="title"
                  placeholder="Barbing"
                  required
                  className="p-6 rounded-full border border-transparent focus-visible:border-[#6C35A7] focus-visible:ring-0 mt-2 shadow-none bg-[#F6F6F6]"
                />
              </div>
              <div className="group">
                <label
                  htmlFor="price"
                  className="text-[#807E7E] font-medium group-focus-within:text-[#6C35A7]"
                >
                  Price
                </label>
                <Input
                  id="price"
                  name="price"
                  placeholder="8,000"
                  required
                  className="p-6 rounded-full border border-transparent focus-visible:border-[#6C35A7] focus-visible:ring-0 mt-2 shadow-none bg-[#F6F6F6]"
                />
              </div>
              <div className="group">
                <label
                  htmlFor="duration"
                  className="text-[#807E7E] font-medium group-focus-within:text-[#6C35A7]"
                >
                  Duration
                </label>
                <Input
                  id="duration"
                  name="duration"
                  placeholder="4 Hrs"
                  required
                  className="p-6 rounded-full border border-transparent focus-visible:border-[#6C35A7] focus-visible:ring-0 mt-2 shadow-none bg-[#F6F6F6]"
                />
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between p-6 border-t">
            <button className="text-red-500 text-sm">Delete Service</button>
            <button className="bg-[#6C35A7] text-white px-6 py-4 rounded-full text-sm hover:bg-purple-700">
              Save Changes
            </button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
