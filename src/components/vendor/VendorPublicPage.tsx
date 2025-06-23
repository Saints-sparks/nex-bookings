// components/vendor/VendorPublicPage.tsx
import Image from "next/image";
import type { Service } from "@/app/services/service";
import PublicDisplayGrid from "./PublicDisplayGrid";
import Link from "next/link";
import { Facebook, Instagram } from "../Icons";

interface Props {
  businessName: string;
  description: string;
  logoUrl: string;
  services: Service[];
  instagramLink: string;
  facebookLink: string;
}

export default function VendorPublicPage({
  businessName,
  description,
  logoUrl,
  services,
  instagramLink,
  facebookLink,
}: Props) {
  return (
    <div className="min-h-screen flex flex-col items-center mx-auto">
      <header className="bg-[#F2F2F2] px-8 py-6 sm:py-2  text-white text-center w-full fixed top-0 z-10 flex justify-center items-center">
        <Image
          src={logoUrl ? logoUrl : "/logo.svg"}
          alt={businessName}
          width={54}
          height={54}
          className="rounded-3xl w-[54px] h-[54px] object-cover"
        />
      </header>

      <main className="max-w-[1000px] w-full pt-[100px] flex flex-col items-center px-8 sm:px-0">
        {/* Hero */}
        <div className="flex flex-col gap-3 py-10 text-center max-w-[487px]">
          <h1 className="font-bold text-[20px] md:text-[30px] lg:text-[35px] text-[#6C35A7]">
            {businessName}
          </h1>
          <p className="font-medium text-[14px] md:text-[16px] lg:text-[18px] font-inter">
            {description}
          </p>
          {(facebookLink || instagramLink) && (
            <div className="flex gap-6 justify-center mt-5">
              {facebookLink && (
                <Link href={facebookLink} target="_blank">
                  <Facebook />
                </Link>
              )}
              {instagramLink && (
                <Link href={instagramLink} target="_blank">
                  <Instagram />
                </Link>
              )}
            </div>
          )}
        </div>

        {/* Services */}
        <PublicDisplayGrid services={services} businessName={businessName} />

        {/* Footer */}
        <footer className="px-5 my-8 flex items-center text-black text-[20px] leading-[34px] w-full hidden sm:flex">
          <div className="flex-grow border-t border-[#807E7E]" />
          <span className="px-4">Powered by Osiso Pro</span>
          <div className="flex-grow border-t border-[#807E7E]" />
        </footer>
      </main>
    </div>
  );
}
