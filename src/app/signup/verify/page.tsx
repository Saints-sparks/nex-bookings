"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SignUpDetailsPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    otp: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    // Ideally validate and send to backend here
    router.push("/signup/details"); // Go to OTP page
  };

  return (
    <div className="h-screen items-center justify-center">
      <div className="bg-[#FFB049] p-2 text-white text-center">
        <h1 className="font-bold text-[29px]">Logo</h1>
      </div>
      <div className="flex w-full justify-between py-6 px-6 gap-10 ">
        <div className="flex flex-col gap-6">
          <div className="">
            <h2 className="text-3xl font-bold text-[#6C35A7] leading-[100%] mb-2">
              Confirm OTP
            </h2>
            <p className="leading-[34px] text-[17px] font-[500]">
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
                Enter OTP here
              </label>
              <Input
                id="otp"
                name="otp"
                value={form.otp}
                onChange={handleChange}
                placeholder="Enter Your OTP"
                required
                className="p-6 rounded-full border border-transparent focus-visible:border-[#6C35A7] focus-visible:ring-0 mt-2 shadow-none bg-[#F6F6F6]"
              />
            </div>
            <div className="w-full flex justify-between">
              <p className="font-bold text-[#6C35A7]">Resend OTP</p>
              <p>00:30</p>
            </div>

            <Button
              type="submit"
              className="w-full bg-[#6C35A7] rounded-full py-7 font-medium text-[16px] mt-4"
            >
              Proceed
            </Button>
          </form>
        </div>

        <div className="hidden sm:block">
          <img src="/images/signup.png" alt="" />
        </div>
      </div>
    </div>
  );
}
