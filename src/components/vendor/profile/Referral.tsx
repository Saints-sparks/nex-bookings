"use client";
import React, { useEffect, useState } from "react";
import {
  WhatsApp,
  Instagram,
  X,
  Facebook,
  Snapchat,
  Copy,
} from "@/components/Icons";
import { toast } from "sonner";
import { getReferralWallet } from "@/app/services/referral";

export default function ReferralCard() {
  const [code, setCode] = useState<string>("");
  const [balance, setBalance] = useState<number | null>(null);
  const [referralLink, setReferralLink] = useState<string>("");

  useEffect(() => {
    // Read referral code from storage (set during login)
    const code = localStorage.getItem("referralCode") || "";
    setCode(code);

    const baseUrl = "https://osisopro.com";
    setReferralLink(`${baseUrl}/signup?ref=${encodeURIComponent(code)}`);

    (async () => {
      try {
        const { balance } = await getReferralWallet();
        setBalance(balance);
        // If you really want to cache it locally:
        // localStorage.setItem("referralBalance", balance.toString());
      } catch (err) {
        console.error("Failed to fetch referral wallet", err);
        toast.error("Could not load referral balance");
      }
    })();
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    toast.success("Referral link copied to clipboard!");
    // Add your toast/notification logic here
  };

  const message = `🤩 Join me on Osiso Bookings and book like a pro!
Use my referral code: *${code}* or just click the link below 👇

${referralLink}`;

  const socialPlatforms = [
    {
      name: "WhatsApp",
      Icon: WhatsApp,
      url: `https://wa.me/?text=${encodeURIComponent(message)}`,
    },
    {
      name: "Instagram",
      Icon: Instagram,
      url: `https://www.instagram.com/?url=${encodeURIComponent(referralLink)}`, // Instagram doesn't support pre-filled DMs from browser
    },
    {
      name: "X",
      Icon: X,
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        message
      )}`,
    },
    {
      name: "Facebook",
      Icon: Facebook,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        referralLink
      )}`,
    },
    {
      name: "Snapchat",
      Icon: Snapchat,
      url: `https://www.snapchat.com/scan?attachmentUrl=${encodeURIComponent(
        referralLink
      )}`,
    },
  ];

  return (
    <div className="rounded-2xl p-6 md:p-10 bg-[#F6F6F6] mt-5">
      <div className="flex flex-col md:flex-row items-center justify-between gap-20">
        {/* Link & Social Section */}
        <div className="">
          <div className="flex justify-between items-center mb-2">
            <h4 className="text-[17px] md:text-[19px] font-bold mb-2">
              Referral Link
            </h4>
            <button
              onClick={handleCopy}
              className="p-2 bg-[gray-100] flex gap-3 rounded-lg rounded hover:bg-gray-200 font-bold text-[#6C35A7] "
              aria-label="Copy link"
            >
              <Copy /> Copy
            </button>
          </div>
          <div className="flex items-center space-x-2 bg-white rounded-xl p-4 ">
            <input
              type="text"
              readOnly
              value={referralLink}
              className="flex-1 bg-transparent focus:outline-none font-bold text-[#6C35A7]"
            />
          </div>

          <div className="mt-4 flex space-x-3">
            {socialPlatforms.map(({ name, Icon, url }) => (
              <a
                key={name}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white rounded-lg "
                aria-label={`Share on ${name}`}
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>

        {/* Balance & Action Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 w-full">
          <div className="my-5 md:my-0">
            <h4 className="text-[13px] md:text-[15px] font-inter font-medium mb-2">
              Referral Balance
            </h4>
            <span className="text-[21px] md:text-[24px] font-semibold text-[#6C35A7] mb-4">
              NGN {balance}
            </span>
          </div>
          <button className="px-6 py-3 bg-[#6C35A7] text-white rounded-full hover:bg-purple-700 w-full md:w-auto font-medium">
            Request Payout
          </button>
        </div>
      </div>
    </div>
  );
}
