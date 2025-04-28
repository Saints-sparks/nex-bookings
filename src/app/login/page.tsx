"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { introspect, signin, SigninPayload } from "../services/auth";
import api from "@/lib/api";

export default function VerificationPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState<SigninPayload>({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleReset = (e: React.FormEvent) => {
    e.preventDefault();
    // Ideally validate and send to backend here
    router.push("/login/resetPassword");
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { accessToken } = await signin(form);
      // persist token and set default header
      localStorage.setItem("nex_token", accessToken);
      api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
      const {user, business} = await introspect()
      // Fetch business for this user
      localStorage.setItem("nex_businessId", business.id);
      localStorage.setItem("nex_businessName", business.businessName);
      localStorage.setItem("nex_user", JSON.stringify(user));
      // redirect on success
      router.push("/vendor/home");
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
    <div className="h-screen items-center justify-center">
      <div className="bg-[#FFB049] p-3 text-white text-center fixed top-0 left-0 right-0 z-10 flex justify-center">
        <Image src="/nex.svg" alt="Nex Bookings logo" width={113} height={32} />
      </div>
      <div className="flex w-full justify-between py-6 sm:py-10 px-6 gap-10 mt-16 sm:mt-10">
        <div className="flex flex-col gap-6">
          <div className="">
            <h2 className="text-3xl font-bold text-[#6C35A7] leading-[100%] mb-2">
              Login To Your Account
            </h2>
            <p className="leading-[34px] text-sm sm:text-[17px] font-medium">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et{" "}
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
          <Image src="/images/signup.png" width={684} height={723} alt="" />
        </div>
      </div>
    </div>
  );
}
