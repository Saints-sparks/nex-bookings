"use client";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";

const faqData = [
  {
    id: 1,
    question: "How do I get started on Osiso Pro?",
    answer:
      "Getting started is easy! Simply sign up, create your professional booking page, and you are ready to share your services instantly. No technical skills required.",
  },
  {
    id: 2,
    question: "Can I manage all my bookings in one place?",
    answer:
      "Yes! Osiso Pro lets you track, update, and manage all client bookings from your dashboard, keeping everything organized for free.",
  },
  {
    id: 3,
    question: "Can I customise my booking site on my own?",
    answer:
      "Absolutely. Our user-friendly interface allows you to customize your booking site with your brand colors, logo, and service details in just a few clicks.",
  },
  {
    id: 4,
    question: "How do I receive payments for my services?",
    answer:
      "You can link your preferred payment gateway to your booking page to receive payments directly and instantly for every service booked.",
  },
];

const FAQ = () => {
  // Change the initial state from null to 1
  const [openId, setOpenId] = useState<number | null>(1);

  const handleToggle = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  const expandCollapseVariants = {
    open: { height: "auto", opacity: 1 },
    collapsed: { height: 0, opacity: 0 },
  };

  return (
    <section className="bg-[#ffff] py-10 md:py-15 px-4 xl:px-[150px]">
      <div>
        <div className="text-center max-w-5xl mx-auto">
          <h1 className="font-bold text-[25px] md:text-[42px] text-[#6C35A7] leading-[45px] md:leading-[100%]">
            Frequently Asked Questions
          </h1>
          <p className="leading-[30px] md:leading-[42px] font-medium text-[15px] text-center md:text-[19px] mt-2 max-w-3xl mx-auto">
            Everything you need to know to get started with ease.
          </p>
        </div>

        <div className="max-w-5xl mx-auto pt-8">
          {faqData.map((item) => (
            <div
              key={item.id}
              className={`border-b border-solid border-[#E1E1E1]/50 py-8 cursor-pointer overflow-hidden ${
                openId === item.id ? "bg-gray-100 rounded-xl px-4" : ""
              }`}
            >
              <div
                className="flex justify-between items-center"
                onClick={() => handleToggle(item.id)}
              >
                <h4
                  className={`text-lg md:text-xl font-bold ${
                    openId === item.id ? "text-[#6C35A7]" : "text-black"
                  }`}
                >
                  0{item.id}
                </h4>
                <h1 className={`font-medium ${openId === item.id ? "text-[#6C35A7]" : "text-black"}`}>
                  {item.question}
                </h1>
                <img
                  src={openId === item.id ? "/close.svg" : "/Add.svg"}
                  alt="toggle icon"
                  className={`transition-transform duration-300 ${
                    openId === item.id ? "rotate-180" : ""
                  }`}
                />
              </div>

              <AnimatePresence>
                {openId === item.id && (
                  <motion.div
                    className="overflow-hidden mt-4"
                    initial="collapsed"
                    animate="open"
                    exit="collapsed"
                    variants={expandCollapseVariants}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="text-sm md:text-base text-black text-center pl-8 pr-4">
                      {item.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;