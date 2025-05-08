"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import {
  requestEmailVerificationOtp,
  signup,
  SignupPayload,
} from "../services/auth";

export default function SignUpDetailsPage() {
  const router = useRouter();
  const [agreed, setAgreed] = useState(false);

  const [form, setForm] = useState<SignupPayload>({
    businessName: "",
    email: "",
    fullName: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) {
      setError("You must agree to the terms.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const signupData = await signup(form);
      const userId = signupData.business.userId;
      localStorage.setItem("nex_userId", userId);
      localStorage.setItem("pendingEmail", form.email);

      // 3️⃣ Immediately trigger the verification OTP
      await requestEmailVerificationOtp({ email: form.email });

      // 4️⃣ Redirect to the OTP confirmation page
      router.push("/signup/verify");
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || "Signup failed. Try again.");
    } finally {
      setLoading(false);
    }
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
      <div className="flex w-full justify-around sm:py-10 px-6 gap-10 sm:mt-14">
        <div className="flex flex-col gap-6 max-w-[529px]">
          <div className="">
            <h2 className="text-3xl font-bold text-[#6C35A7] leading-[100%] mb-2">
              Create Your Account
            </h2>
            <p className="leading-[24px] md:leading-[34px] text-[13px] sm:text-[17px] font-medium font-inter">
              Sign Up Today to Begin Showcasing Your Unique Services to More
              Customers Online{" "}
            </p>
          </div>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="group ">
              <label
                htmlFor="name"
                className="text-[#807E7E] font-medium group-focus-within:text-[#6C35A7]"
              >
                Company Name
              </label>
              <Input
                id="businessName"
                name="businessName"
                value={form.businessName}
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
                id="fullName"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                placeholder="Full Name"
                className="p-6 rounded-full border border-transparent focus-visible:border-[#6C35A7] focus-visible:ring-0 mt-2 shadow-none bg-[#F6F6F6]"
                required
              />
            </div>
            <div className=" items-start gap-6 mt-10 flex">
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
            {error && <p className="text-red-500">{error}</p>}

            <Button
              type="submit"
              className="w-full bg-[#6C35A7] hover:bg-purple-700 rounded-full py-7 font-medium text-[16px] mt-4"
            >
              {loading ? "Signing Up..." : "Sign Up"}
            </Button>
          </form>
          <div className="text-center w-full">
            <p>
              Have an account?{" "}
              <Link href="/login">
                <span className="font-bold text-[#6C35A7] cursor-pointer">
                  Sign in
                </span>
              </Link>
            </p>
          </div>
        </div>

        <div className="hidden sm:block">
          <Image src="/images/signup.png" width={573} height={645} alt="" />
        </div>
      </div>
    </div>
  );
}
