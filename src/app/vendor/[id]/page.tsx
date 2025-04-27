// app/vendor/[businessId]/page.tsx
import Image from "next/image";
import DisplayGrid from "@/components/vendor/DisplayGrid";
// import { getBusinessById } from "@/app/services/business";
import { getServicesByBusiness } from "@/app/services/service";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function VendorPublicPage({ params }: Props) {
  const { id } = await params;

  // server-side fetch
  //   const business = await getBusinessByUser(businessId);
  const services = await getServicesByBusiness(id);

  return (
    <div className="min-h-screen flex flex-col items-center mx-auto">
      <div className="bg-[#F2F2F2] p-2 text-white text-center w-full fixed top-0 left-0 right-0 z-10">
        <Image
          src="/nex.svg"
          alt="yeye"
          width={113}
          height={32}
          className="object-cover  mx-auto"
        />
      </div>

      <div className="max-w-[1000px] w-full flex flex-col items-center justify-center relative pb-10 px-8 sm:px-0 mt-20">
        {/* Hero */}
        <div className="flex flex-col gap-3 py-10 text-center max-w-[487px]">
          <h1 className="font-bold text-[20px] sm:text-[35px] text-[#6C35A7]">
            Test
          </h1>
          <p className="font-medium text-[14px] sm:text-[18px] font-inter">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et
          </p>
        </div>

        {/* Services */}
        <div className="flex-1 w-full flex items-center justify-center ">
          <DisplayGrid services={services} />
        </div>

        {/* Footer */}
        <div className="px-5 my-8 items-center justify-center text-black text-[20px] leading-[34px] w-full hidden sm:flex">
          <div className="flex-grow border-t border-[#807E7E]" />
          <span className="px-4">Powered by Nex Bookings</span>
          <div className="flex-grow border-t border-[#807E7E]" />
        </div>
      </div>
    </div>
  );
}
