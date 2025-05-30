"use client"; // 1️⃣ Mark as client component
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

// 2️⃣ Create a motion‑wrapped version of Next’s Image
const MotionImage = motion(Image);

const heroVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const Hero = () => {
  return (
    <section className="md:h-screen flex flex-col justify-end">
      <div className="flex-1 xl:flex-none flex flex-col md:flex-row items-center md:justify-between px-4 md:px-18 lg:px-26 mt-20 md:mt-0">
        {/* 3️⃣ Animate the text container with variants + stagger */}
        <motion.div
          className="max-w-[618px] flex flex-col gap-3 md:gap-5"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.2 } },
          }}
          initial="hidden"
          animate="show"
        >
          {/* Heading */}
          <motion.h1
            className="text-[25px] md:text-[42px] font-bold text-[#6C35A7] leading-[45px] md:leading-[100%]"
            variants={heroVariants}
            transition={{ duration: 0.6 }}
          >
            Empowering vendors! <br />
            Create, share, and get booked instantly.
          </motion.h1>

          {/* Paragraph */}
          <motion.p
            className="font-medium leading-[30px] md:leading-[40px] text-[15px] md:text-[19px]"
            variants={heroVariants}
            transition={{ duration: 0.6 }}
          >
            Showcase your expertise online, making it simple for customers to
            instantly access your service details
          </motion.p>

          {/* Buttons */}
          <motion.div
            className="w-full flex gap-3 text-[14px] md:text-[15px] font-medium mt-4 md:mt-0"
            variants={heroVariants}
            transition={{ duration: 0.6 }}
          >
            <Link
              href="https://nex-bookings.vercel.app/signup"
              className="w-1/2 md:w-auto"
            >
              <button className="bg-[#FFB049] rounded-full py-3 w-full md:w-[137px]">
                Create Account
              </button>
            </Link>
            <Link
              href="https://nex-bookings.vercel.app/"
              className="w-1/2 md:w-auto"
            >
              <button className="bg-[#6C35A7] text-white rounded-full w-full py-3 md:w-[137px]">
                Log In
              </button>
            </Link>
          </motion.div>
        </motion.div>

        {/* 4️⃣ Animate the phone image */}
        <MotionImage
          src="/images/phone.png"
          alt="Nex Bookings mockup"
          width={524}
          height={725}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="mt-10 md:mt-0"
        />
      </div>
    </section>
  );
};

export default Hero;
