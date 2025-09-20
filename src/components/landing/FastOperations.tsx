"use client";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const FastOperations = () => {
  const MotionImage = motion(Image, { forwardMotionProps: true });

  const slideVariants = {
    enter: { opacity: 0, scale: 0.95 },
    center: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 1.05 },
  };

  const slides = [
    "/images/image1.png",
    "/images/image2.png",
    "/images/image3.png",
    "/images/image4.png",
    "/images/image5.png",
  ];

  const [current, setCurrent] = useState(0);

  // advance slides every 3s
  useEffect(() => {
    const iv = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(iv);
  }, [slides.length]);

  return (
    <section className="bg-[#F2F2F2] py-10 md:py-15 px-4 xl:px-[150px]">
      <div className="text-center">
        <h1 className="font-bold text-[25px] md:text-[42px] text-[#6C35A7] leading-[45px] md:leading-[100%]">
          Designed For Fast Operations
        </h1>
        <p className="leading-[30px] md:leading-[42px] font-medium text-[15px] md:text-[19px] mt-2">
          Manage your entire digital process From your browser
        </p>
      </div>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-6 gap-4">
        <div className="relative group overflow-hidden bg-[#FFB04933] rounded-xl h-[313px] col-span-1 md:col-span-2 align-middle flex justify-center items-end">
          {/* First div (1 of 3) */}
          <img src="/images/iphone1.png" alt="Fast Operations 1" />
        </div>

        <div className="relative group bg-[#6C35A7] overflow-hidden p-6 sm:p-8 md:p-6 lg:p-8 rounded-xl h-full sm:h-[250px] md:h-[313px] col-span-1 md:col-span-2 flex flex-col justify-end items-start md:items-center text-left md:text-start">
          <div className="flex flex-col items-start w-full">
            <img
              src="/category-2.svg"
              alt="Link Icon"
              width={24}
              height={24}
              className="mb-4"
            />
            <h3 className="text-white font-bold text-xl sm:text-2xl md:text-2xl lg:text-[26px] mb-2">
              Create & Share your Services Instantly for Free
            </h3>
            <p className="text-white font-medium text-sm sm:text-base md:text-[16px] lg:text-[17px] max-w-full">
              List your services and make them accessible to anyone, anytime,
              anywhere at no cost.
            </p>
          </div>
        </div>

        <div
          className="relative group overflow-hidden rounded-xl h-[313px] col-span-1 md:col-span-2 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('/images/Pot.png')` }}
        >
          {/* Your content here */}
        </div>

        <div className="relative group overflow-hidden rounded-xl col-span-1 md:col-span-3 h-[399px] md:h-[460px] lg:h-[313px]">
          {/* Fourth div (1 of 2) */}
          <Image
            src="/images/image 221.png"
            alt="Phone"
            width={503}
            height={313}
            className="absolute inset-0 w-full h-full object-cover rounded-xl transition-transform duration-300 group-hover:scale-105"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/60 flex flex-col lg:flex-row lg:gap-20 lg:items-center md:flex-col justify-between md:justify-center gap-4 md:gap-12 px-4 md:px-4 lg:pt-10 md:pt-24 ">
            <div className="flex flex-col items-start mt-6 md:mt-0">
              <img src="/global.svg" alt="Link Icon" width={24} height={24} />
              <h3 className="text-white font-bold text-[20px] md:text-[26px] mt-4 md:mt-4 md:max-w-full">
                Share Custom Website Anywhere For Bookings
              </h3>
              <p className="text-white font-medium text-[16px] md:text-[17px] mt-2 max-w-[250px] md:max-w-full">
                One link, endless opportunities — share your services instantly.
              </p>
            </div>
            <Image
              src="/images/iphone2.png"
              alt="Phone"
              width={242}
              height={490}
              className="self-center md:center lg:self-end "
            />
          </div>
        </div>

        <div className="relative group overflow-hidden rounded-xl col-span-1 md:col-span-3 h-[399px] md:h-[460px] lg:h-[313px]">
          {/* Fourth div (2 of 2) */}
          <Image
            src="/images/fast3.png"
            alt="Phone"
            width={503}
            height={313}
            className="absolute inset-0 w-full h-full object-cover rounded-xl transition-transform duration-300 group-hover:scale-105"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/60 flex flex-col lg:flex-row lg:gap-20 lg:items-center md:flex-col justify-between md:justify-center gap-4 md:gap-12 px-4 md:px-4 lg:pt-10 md:pt-24 ">
            <div className="flex flex-col items-start mt-6 md:mt-0">
              <img
                src="/sms-notification.svg"
                alt="Link Icon"
                width={24}
                height={24}
              />
              <h3 className="text-white font-bold text-[20px] md:text-[26px] mt-4 md:mt-4 md:max-w-full">
                Receive Instant Booking Alerts for Free
              </h3>
              <p className="text-white font-medium text-[16px] md:text-[17px] mt-2 max-w-[250px] md:max-w-full">
                Never miss a booking — get alerts the moment clients confirm.
              </p>
            </div>
            <Image
              src="/images/iphone3.png"
              alt="Phone"
              width={242}
              height={490}
              className="self-center md:center lg:self-end "
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FastOperations;
