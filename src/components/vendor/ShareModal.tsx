"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Facebook, Instagram, Snapchat, WhatsApp, X } from "../Icons";
import { useIsMobile } from "@/app/hooks/useIsMobile";

interface ShareWebsiteModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  url: string;
}

export default function ShareWebsiteModal({
  open,
  onOpenChange,
  url,
}: ShareWebsiteModalProps) {
  const shareMessage = "Check out my services on Osiso Pro!";
  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    toast.success("Link copied to clipboard!");
  };

  const shareWindow = (shareUrl: string) => {
    window.open(shareUrl, "_blank", "noopener,noreferrer");
  };

  const handleInstagram = async () => {
    // Fallback to native share if available
    if (navigator.share) {
      try {
        await navigator.share({ title: "Check this out", url });
      } catch {
        toast.error("Could not open native share sheet.");
      }
    } else {
      toast("Use the copy button to share to Instagram.");
    }
  };
  const isMobile = useIsMobile();
  // prebuild share URLs
  const encodedMessage = encodeURIComponent(shareMessage);
  const encodedUrl = encodeURIComponent(url);
  const shareLinks = {
    whatsapp: `https://api.whatsapp.com/send?text=${encodedMessage}%20${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodedMessage}&url=${encodedUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedMessage}`,
    // Snapchat’s web share endpoint only allows attachmentUrl—no custom text.
    snapchat: `https://snapchat.com/scan?attachmentUrl=${encodedUrl}`,
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white rounded-2xlmax-w-[343px] md:max-w-[476px] min-w-0 min-h-[400px]">
        <DialogHeader>
          <DialogTitle className="font-[800] text-[#212121] text-[18px] lg:text-[20px]">
            Share Website
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p className="text-[17px] text-[#212121] font-bold text-center">
            Website Link
          </p>
          <div className="flex gap-2 text-[#6C35A7] font-bold text-[14px] sm:text-[16px] lg:text-[18px] items-center">
            <Input
              readOnly
              value={url}
              className="flex-1 p-6  rounded-full border border-transparent focus-visible:border-[#6C35A7] focus-visible:ring-0 mt-2 shadow-none bg-[#F6F6F6] text-center text-[14px] md:text-[16px]"
            />
          </div>
          <div className="flex items-center justify-center gap-2 md:gap-6 pt-2">
            <button
              aria-label="Share on WhatsApp"
              onClick={() => shareWindow(shareLinks.whatsapp)}
              className="bg-[#F6F6F6] p-1.5 md:p-3 rounded-2xl"
            >
              <WhatsApp />
            </button>
            <button
              aria-label="Share on Instagram"
              onClick={handleInstagram}
              className="bg-[#F6F6F6] p-1.5 md:p-3 rounded-2xl"
            >
              <Instagram />
            </button>
            <button
              aria-label="Share on Facebook"
              onClick={() => shareWindow(shareLinks.facebook)}
              className="bg-[#F6F6F6] p-1.5 md:p-3 rounded-2xl"
            >
              <Facebook />
            </button>
            <button
              aria-label="Share on X"
              onClick={() => shareWindow(shareLinks.twitter)}
              className="bg-[#F6F6F6] p-1.5 md:p-3 rounded-2xl"
            >
              <X />
            </button>
            <button
              aria-label="Share on Snapchat"
              onClick={() => shareWindow(shareLinks.snapchat)}
              className="bg-[#F6F6F6] p-1.5 md:p-3 rounded-2xl"
            >
              <Snapchat isMobile={isMobile} />
            </button>
          </div>
        </div>
        <button
          className="w-full bg-[#6C35A7] rounded-full  text-white"
          onClick={handleCopy}
        >
          Copy Link
        </button>
      </DialogContent>
    </Dialog>
  );
}
