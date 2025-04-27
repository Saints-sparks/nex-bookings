"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

interface AccountInfoProps {
  businessName: string;
  user: {email: string; fullName: string; id: string};
}

export default function AccountInfo({ businessName, user }: AccountInfoProps) {
  const currentUser = {
    businessName,
    email: user.email,
    phone: "+234 801 234 5678",
    name: user.fullName,
  };

  const [formData, setFormData] = useState(currentUser);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        {[
          { label: "Business Name", name: "businessName" },
          { label: "Email Address", name: "email" },
          { label: "Phone Number", name: "phone" },
          { label: "Full Name", name: "name" },
        ].map((field) => (
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
              className="p-6 rounded-full border border-transparent focus-visible:border-[#6C35A7] focus-visible:ring-0 mt-2 shadow-none bg-[#F6F6F6]"
            />
          </div>
        ))}
      </div>
      <Button
        type="submit"
        className="w-full sm:w-auto bg-[#6C35A7] rounded-full py-7 px-14 font-medium text-[16px] mt-4 hover:bg-purple-700 mt-10"
      >
        Save Changes
      </Button>
    </div>
  );
}
