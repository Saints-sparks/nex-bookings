"use client";
import React, { useEffect, useState } from "react";
import {
  WhatsApp,
  Instagram,
  X,
  Facebook,
  Snapchat,
  Copy,
} from "@/components/Icons";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import {
  getReferralWallet,
  getBanks,
  verifyBankAccount,
  checkNameMatch,
  requestPayout,
  Bank,
  VerifyBankAccountResponse,
} from "@/app/services/referral";

export default function ReferralCard() {
  const [code, setCode] = useState<string>("");
  const [balance, setBalance] = useState<number | null>(null);
  const [referralLink, setReferralLink] = useState<string>("");
  const [showPayoutModal, setShowPayoutModal] = useState(false);
  const [banks, setBanks] = useState<Bank[]>([]);
  const [selectedBank, setSelectedBank] = useState<Bank | null>(null);
  const [accountNumber, setAccountNumber] = useState("");
  const [accountName, setAccountName] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [isVerifyingAccount, setIsVerifyingAccount] = useState(false);
  const [isProcessingPayout, setIsProcessingPayout] = useState(false);
  const [accountVerified, setAccountVerified] = useState(false);
  const [nameMatchVerified, setNameMatchVerified] = useState(false);
  const [verificationData, setVerificationData] =
    useState<VerifyBankAccountResponse | null>(null);

  useEffect(() => {
    // Read referral code from storage (set during login)
    const code = localStorage.getItem("referralCode") || "";
    setCode(code);

    const baseUrl = "https://osisopro.com";
    setReferralLink(`${baseUrl}/signup?ref=${encodeURIComponent(code)}`);

    (async () => {
      try {
        const { balance } = await getReferralWallet();
        setBalance(balance);
        // If you really want to cache it locally:
        // localStorage.setItem("referralBalance", balance.toString());
      } catch (err) {
        console.error("Failed to fetch referral wallet", err);
        toast.error("Could not load referral balance");
      }
    })();
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    toast.success("Referral link copied to clipboard!");
  };

  const handleRequestPayout = async () => {
    if (!balance || balance <= 5000) {
      toast.error("Minimum balance for payout is 5000");
      return;
    }

    try {
      const banksList = await getBanks();
      setBanks(banksList);
      setShowPayoutModal(true);
    } catch (error) {
      console.error("Failed to fetch banks:", error);
      toast.error("Failed to load banks. Please try again.");
    }
  };

  const handleVerifyAccount = async () => {
    if (!selectedBank || !accountNumber) {
      toast.error("Please select a bank and enter account number");
      return;
    }

    setIsVerifyingAccount(true);
    try {
      const verifyData = await verifyBankAccount({
        accountNumber,
        bankCode: selectedBank.code,
      });

      if (verifyData.isValid) {
        setVerificationData(verifyData);
        setAccountName(verifyData.accountName);
        setAccountVerified(true);
        toast.success("Account verified successfully!");

        // Check name match
        const user = JSON.parse(localStorage.getItem("nex_user") || "{}");
        const userName = user.fullName || user.name || "";

        if (userName) {
          const nameMatchResult = await checkNameMatch({
            userName,
            accountName: verifyData.accountName,
          });

          if (nameMatchResult.isValid) {
            setNameMatchVerified(true);
            toast.success("Name verification passed!");
          } else {
            toast.error("Account name does not match your profile name");
          }
        }
      } else {
        toast.error(verifyData.message || "Account verification failed");
      }
    } catch (error: any) {
      console.error("Account verification error:", error);
      toast.error(
        error.response?.data?.message || "Account verification failed"
      );
    } finally {
      setIsVerifyingAccount(false);
    }
  };

  const handleSubmitPayout = async () => {
    if (!selectedBank || !accountNumber || !accountName || !withdrawAmount) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (!accountVerified || !nameMatchVerified) {
      toast.error("Please verify your account first");
      return;
    }

    const amount = parseFloat(withdrawAmount);
    if (isNaN(amount) || amount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    if (balance && amount > balance) {
      toast.error("Insufficient balance");
      return;
    }

    setIsProcessingPayout(true);
    try {
      const result = await requestPayout({
        withdrawAmount: amount,
        bankCode: selectedBank.code,
        accountNumber,
        accountName,
      });

      toast.success("Payout request submitted successfully!");
      setShowPayoutModal(false);
      setBalance(result.walletBalance); // Update balance
      resetModalState();
    } catch (error: any) {
      console.error("Payout request error:", error);
      toast.error(error.response?.data?.message || "Payout request failed");
    } finally {
      setIsProcessingPayout(false);
    }
  };

  const resetModalState = () => {
    setSelectedBank(null);
    setAccountNumber("");
    setAccountName("");
    setWithdrawAmount("");
    setAccountVerified(false);
    setNameMatchVerified(false);
    setVerificationData(null);
  };

  const handleCloseModal = () => {
    setShowPayoutModal(false);
    resetModalState();
  };

  const message = `🤩 Join me on Osiso Bookings and book like a pro!
Use my referral code: *${code}* or just click the link below 👇

${referralLink}`;

  const socialPlatforms = [
    {
      name: "WhatsApp",
      Icon: WhatsApp,
      url: `https://wa.me/?text=${encodeURIComponent(message)}`,
    },
    {
      name: "Instagram",
      Icon: Instagram,
      url: `https://www.instagram.com/?url=${encodeURIComponent(referralLink)}`, // Instagram doesn't support pre-filled DMs from browser
    },
    {
      name: "X",
      Icon: X,
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        message
      )}`,
    },
    {
      name: "Facebook",
      Icon: Facebook,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        referralLink
      )}`,
    },
    {
      name: "Snapchat",
      Icon: Snapchat,
      url: `https://www.snapchat.com/scan?attachmentUrl=${encodeURIComponent(
        referralLink
      )}`,
    },
  ];

  return (
    <div className="rounded-2xl p-6 md:p-10 bg-[#F6F6F6] mt-5">
      <div className="flex flex-col md:flex-row items-center justify-between gap-20">
        {/* Link & Social Section */}
        <div className="">
          <div className="flex justify-between items-center mb-2">
            <h4 className="text-[17px] md:text-[19px] font-bold mb-2">
              Referral Link
            </h4>
            <button
              onClick={handleCopy}
              className="p-2 bg-[gray-100] flex gap-3 rounded-lg rounded hover:bg-gray-200 font-bold text-[#6C35A7] "
              aria-label="Copy link"
            >
              <Copy /> Copy
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
            <h4 className="text-[13px] md:text-[15px] font-inter font-medium mb-2">
              Referral Balance
            </h4>
            <span className="text-[21px] md:text-[24px] font-semibold text-[#6C35A7] mb-4">
              NGN {balance}
            </span>
          </div>
          <button
            onClick={handleRequestPayout}
            // disabled={!balance || balance <= 0}
            className="px-6 py-3 bg-[#6C35A7] text-white rounded-full hover:bg-purple-700 w-full md:w-auto font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Request Payout
          </button>
        </div>
      </div>

      {/* Payout Modal */}
      <Dialog open={showPayoutModal} onOpenChange={handleCloseModal}>
        <DialogContent className="bg-white rounded-2xl p-6 mx-auto w-[90%] sm:w-[500px] max-h-[90vh] overflow-y-auto">
          <DialogTitle className="text-2xl font-bold mb-6">
            Request Payout
          </DialogTitle>

          <div className="space-y-6">
            {/* Available Balance */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Available Balance</p>
              <p className="text-2xl font-bold text-[#6C35A7]">NGN {balance}</p>
            </div>

            {/* Withdraw Amount */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Withdraw Amount
              </label>
              <input
                type="number"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
                placeholder="Enter amount"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6C35A7]"
                max={balance || 0}
              />
            </div>

            {/* Bank Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Bank
              </label>
              <select
                value={selectedBank?.code || ""}
                onChange={(e) => {
                  const bank = banks.find((b) => b.code === e.target.value);
                  setSelectedBank(bank || null);
                  setAccountVerified(false);
                  setNameMatchVerified(false);
                  setAccountName("");
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6C35A7]"
              >
                <option value="">Choose a bank</option>
                {banks.map((bank) => (
                  <option key={bank.code} value={bank.code}>
                    {bank.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Account Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Account Number
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={accountNumber}
                  onChange={(e) => {
                    setAccountNumber(e.target.value);
                    setAccountVerified(false);
                    setNameMatchVerified(false);
                    setAccountName("");
                  }}
                  placeholder="Enter account number"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6C35A7]"
                />
                <button
                  onClick={handleVerifyAccount}
                  disabled={
                    !selectedBank || !accountNumber || isVerifyingAccount
                  }
                  className="px-4 py-2 bg-[#6C35A7] text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isVerifyingAccount ? "Verifying..." : "Verify"}
                </button>
              </div>
            </div>

            {/* Account Name */}
            {accountVerified && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Account Name
                </label>
                <input
                  type="text"
                  value={accountName}
                  readOnly
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                />
                <div className="flex items-center gap-2 mt-2">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      accountVerified ? "bg-green-500" : "bg-gray-300"
                    }`}
                  ></div>
                  <span className="text-sm text-green-600">
                    Account verified
                  </span>
                </div>
                {nameMatchVerified && (
                  <div className="flex items-center gap-2 mt-1">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="text-sm text-green-600">
                      Name verification passed
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <button
                onClick={handleCloseModal}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitPayout}
                disabled={
                  !accountVerified ||
                  !nameMatchVerified ||
                  isProcessingPayout ||
                  !withdrawAmount
                }
                className="flex-1 px-4 py-2 bg-[#6C35A7] text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessingPayout ? "Processing..." : "Submit Payout"}
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
