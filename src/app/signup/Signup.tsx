"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
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
  const params = useSearchParams();
  const [agreed, setAgreed] = useState(false);

  const [form, setForm] = useState<SignupPayload>({
    businessName: "",
    email: "",
    fullName: "",
    businessAddress: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Prefill referralCode from URL query on first render
  useEffect(() => {
    const ref = params.get("ref");
    if (ref) {
      setForm((prev) => ({ ...prev, referralCode: ref }));
    }
  }, [params]);

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

      // Trigger verification OTP
      await requestEmailVerificationOtp({ email: form.email });

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
        <Image src="/logo.svg" alt="Osiso Pro logo" width={113} height={32} />
      </div>
      <button
        className="bg-transparent text-black shadow-none sm:hidden p-5 mt-15"
        onClick={() => router.back()}
      >
        <ChevronLeft size={20} />
      </button>
      <div className="flex w-full justify-around sm:py-10 px-6 gap-10 sm:mt-14">
        <div className="flex flex-col gap-6 max-w-[529px]">
          <div>
            <div className="flex items-center justify-between"> 
            <h2 className="text-3xl font-bold text-[#6C35A7] leading-[100%] mb-2">
              Create Your Account
            </h2>
            <h2 className="text-1xl font-bold text-[#000] leading-[100%] mb-2">
               1/4 
            </h2>
            </div>
            <p className="leading-[24px] md:leading-[34px] text-[13px] sm:text-[17px] font-medium font-inter">
              Sign Up Today to Begin Showcasing Your Unique Services to More
              Customers Online
            </p>
          </div>
          <form className="space-y-6 w-full" onSubmit={handleSubmit}>
            {/* Company Name */}
            <div className="group">
              <label
                htmlFor="businessName"
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
            {/* Email Address */}
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
            {/* Full Name */}
            <div className="group">
              <label
                htmlFor="fullName"
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
                required
                className="p-6 rounded-full border border-transparent focus-visible:border-[#6C35A7] focus-visible:ring-0 mt-2 shadow-none bg-[#F6F6F6]"
              />
            </div>
            {/* Referral Code (Prefilled) */}
            <div className="group">
              <label
                htmlFor="businessAddress"
                className="text-[#807E7E] font-medium group-focus-within:text-[#6C35A7]"
              >
               Enter Business Address
              </label>
              <Input
                id="businessAddress"
                name="businessAddress"
                value={form.businessAddress}
                onChange={handleChange}
                placeholder="No 23, adeola street, ikeja"
                className="p-6 rounded-full border border-transparent focus-visible:border-[#6C35A7] focus-visible:ring-0 mt-2 shadow-none bg-[#F6F6F6]"
              />
            </div>
            {/* Terms Checkbox */}
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
                I agree to{" "}
                <Link href="/terms-of-service" className="hover:text-[#6C35A7]">
                  Terms of Use
                </Link>{" "}
                and{" "}
                <Link href="/privacy-policy" className="hover:text-[#6C35A7]">
                  Privacy Policy
                </Link>
                . I agree to receive more information from Osiso Pro about its
                products and services.
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
