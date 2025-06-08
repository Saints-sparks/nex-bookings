"use client";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const FastOperations = () => {

  const MotionImage = motion(Image, { forwardMotionProps: true });

const slideVariants = {
  enter: { opacity: 0, scale: 0.95 },
  center: { opacity: 1, scale: 1 },
  exit:  { opacity: 0, scale: 1.05 },
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
      <div className="mt-8 grid grid-cols-1 md:grid-cols-7 gap-4">
        <div className="relative group overflow-hidden rounded-xl w-full md:col-span-3 h-[236px] md:h-[313px]">
          {/* Image */}
          <AnimatePresence initial={false} mode="wait">
            <motion.div
              key={slides[current]}
              className="absolute inset-0"
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5 }}
            >
              <MotionImage
                src={slides[current]}
                alt={`Slide ${current + 1}`}
                fill
                style={{ objectFit: 'cover', borderRadius: '0.75rem' }}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        <div
          className="relative group overflow-hidden rounded-xl w-full md:col-span-4 h-[299px] md:h-[313px]" // Reduced height
        >
          {/* Image */}
          <Image
            src="/images/fast1.png"
            alt="Phone"
            width={503}
            height={313}
            className="w-full h-full object-cover rounded-xl transition-transform duration-300 "
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/60 flex flex-col md:flex-row md:items-center justify-between md:justify-center gap-2 md:gap-10 px-6 md:px-4 ">
            <h3 className="text-white font-bold md:max-w-[251px] text-[20px] md:text-[26px] mt-4">
              Create & Share your Services Instantly
            </h3>
            <Image
              src="/images/iphone1.png"
              alt="Phone"
              width={242}
              height={490}
              className="self-center md:self-end"
            />
          </div>
        </div>

        <div
          className="relative group overflow-hidden rounded-xl w-full md:col-span-4 h-[299px] md:h-[313px]" // Reduced height
        >
          {/* Image */}
          <Image
            src="/images/fast2.png"
            alt="Phone"
            width={503}
            height={313}
            className="w-full h-full object-cover rounded-xl transition-transform duration-300 group-hover:scale-105"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/60 flex flex-col md:flex-row md:items-center justify-between md:justify-center gap-2 md:gap-10 px-6 md:px-4 ">
            <h3 className="text-white font-bold md:max-w-[251px] text-[20px] md:text-[26px] mt-4 md:mt-0">
              Share Custom Website Anywhere For Bookings
            </h3>
            <Image
              src="/images/iphone2.png"
              alt="Phone"
              width={242}
              height={490}
              className="self-center md:self-end"
            />
          </div>
        </div>

        <div className="relative group overflow-hidden rounded-xl w-full md:col-span-3 h-[299px] md:h-[313px]">
          {/* Image */}
          <Image
            src="/images/fast3.png"
            alt="Phone"
            width={503}
            height={313}
            className="w-full h-full object-cover rounded-xl transition-transform duration-300 "
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/60 flex flex-col md:flex-row md:items-center justify-between md:justify-center gap-2 md:gap-10 px-6 md:px-4 ">
            <h3 className="text-white font-bold md:max-w-[251px] text-[20px] md:text-[26px] mt-4 md:mt-0">
              Receive Instant Bookings Alerts
            </h3>
            <Image
              src="/images/iphone3.png"
              alt="Phone"
              width={242}
              height={490}
              className="self-center md:self-end md:h-[290px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FastOperations;
