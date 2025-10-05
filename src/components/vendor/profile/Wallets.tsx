import React, { useState, useEffect } from "react";
import { getWalletSummary, WalletTransaction } from "@/app/services/wallets";
import {
  getBanks,
  Bank,
  verifyAccount,
  requestPayout,
} from "@/app/services/payments";
import Image from "next/image";

export default function Wallets() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [balance, setBalance] = useState<number | null>(null);
  const [transactions, setTransactions] = useState<WalletTransaction[]>([]);
  const [banks, setBanks] = useState<Bank[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [payoutForm, setPayoutForm] = useState({
    amount: "",
    bankCode: "",
    accountNumber: "",
    accountName: "",
  });
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationError, setVerificationError] = useState<string | null>(
    null
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    getWalletSummary()
      .then((data) => {
        setBalance(data.balance);
        setTransactions(data.transactions || []);
      })
      .catch(() => setError("Could not load wallet info"))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (isModalOpen && banks.length === 0) {
      getBanks()
        .then((banksData) => {
          setBanks(banksData.filter((bank) => bank.active && !bank.is_deleted));
        })
        .catch((err) => {
          console.error("Failed to load banks:", err);
        });
    }
  }, [isModalOpen, banks.length]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setPayoutForm({
      amount: "",
      bankCode: "",
      accountNumber: "",
      accountName: "",
    });
    setVerificationError(null);
    setSubmitError(null);
    setSubmitSuccess(null);
  };

  const handleAccountVerification = async () => {
    if (!payoutForm.bankCode || !payoutForm.accountNumber) {
      return;
    }

    if (payoutForm.accountNumber.length < 10) {
      setVerificationError("Account number must be at least 10 digits");
      return;
    }

    setIsVerifying(true);
    setVerificationError(null);

    try {
      const result = await verifyAccount({
        account_number: payoutForm.accountNumber,
        bank_code: payoutForm.bankCode,
      });

      setPayoutForm((prev) => ({
        ...prev,
        accountName: result.account_name,
      }));
    } catch (error: any) {
      setVerificationError(
        error.response?.data?.message ||
          "Failed to verify account. Please check your details."
      );
      setPayoutForm((prev) => ({
        ...prev,
        accountName: "",
      }));
    } finally {
      setIsVerifying(false);
    }
  };

  const handlePayoutRequest = async () => {
    if (
      !payoutForm.amount ||
      !payoutForm.bankCode ||
      !payoutForm.accountNumber
    ) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(null);

    try {
      // Convert formatted amount back to number
      const amountValue = parseInt(payoutForm.amount.replace(/,/g, ""));

      const result = await requestPayout({
        amount: amountValue,
        account_number: payoutForm.accountNumber,
        bank_code: payoutForm.bankCode,
      });

      setSubmitSuccess(
        `Payout request successful! Transaction ID: ${
          result.transaction_id
        }. Net amount: ₦${result.net_amount.toLocaleString()} (after ₦${result.service_charge.toLocaleString()} service charge). ${
          result.estimated_arrival
        }`
      );

      // Refresh wallet data after successful payout
      getWalletSummary()
        .then((data) => {
          setBalance(data.balance);
          setTransactions(data.transactions || []);
        })
        .catch(() => {});
    } catch (error: any) {
      if (error.response?.data?.error) {
        setSubmitError(
          `${error.response.data.error}: ${error.response.data.details || ""}`
        );
      } else {
        setSubmitError(
          error.response?.data?.message ||
            "Failed to process payout request. Please try again."
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {/* Wallet Balance Section */}
      <div className="bg-[#F6F6F6] gap-20 flex flex-col p-6 rounded-2xl h-80 justify-center bg-[url('/Rec.png')] bg-no-repeat bg-cover">
        <div>
          <p className="font-medium text-lg mb-3">Wallet Balance</p>
          <h2 className="font-bold text-4xl mb-4 text-[#6c35a7]">
            {loading
              ? "..."
              : error
              ? "-"
              : balance !== null
              ? `₦ ${balance.toLocaleString()}`
              : "-"}
          </h2>
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
          {loading && <div>Loading transactions...</div>}
          {error && <div className="text-red-500">{error}</div>}
          {!loading && !error && transactions.length === 0 && (
            <section className="p-6 text-center text-black flex flex-col gap-10 justify-center items-center">
              <Image
                src="/empty.svg"
                alt="No transactions available"
                width={200}
                height={150}
              />
              <p className="max-w-[300px] text-[13px] md:text-[16px] leading-[24px] font-inter ">
                You have no recent wallet transactions yet.
              </p>
            </section>
          )}
          {transactions.map((txn) => (
            <div
              key={txn.id}
              className="bg-white p-4 rounded-2xl mb-4 flex items-center justify-between"
            >
              <div className="flex items-center">
                <img
                  src={
                    txn.type === "payout"
                      ? "/solar_alt-arrow-down-bold-duotone.png"
                      : "/solar_alt-arrow-down-bold-duotone-1.png"
                  }
                  alt="Transaction Icon"
                  className="inline-block mr-4"
                />
                <h4 className="font-bold text-xl text-[#6c35a7]">
                  ₦ {txn.amount.toLocaleString()}
                </h4>
              </div>
              <div className="flex flex-col items-end">
                <p className="text-[16px] text-black">
                  {new Date(txn.createdAt).toLocaleDateString("en-NG", {
                    year: "numeric",
                    month: "short",
                    day: "2-digit",
                  })}
                </p>
                <span className="text-xs text-gray-500">{txn.paymentRef}</span>
                <span
                  className={`text-xs ${
                    txn.status === "success"
                      ? "text-green-600"
                      : "text-yellow-600"
                  } capitalize`}
                >
                  {txn.status}
                </span>
              </div>
            </div>
          ))}
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
                Amount to Request
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">
                  ₦
                </span>
                <input
                  type="text"
                  id="amount"
                  value={payoutForm.amount}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, ""); // Only allow digits
                    const formattedValue = value
                      ? parseInt(value).toLocaleString()
                      : "";
                    setPayoutForm((prev) => ({
                      ...prev,
                      amount: formattedValue,
                    }));
                  }}
                  className="w-full p-4 pl-8 rounded-full border border-transparent focus-visible:border-[#6C35A7] focus-visible:ring-0 mt-2 shadow-none bg-[#F6F6F6]"
                  placeholder="Enter amount here"
                />
              </div>
              {balance !== null && (
                <p className="text-sm text-gray-600 mt-1">
                  Available balance: ₦{balance.toLocaleString()}
                </p>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="bankCode"
                className="block text-gray-700 font-medium mb-1"
              >
                Select Bank
              </label>
              <select
                id="bankCode"
                value={payoutForm.bankCode}
                onChange={(e) =>
                  setPayoutForm((prev) => ({
                    ...prev,
                    bankCode: e.target.value,
                  }))
                }
                className="w-full p-4 rounded-full border border-transparent focus-visible:border-[#6C35A7] focus-visible:ring-0 mt-2 shadow-none bg-[#F6F6F6] appearance-none"
              >
                <option value="">Select a bank</option>
                {banks.map((bank) => (
                  <option key={bank.id} value={bank.code}>
                    {bank.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label
                htmlFor="accountNumber"
                className="block text-gray-700 font-medium mb-1"
              >
                Enter Account Number
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="accountNumber"
                  value={payoutForm.accountNumber}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, ""); // Only allow digits
                    setPayoutForm((prev) => ({
                      ...prev,
                      accountNumber: value,
                      accountName: "", // Clear account name when number changes
                    }));
                    setVerificationError(null);
                  }}
                  onBlur={handleAccountVerification}
                  className="w-full p-4 rounded-full border border-transparent focus-visible:border-[#6C35A7] focus-visible:ring-0 mt-2 shadow-none bg-[#F6F6F6]"
                  placeholder="Enter account number here"
                  maxLength={10}
                />
                {isVerifying && (
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#6C35A7]"></div>
                  </div>
                )}
              </div>
              {verificationError && (
                <p className="text-red-500 text-sm mt-1">{verificationError}</p>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="accountName"
                className="block text-gray-700 font-medium mb-1"
              >
                Account Name
              </label>
              <input
                type="text"
                id="accountName"
                value={payoutForm.accountName}
                readOnly
                className="w-full p-4 rounded-full border border-transparent focus-visible:border-[#6C35A7] focus-visible:ring-0 mt-2 shadow-none bg-gray-100 text-gray-700 cursor-not-allowed"
                placeholder={
                  payoutForm.bankCode &&
                  payoutForm.accountNumber &&
                  payoutForm.accountNumber.length >= 10
                    ? "Account name will appear here after verification"
                    : "Select bank and enter account number first"
                }
              />
              {payoutForm.accountName && (
                <p className="text-green-600 text-sm mt-1 flex items-center">
                  <span className="mr-1">✓</span>
                  Account verified
                </p>
              )}
            </div>
            {submitSuccess && (
              <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-700 text-sm">{submitSuccess}</p>
              </div>
            )}
            {submitError && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-700 text-sm">{submitError}</p>
              </div>
            )}
            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={handlePayoutRequest}
                className={`w-full px-6 py-4 rounded-full font-medium text-white ${
                  payoutForm.amount &&
                  payoutForm.bankCode &&
                  payoutForm.accountNumber &&
                  payoutForm.accountName &&
                  !submitSuccess
                    ? "bg-[#6C35A7] hover:bg-purple-700"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
                disabled={
                  !payoutForm.amount ||
                  !payoutForm.bankCode ||
                  !payoutForm.accountNumber ||
                  !payoutForm.accountName ||
                  isVerifying ||
                  isSubmitting ||
                  !!submitSuccess
                }
              >
                {isSubmitting
                  ? "Processing..."
                  : isVerifying
                  ? "Verifying..."
                  : submitSuccess
                  ? "Request Sent"
                  : "Send Request"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
