"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import { requestPasswordResetOtp } from "@/app/services/auth";

export default function SignUpDetailsPage() {
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(30);
  const [resendLoading, setResendLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (timer <= 0) return;
    const id = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(id);
  }, [timer]);

  const handleResend = async () => {
    if (timer > 0) return;
    setResendLoading(true);
    setError(null);
    try {
      const email = localStorage.getItem("pendingResetEmail")!;
      await requestPasswordResetOtp({ email });
      setTimer(30);
    } catch (e: any) {
      setError(e.response?.data?.message || "Failed to resend OTP.");
    } finally {
      setResendLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("pendingResetOtp", otp);
    router.push("/login/newPassword");
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
      <div className="flex w-full justify-between sm:py-10 px-6 gap-10 sm:mt-10">
        <div className="flex flex-col gap-6">
          <div className="">
            <h2 className="text-3xl font-bold text-[#6C35A7] leading-[100%] mb-2">
              Confirm OTP
            </h2>
            <p className="leading-[34px] text-[17px] font-medium">
              Enter the 6-digit code sent to your email to verify your identity
              and continue resetting your password.{" "}
            </p>
            {error && <div className="text-red-600">{error}</div>}
          </div>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="group ">
              <label
                htmlFor="name"
                className="text-[#807E7E] font-medium group-focus-within:text-[#6C35A7]"
              >
                Enter OTP here
              </label>
              <Input
                name="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                maxLength={6}
                placeholder="Enter Your OTP"
                required
                className="p-6 rounded-full border border-transparent focus-visible:border-[#6C35A7] focus-visible:ring-0 mt-2 shadow-none bg-[#F6F6F6]"
              />
            </div>
            <div className="flex items-center justify-between text-sm">
              <button
                type="button"
                onClick={handleResend}
                disabled={timer > 0 || resendLoading}
                className={`font-semibold ${
                  timer > 0
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-[#6C35A7]"
                }`}
              >
                {resendLoading
                  ? "Resending…"
                  : timer > 0
                  ? `Resend in 00:${timer.toString().padStart(2, "0")}`
                  : "Resend OTP"}
              </button>
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
