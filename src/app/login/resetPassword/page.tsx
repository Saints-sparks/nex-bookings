"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChevronLeft, EyeIcon, EyeOffIcon } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    // Ideally validate and send to backend here
    router.push("/login/verify"); // Go to OTP page
  };

  return (
    <div className="h-screen items-center justify-center">
      <div className="bg-[#FFB049] p-2 text-white text-center">
        <h1 className="font-bold text-[29px]">Logo</h1>
      </div>
      <Button className="bg-transparent text-black shadow-none sm:hidden" >
          <ChevronLeft size="24px" />
      </Button>
      <div className="flex w-full justify-between sm:py-10 px-6 gap-10 ">
        <div className="flex flex-col gap-6">
          <div className="">
            <h2 className="text-3xl font-bold text-[#6C35A7] leading-[100%] mb-2">
              Login To Your Account
            </h2>
            <p className="leading-[34px] text-sm sm:text-[17px] font-[500]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et{" "}
            </p>
          </div>
          <form className="space-y-6" onSubmit={handleNext} >
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
            
            
            
            <Button
              type="submit"
              className="w-full bg-[#6C35A7] rounded-full py-7 font-medium text-[16px] mt-4"
            >
              Submit
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
