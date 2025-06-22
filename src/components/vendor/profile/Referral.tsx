import React from "react";
import { WhatsApp, Instagram, X, Facebook, Snapchat } from "@/components/Icons";
import { CopyIcon } from "lucide-react";
import { toast } from "sonner";
// adjust the path to your icons.tsx file

export default function ReferralCard() {
  const referralLink = "www.sholaenterprises.nexbookings.com";
  const referralBalance = "NGN 30,000.00";

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    toast.success("Referral link copied to clipboard!");
    // Add your toast/notification logic here
  };

  const socialPlatforms = [
    { name: "WhatsApp", Icon: WhatsApp, url: `https://wa.me/?text=${referralLink}` },
    { name: "Instagram", Icon: Instagram, url: `https://www.instagram.com/?url=${referralLink}` },
    { name: "X", Icon: X, url: `https://twitter.com/intent/tweet?url=${referralLink}` },
    { name: "Facebook", Icon: Facebook, url: `https://www.facebook.com/sharer/sharer.php?u=${referralLink}` },
    { name: "Snapchat", Icon: Snapchat, url: `https://www.snapchat.com/scan?attachmentUrl=${referralLink}` },
  ];

  return (
    <div className="rounded-2xl p-6 md:p-10 bg-[#F6F6F6] mt-5">
      <div className="flex flex-col md:flex-row items-center justify-between gap-20">
        {/* Link & Social Section */}
        <div className="">
          <div className="flex justify-between">
            <h4 className="text-[17px] md:text-[19px] font-bold mb-2">Referral Link</h4>
             <button
                onClick={handleCopy}
                className="p-2 bg-[gray-100] flex gap-3 rounded hover:bg-gray-200 font-bold text-[#6C35A7] "
                aria-label="Copy link"
              >
                <CopyIcon className="h-5 w-5 text-[#6C35A7]" /> Copy
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
            <h4 className="text-[13px] md:text-[15px] font-inter font-medium mb-2">Referral Balance</h4>
            <span className="text-[21px] md:text-[24px] font-semibold text-[#6C35A7] mb-4">
              {referralBalance}
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
