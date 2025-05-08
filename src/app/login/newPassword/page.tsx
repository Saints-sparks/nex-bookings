"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChevronLeft, EyeIcon, EyeOffIcon } from "lucide-react";
import Image from "next/image";
import { confirmPasswordResetWithOtp } from "@/app/services/auth";

export default function NewPassword() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [show, setShow] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    const email = localStorage.getItem("pendingResetEmail")!;
    const otp = localStorage.getItem("pendingResetOtp")!;

    setError(null);
    setLoading(true);
    try {
      await confirmPasswordResetWithOtp({ email, otp, newPassword: password });
      router.push("/login"); // or wherever you send them to sign in
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to reset password.");
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
      <div className="flex w-full justify-between sm:py-10 px-6 gap-10 sm:mt-10">
        <div className="flex flex-col gap-6">
          <div className="">
            <h2 className="text-3xl font-bold text-[#6C35A7] leading-[100%] mb-2">
              New Password
            </h2>
            <p className="leading-[34px] text-sm sm:text-[17px] font-medium">
              Create a new password to secure your account and complete the
              reset process.{" "}
            </p>
            {error && <div className="text-red-600">{error}</div>}
          </div>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="group ">
              <label
                htmlFor="password"
                className="text-[#807E7E] font-medium group-focus-within:text-[#6C35A7]"
              >
                Enter Password
              </label>
              <div className="relative">
                <Input
                  name="password"
                  type={show ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Your Password"
                  required
                  className="p-6 rounded-full border border-transparent focus-visible:border-[#6C35A7] focus-visible:ring-0 mt-2 shadow-none bg-[#F6F6F6]"
                />
                <span
                  className="absolute top-4 right-4 cursor-pointer"
                  onClick={() => setShow(!show)}
                >
                  {show ? (
                    <EyeOffIcon size={20} className="text-[#6C35A7]" />
                  ) : (
                    <EyeIcon size={20} className="text-[#6C35A7]" />
                  )}
                </span>
              </div>
            </div>
            <div className="group ">
              <label
                htmlFor="confirm"
                className="text-[#807E7E] font-medium group-focus-within:text-[#6C35A7]"
              >
                Confirm Password
              </label>
              <div className="relative">
                <Input
                  name="confirm"
                  type={showConfirm ? "text" : "password"}
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  placeholder="Your Password"
                  required
                  className="p-6 rounded-full border border-transparent focus-visible:border-[#6C35A7] focus-visible:ring-0 mt-2 shadow-none bg-[#F6F6F6]"
                />
                <span
                  className="absolute top-4 right-4 cursor-pointer"
                  onClick={() => setShowConfirm(!showConfirm)}
                >
                  {showConfirm ? (
                    <EyeOffIcon size={20} className="text-[#6C35A7]" />
                  ) : (
                    <EyeIcon size={20} className="text-[#6C35A7]" />
                  )}
                </span>
              </div>
            </div>
            <Button
              type="submit"
              className="w-full bg-[#6C35A7] rounded-full py-7 font-medium text-[16px] mt-4"
            >
              {loading ? "…" : "Proceed"}
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
