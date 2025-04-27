"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";

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
    router.push("/login/newPassword"); // Go to OTP page
  };

  return (
    <div className="h-screen items-center justify-center">
      <div className="bg-[#FFB049] p-3 text-white text-center fixed top-0 left-0 right-0 z-10 flex justify-center">
        <Image src="/nex.svg" alt="Nex Bookings logo" width={113} height={32} />
      </div>
      <button
        className="bg-transparent text-black shadow-none sm:hidden p-5 mt-15"
        onClick={() => router.back()}
      >
        <ChevronLeft size={20} />
      </button>
      <div className="flex w-full justify-between sm:py-10 px-6 gap-10 sm:mt-10">
        <div className="flex flex-col gap-6">
          <div className="">
            <h2 className="text-3xl font-bold text-[#6C35A7] leading-[100%] mb-2">
              Confirm OTP
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
          <Image src="/images/signup.png" width={684} height={723} alt="" />
        </div>
      </div>
    </div>
  );
}
