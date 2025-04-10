import { Button } from "@/components/ui/button";
import VendorNavbar from "@/components/vendor/NavBar";

export default function VendorHome() {
  return (
    <div className=" flex flex-col justify-center mx-auto">
      <VendorNavbar />
      <div className="flex p-10 justify-between w-full items-center">
        <div className="flex flex-col gap-3">
          <h1 className="text-[#6C35A7] font-bold text-3xl">
            Shola Enterprises
          </h1>
          <p className="font-[500] max-w-[487px]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et{" "}
          </p>
        </div>
        <div className="flex gap-3">
          <Button className="bg-[#6C35A7] p-6 text-[16px] font-500 rounded-full">Add Service</Button>
          <Button className="bg-[#FFB049] p-6 text-[16px] font-500 rounded-full">View Website</Button>
        </div>
      </div>
      <
    </div>
  );
}
