import React from "react";

export default function Wallets() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
  <div className="bg-[#F6F6F6] gap-20 flex flex-col p-6 rounded-2xl h-80 justify-center bg-[url('/Rectangle .png')] bg-no-repeat bg-cover">
    
    <div>
      <p className="font-medium text-lg mb-3">Wallet Balance</p>
      <h2 className="font-bold text-4xl mb-4 text-[#6c35a7]">₦ 28,080</h2>
    </div>
    <button className="w-full sm:w-auto bg-[#FFB049] rounded-full py-4 px-8 text-white font-medium text-[16px] hover:bg-purple-700">
      Request Payout
    </button>
  </div>

  <div className="bg-[#F6F6F6] h-80 rounded-2xl p-4 overflow-hidden">
    
    <p className="font-medium text-lg mb-3">Transaction History</p>

    <div className="h-96 overflow-y-scroll overflow-x-hidden">
      <div className="bg-white p-4 rounded-2xl mb-4 flex items-center justify-between">
        <div className="flex items-center">
          <img src="/solar_alt-arrow-down-bold-duotone-1.png" alt="Transaction Icon" className="inline-block mr-4" />
          <h4 className="font-bold text-xl text-[#6c35a7]">₦ 30,000</h4>
        </div>
        <p className="text-[16px] text-black">20 Aug, 2023</p>
      </div>

      <div className="bg-white p-4 rounded-2xl mb-4 flex items-center justify-between">
        <div className="flex items-center">
          <img src="/solar_alt-arrow-down-bold-duotone.png" alt="Transaction Icon" className="inline-block mr-4" />
          <h4 className="font-bold text-xl text-[#6c35a7]">₦ 30,000</h4>
        </div>
        <p className="text-[16px] text-black">20 Aug, 2023</p>
      </div>

      <div className="bg-white p-4 rounded-2xl mb-4 flex items-center justify-between">
        <div className="flex items-center">
          <img src="/solar_alt-arrow-down-bold-duotone.png" alt="Transaction Icon" className="inline-block mr-4" />
          <h4 className="font-bold text-xl text-[#6c35a7]">₦ 30,000</h4>
        </div>
        <p className="text-[16px] text-black">20 Aug, 2023</p>
      </div>

      <div className="bg-white p-4 rounded-2xl mb-4 flex items-center justify-between">
        <div className="flex items-center">
          <img src="/solar_alt-arrow-down-bold-duotone.png" alt="Transaction Icon" className="inline-block mr-4" />
          <h4 className="font-bold text-xl text-[#6c35a7]">₦ 30,000</h4>
        </div>
        <p className="text-[16px] text-black">20 Aug, 2023</p>
      </div>

      <div className="bg-white p-4 rounded-2xl mb-4 flex items-center justify-between">
        <div className="flex items-center">
          <img src="/solar_alt-arrow-down-bold-duotone-1.png" alt="Transaction Icon" className="inline-block mr-4" />
          <h4 className="font-bold text-xl text-[#6c35a7]">₦ 30,000</h4>
        </div>
        <p className="text-[16px] text-black">20 Aug, 2023 </p>
      </div>

      <div className="bg-white p-4 rounded-2xl mb-4 flex items-center justify-between">
        <div className="flex items-center">
          <img src="/solar_alt-arrow-down-bold-duotone-1.png" alt="Transaction Icon" className="inline-block mr-4" />
          <h4 className="font-bold text-xl text-[#6c35a7]">₦ 30,000</h4>
        </div>
        <p className="text-[16px] text-black">20 Aug, 2023</p>
      </div>
      
    </div>
  </div>
</div>
  );
}
