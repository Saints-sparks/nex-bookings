"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChevronLeft, EyeIcon, EyeOffIcon } from "lucide-react";
import Image from "next/image";
import { completeSignup, CompleteSignupPayload } from "@/app/services/auth";
import { Toggle } from "@/components/ui/toggle";
import WorkAvailabilitySelector from "@/components/ui/WorkAvailabilitySelector";

export default function SignUpDetailsPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isToggled, setIsToggled] = useState(false); // Added this line

  const [form, setForm] = useState({
    password: "",
    phoneNumber: "",
    industry: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    setUserId(localStorage.getItem("nex_userId"));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleNext = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) {
      setError("Missing signup session. Please start over.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const payload: CompleteSignupPayload = {
        userId,
        password: form.password,
        phoneNumber: form.phoneNumber,
        industry: form.industry,
      };
      const { business } = await completeSignup(payload);
      localStorage.setItem("nex_businessId", business.id);
      // on success, redirect to vendor home or dashboard
      router.push("/login");
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || "Could not complete signup.");
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
      <div className="flex w-full justify-around sm:pt-15 px-6 gap-10 sm:mt-10">
        <div className="flex flex-col gap-6 max-w-[529px]">
          <div className="">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold text-[#6C35A7] leading-[100%] mb-2">
                Enter Working Hours
              </h2>
              <h2 className="text-1xl font-bold text-[#000] leading-[100%] mb-2">
                3/4
              </h2>
            </div>
            <p className="leading-[34px] text-[17px] font-medium">
              Select your work hours, Tailor your availability to your schedule{" "}
            </p>
          </div>
          <form className="space-y-6  w-full" onSubmit={handleNext}>
            <WorkAvailabilitySelector />

            <Button
              type="submit"
              className="w-full bg-[#6C35A7] hover:bg-purple-700 rounded-full py-7 font-medium text-[16px] mt-4"
            >
              {loading ? "Finishing Up…" : "Complete Sign Up"}
            </Button>
            {error && <p className="text-red-600 text-sm mb-2">{error}</p>}
          </form>
        </div>

        <div className="hidden sm:block">
          <Image src="/images/signup.png" width={573} height={645} alt="" />
        </div>
      </div>
    </div>
  );
}
