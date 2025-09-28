"use client";

import React, { FormEvent, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import api from "@/lib/api";
import { introspect, signin } from "../services/auth";

export default function LoginClient() {
  const router = useRouter();
  const params = useSearchParams();
  const redirectParam = params.get("redirect") || "/vendor/home";

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleReset = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/login/resetPassword");
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Simulate login delay and set mock data
    try {
      const { accessToken } = await signin(form);
      localStorage.setItem("nex_token", accessToken);
      api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}⁠`;

      const { user, business } = await introspect();
      localStorage.setItem("nex_businessId", business.id);
      localStorage.setItem("nex_businessName", business.businessName);
      localStorage.setItem("nex_businessSlug", business.slug);

      localStorage.setItem("nex_user", JSON.stringify(user));

      router.push(redirectParam);
    } catch (err: any) {
      console.error("Login error:", err);
      setError(
        err.response?.data?.message || "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="bg-[#FFB049] p-3 text-white text-center fixed top-0 left-0 right-0 z-10 flex justify-center">
        <Image src="/logo.svg" alt="Osiso Pro logo" width={113} height={32} />
      </div>

      <div className="flex w-full justify-around px-3 py-6 sm:py-0 sm:pt-20 gap-10 mt-16 sm:mt-10">
        <div className="flex flex-col gap-6 max-w-[529px]">
          <div>
            <h2 className="text-3xl font-bold text-[#6C35A7] leading-[100%] mb-2">
              Login To Your Account
            </h2>
            <p className="leading-[34px] text-sm sm:text-[17px] font-medium font-inter">
              Manage Your Digital Service Cards & Connect With More Customers
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
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

            <div className="cursor-pointer" onClick={handleReset}>
              <p className="font-bold text-[#6C3587]">Reset Password</p>
            </div>

            <Button
              type="submit"
              className="w-full bg-[#6C35A7] hover:bg-purple-700 rounded-full py-7 font-medium text-[16px] mt-4"
            >
              {loading ? "Logging in" : "Login"}
            </Button>
            {error && <p className="text-red-600 text-sm mb-2">{error}</p>}
          </form>

          <div className="text-center w-full">
            <p>
              New User?{" "}
              <Link href="/signup">
                <span className="font-bold text-[#6C35A7] cursor-pointer">
                  Sign up
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
