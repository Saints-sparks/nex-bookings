import Image from "next/image";
import DisplayGrid from "@/components/vendor/DisplayGrid";

export default function VendorPublicPage() {
  return (
    <div className="min-h-screen flex flex-col items-center mx-auto">
      <div className="bg-[#F2F2F2] p-2 text-white text-center w-full fixed top-0 left-0 right-0 z-10">
        <Image
          src="/images/shola.png"
          alt="Nail Trimming"
          width={353}
          height={174}
          className="w-14 h-14 object-cover rounded-lg mx-auto"
        />
      </div>
      <div className="max-w-[1000px] w-full flex flex-col items-center justify-center relative pb-10 px-3 sm:px-0 mt-20">
        <div className="flex flex-col gap-3 py-10 text-center max-w-[487px]">
          <h1 className="font-bold text-[20px] sm:text-[35px] text-[#6C35A7]">
            Shola Enterprises
          </h1>
          <p className="font-medium text-[14px] sm:text-[18px] font-inter">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et
          </p>
        </div>
        <div className="flex-1 w-full flex items-center justify-center ">
          <DisplayGrid />
        </div>
        <div className="px-5 my-8 items-center justify-center text-black text-[20px] leading-[34px] w-full hidden sm:flex">
          <div className="flex-grow border-t border-[#807E7E]"></div>
          <span className="px-4">Powered by Nex Bookings</span>
          <div className="flex-grow border-t border-[#807E7E]"></div>
        </div>
      </div>
    </div>
  );
}
