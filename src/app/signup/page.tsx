"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronLeft } from "lucide-react";

export default function SignUpDetailsPage() {
  const router = useRouter();
  const [agreed, setAgreed] = useState(false);

  const [form, setForm] = useState({
    companyName: "",
    name: "",
    email: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    // Ideally validate and send to backend here
    router.push("/signup/verify"); // Go to OTP page
  };

  return (
    <div className="h-screen items-center justify-center">
      <div className="bg-[#FFB049] p-2 text-white text-center">
        <h1 className="font-bold text-[29px]">Logo</h1>
      </div>
      <Button className="bg-transparent text-black shadow-none sm:hidden">
        <ChevronLeft size="24px" />
      </Button>
      <div className="flex w-full justify-between sm:py-10 px-6 gap-10 ">
        <div className="flex flex-col gap-6">
          <div className="">
            <h2 className="text-3xl font-bold text-[#6C35A7] leading-[100%] mb-2">
              Create Your Account
            </h2>
            <p className="leading-[34px] text-[17px] font-medium">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et{" "}
            </p>
          </div>
          <form className="space-y-6" onSubmit={handleNext}>
            <div className="group ">
              <label
                htmlFor="name"
                className="text-[#807E7E] font-medium group-focus-within:text-[#6C35A7]"
              >
                Company Name
              </label>
              <Input
                id="companyName"
                name="companyName"
                value={form.companyName}
                onChange={handleChange}
                placeholder="Sade Enterprises"
                required
                className="p-6 rounded-full border border-transparent focus-visible:border-[#6C35A7] focus-visible:ring-0 mt-2 shadow-none bg-[#F6F6F6]"
              />
            </div>
            <div className="group">
              <label
                htmlFor="email"
                className="text-[#807E7E] font-medium group-focus-within:text-[#6C35A7]"
              >
                Email Address
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="example@gmail.com"
                required
                className="p-6 rounded-full border border-transparent focus-visible:border-[#6C35A7] focus-visible:ring-0 mt-2 shadow-none bg-[#F6F6F6]"
              />
            </div>
            <div className="group">
              <label
                htmlFor="name"
                className="text-[#807E7E] font-medium group-focus-within:text-[#6C35A7]"
              >
                Enter Full Name
              </label>
              <Input
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Phone Number"
                className="p-6 rounded-full border border-transparent focus-visible:border-[#6C35A7] focus-visible:ring-0 mt-2 shadow-none bg-[#F6F6F6]"
                required
              />
            </div>
            <div className="flex items-start gap-6 mt-10">
              <Checkbox
                id="terms"
                checked={agreed}
                onCheckedChange={(checked) => setAgreed(!!checked)}
                className="border-[#6C35A7] data-[state=checked]:bg-[#6C35A7] data-[state=checked]:text-white mt-4"
              />
              <label
                htmlFor="terms"
                className="text-[#807E7E] leading-[28px] peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                I agree to (a) Terms of Use, and (b) Privacy Policy. I agree to
                receive more information from Alibaba.com about its products and
                services.
              </label>
            </div>
            <Button
              type="submit"
              className="w-full bg-[#6C35A7] rounded-full py-7 font-medium text-[16px] mt-4"
            >
              Sign Up
            </Button>
          </form>
          <div className="text-center w-full">
            <p>
              Have an account?{" "}
              <span className="font-bold text-[#6C35A7]">Sign in</span>
            </p>
          </div>
        </div>

        <div className="hidden sm:block">
          <img src="/images/signup.png" alt="" />
        </div>
      </div>
    </div>
  );
}
