"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronLeft, EyeIcon, EyeOffIcon } from "lucide-react";
import Image from "next/image";
import { completeSignup, CompleteSignupPayload } from "@/app/services/auth";

export default function SignUpDetailsPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    password: "",
    phoneNumber: "",
    industry: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    setUserId(localStorage.getItem("nex_userId"));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleNext = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) {
      setError("Missing signup session. Please start over.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const payload: CompleteSignupPayload = {
        userId,
        password: form.password,
        phoneNumber: form.phoneNumber,
        industry: form.industry,
      };
      const { business } = await completeSignup(payload);
      localStorage.setItem("nex_businessId", business.id);
      // on success, redirect to vendor home or dashboard
      router.push("/login");
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || "Could not complete signup.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen items-center justify-center">
      <div className="bg-[#FFB049] p-3 text-white text-center fixed top-0 left-0 right-0 z-10 flex justify-center">
        <Image src="/logo.svg" alt="Osiso Pro logo" width={113} height={32} />
      </div>
      <button
        className="bg-transparent text-black shadow-none sm:hidden p-5 mt-15"
        onClick={() => router.back()}
      >
        <ChevronLeft size={20} />
      </button>
      <div className="flex w-full justify-around sm:pt-15 px-6 gap-10 sm:mt-10">
        <div className="flex flex-col gap-6 max-w-[529px]">
          <div className="">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold text-[#6C35A7] leading-[100%] mb-2">
                Finish Sign Up
              </h2>
              <h2 className="text-1xl font-bold text-[#000] leading-[100%] mb-2">
                4/4
              </h2>
            </div>
            <p className="leading-[34px] text-[17px] font-medium">
              Almost Done with Registration, Enter Details Below to Finish
              registration{" "}
            </p>
          </div>
          <form className="space-y-6 w-full" onSubmit={handleNext}>
            <div className="group ">
              <label
                htmlFor="password"
                className="text-[#807E7E] font-medium group-focus-within:text-[#6C35A7]"
              >
                Enter Password
              </label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Your Password"
                  required
                  className="p-6 rounded-full border border-transparent focus-visible:border-[#6C35A7] focus-visible:ring-0 mt-2 shadow-none bg-[#F6F6F6]"
                />
                <span
                  className="absolute top-4 right-4 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOffIcon size={20} className="text-[#6C35A7]" />
                  ) : (
                    <EyeIcon size={20} className="text-[#6C35A7]" />
                  )}
                </span>
              </div>
            </div>
            <div className="group">
              <label
                htmlFor="phoneNumber"
                className="text-[#807E7E] font-medium group-focus-within:text-[#6C35A7]"
              >
                WhatsApp Number
              </label>
              <Input
                id="phoneNumber"
                name="phoneNumber"
                type="tel"
                value={form.phoneNumber}
                onChange={handleChange}
                placeholder="+234 0000 0000"
                required
                className="p-6 rounded-full border border-transparent focus-visible:border-[#6C35A7] focus-visible:ring-0 mt-2 shadow-none bg-[#F6F6F6]"
              />
            </div>
            <div className="group">
              <label
                htmlFor="industry"
                className="text-[#807E7E] font-medium group-focus-within:text-[#6C35A7]"
              >
                Select Industry
              </label>
              <Select
                onValueChange={(value) =>
                  setForm((prev) => ({ ...prev, industry: value }))
                }
              >
                <SelectTrigger
                  className="w-full mt-2 p-6 rounded-full border border-transparent focus:border-[#6C35A7] focus:ring-0 shadow-none bg-[#F6F6F6] text-left text-[#000000] font-medium"
                  id="industry"
                >
                  <SelectValue
                    placeholder="Select Industry"
                    className="p-6 rounded-full border border-transparent focus-visible:border-[#6C35A7] focus-visible:ring-0 mt-2 shadow-none bg-[#F6F6F6] text-[#6C35$7]"
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="technology">
                    Technology & IT Services
                  </SelectItem>
                  <SelectItem value="finance">
                    Banking & Financial Services
                  </SelectItem>
                  <SelectItem value="agriculture">
                    Agriculture & Agribusiness
                  </SelectItem>
                  <SelectItem value="education">
                    Education & Training
                  </SelectItem>
                  <SelectItem value="healthcare">
                    Healthcare & Medical Services
                  </SelectItem>
                  <SelectItem value="oil-gas">Oil & Gas</SelectItem>
                  <SelectItem value="manufacturing">Manufacturing</SelectItem>
                  <SelectItem value="telecoms">Telecommunications</SelectItem>
                  <SelectItem value="retail">Retail & E-commerce</SelectItem>
                  <SelectItem value="hospitality">
                    Hospitality & Tourism
                  </SelectItem>
                  <SelectItem value="real-estate">
                    Real Estate & Construction
                  </SelectItem>
                  <SelectItem value="transportation">
                    Transportation & Logistics
                  </SelectItem>
                  <SelectItem value="media">Media & Entertainment</SelectItem>
                  <SelectItem value="fashion">Fashion & Textiles</SelectItem>
                  <SelectItem value="food-beverage">Food & Beverage</SelectItem>
                  <SelectItem value="beauty-wellness">
                    Beauty & Wellness
                  </SelectItem>
                  <SelectItem value="consulting">
                    Consulting & Professional Services
                  </SelectItem>
                  <SelectItem value="mining">
                    Mining & Natural Resources
                  </SelectItem>
                  <SelectItem value="insurance">Insurance</SelectItem>
                  <SelectItem value="sports-fitness">
                    Sports & Fitness
                  </SelectItem>
                  <SelectItem value="automotive">Automotive</SelectItem>
                  <SelectItem value="legal">Legal Services</SelectItem>
                  <SelectItem value="arts-crafts">Arts & Crafts</SelectItem>
                  <SelectItem value="event-planning">Event Planning</SelectItem>
                  <SelectItem value="security">Security Services</SelectItem>
                  <SelectItem value="cleaning">Cleaning Services</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              type="submit"
              className="w-full bg-[#6C35A7] hover:bg-purple-700 rounded-full py-7 font-medium text-[16px] mt-4"
            >
              {loading ? "Finishing Up…" : "Complete Sign Up"}
            </Button>
            {error && <p className="text-red-600 text-sm mb-2">{error}</p>}
          </form>
        </div>

        <div className="hidden sm:block">
          <Image src="/images/signup.png" width={573} height={645} alt="" />
        </div>
      </div>
    </div>
  );
}
