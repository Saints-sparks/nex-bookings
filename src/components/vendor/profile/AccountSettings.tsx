import Image from "next/image";
import Link from "next/link";

export default function AccountSettings() {
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        <Link href="/privacy-policy">
          <div className="flex bg-[#F6F6F6] text-[#6C35A7] font-bold text-[17px] justify-between p-6 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors duration-300">
            Privacy Policy
            <Image
              src="/nex-right.svg"
              alt="Osiso Pro logo"
              width={24}
              height={24}
            />
          </div>
        </Link>
        <Link href="/terms-of-service">
          <div className="flex bg-[#F6F6F6] text-[#6C35A7] font-bold text-[17px] justify-between p-6 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors duration-300">
            Terms of Service
            <Image
              src="/nex-right.svg"
              alt="Green right arrow"
              width={24}
              height={24}
            />
          </div>
        </Link>
        <div className="flex bg-[#F6F6F6] text-[#F62E2E] font-bold text-[17px] justify-between p-6 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors duration-300">
          Delete Account
          <Image
            src="/nex-delete.svg"
            alt="Red right arrow"
            width={24}
            height={24}
          />
        </div>
      </div>
    </div>
  );
}
