import React, { useState } from "react";

export default function Wallets() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {/* Wallet Balance Section */}
      <div className="bg-[#F6F6F6] gap-20 flex flex-col p-6 rounded-2xl h-80 justify-center bg-[url('/Rec.png')] bg-no-repeat bg-cover">
        <div>
          <p className="font-medium text-lg mb-3">Wallet Balance</p>
          <h2 className="font-bold text-4xl mb-4 text-[#6c35a7]">₦ 284,080</h2>
        </div>
        <button
          className="w-full sm:w-auto bg-[#FFB049] rounded-full py-4 px-8 text-white font-medium text-[16px] hover:bg-purple-700"
          onClick={handleOpenModal}
        >
          Request Payout
        </button>
      </div>

      {/* Transaction History Section */}
      <div className="bg-[#F6F6F6] h-80 rounded-2xl p-4 overflow-hidden">
        <p className="font-medium text-lg mb-3">Transaction History</p>
        <div className="h-96 overflow-y-scroll overflow-x-hidden">
          <div className="bg-white p-4 rounded-2xl mb-4 flex items-center justify-between">
            <div className="flex items-center">
              <img
                src="/solar_alt-arrow-down-bold-duotone-1.png"
                alt="Transaction Icon"
                className="inline-block mr-4"
              />
              <h4 className="font-bold text-xl text-[#6c35a7]">₦ 30,000</h4>
            </div>
            <p className="text-[16px] text-black">20 Aug, 2023</p>
          </div>

          <div className="bg-white p-4 rounded-2xl mb-4 flex items-center justify-between">
            <div className="flex items-center">
              <img
                src="/solar_alt-arrow-down-bold-duotone.png"
                alt="Transaction Icon"
                className="inline-block mr-4"
              />
              <h4 className="font-bold text-xl text-[#6c35a7]">₦ 30,000</h4>
            </div>
            <p className="text-[16px] text-black">20 Aug, 2023</p>
          </div>

          <div className="bg-white p-4 rounded-2xl mb-4 flex items-center justify-between">
            <div className="flex items-center">
              <img
                src="/solar_alt-arrow-down-bold-duotone.png"
                alt="Transaction Icon"
                className="inline-block mr-4"
              />
              <h4 className="font-bold text-xl text-[#6c35a7]">₦ 30,000</h4>
            </div>
            <p className="text-[16px] text-black">20 Aug, 2023</p>
          </div>

          <div className="bg-white p-4 rounded-2xl mb-4 flex items-center justify-between">
            <div className="flex items-center">
              <img
                src="/solar_alt-arrow-down-bold-duotone.png"
                alt="Transaction Icon"
                className="inline-block mr-4"
              />
              <h4 className="font-bold text-xl text-[#6c35a7]">₦ 30,000</h4>
            </div>
            <p className="text-[16px] text-black">20 Aug, 2023</p>
          </div>

          <div className="bg-white p-4 rounded-2xl mb-4 flex items-center justify-between">
            <div className="flex items-center">
              <img
                src="/solar_alt-arrow-down-bold-duotone-1.png"
                alt="Transaction Icon"
                className="inline-block mr-4"
              />
              <h4 className="font-bold text-xl text-[#6c35a7]">₦ 30,000</h4>
            </div>
            <p className="text-[16px] text-black">20 Aug, 2023 </p>
          </div>

          <div className="bg-white p-4 rounded-2xl mb-4 flex items-center justify-between">
            <div className="flex items-center">
              <img
                src="/solar_alt-arrow-down-bold-duotone-1.png"
                alt="Transaction Icon"
                className="inline-block mr-4"
              />
              <h4 className="font-bold text-xl text-[#6c35a7]">₦ 30,000</h4>
            </div>
            <p className="text-[16px] text-black">20 Aug, 2023</p>
          </div>
        </div>
      </div>

      {/* Payout Request Modal - Conditionally rendered */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.3)] p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-[18px] text-start">
                Request Payout
              </h3>
              <button onClick={handleCloseModal}>
                <img
                  src="/ic_twotone-cancel.svg"
                  alt="Cancel"
                  className="w-6 h-6 text-gray-400 hover:text-gray-600"
                />
              </button>
            </div>
            <div className="mb-4">
              <label
                htmlFor="amount"
                className="block text-gray-700 font-medium mb-1"
              >
                Enter Bank Name
              </label>
              <input
                type="text"
                id="bankName"
                className="w-full p-4 rounded-full border border-transparent focus-visible:border-[#6C35A7] focus-visible:ring-0 mt-2 shadow-none bg-[#F6F6F6]"
                placeholder="Enter amount to withdraw"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="amount"
                className="block text-gray-700 font-medium mb-1"
              >
                Enter Account Number
              </label>
              <input
                type="number"
                id="accountNumber"
                className="w-full p-4 rounded-full border border-transparent focus-visible:border-[#6C35A7] focus-visible:ring-0 mt-2 shadow-none bg-[#F6F6F6]"
                placeholder="Enter account number here"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="amount"
                className="block text-gray-700 font-medium mb-1"
              >
                Enter Account Name
              </label>
              <input
                type="text"
                id="accountName"
                className="w-full p-4 rounded-full border border-transparent focus-visible:border-[#6C35A7] focus-visible:ring-0 mt-2 shadow-none bg-[#F6F6F6]"
                placeholder="Enter account name here"
              />
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <button className=" w-full px-6 py-4 rounded-full font-medium text-white bg-[#6C35A7] hover:bg-purple-700">
                Send Request
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
