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
    <section className="min-h-screen flex flex-col justify-center pt-42 pb-20">
      <div className="flex flex-col items-center text-center px-6 md:px-18 lg:px-26">
        {/* 3️⃣ Animate the text container with variants + stagger */}
        <motion.div
          className="max-w-[618px] flex flex-col gap-3 md:gap-5 items-center"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.2 } },
          }}
          initial="hidden"
          animate="show"
        >
          {/* Heading */}
          <motion.h1
        className="text-[27px] sm:text-[45px] md:text-[42px] lg:text-[48px] xl:text-[46px] max-w-5xl font-bold text-[#6C35A7] leading-[1.2] sm:leading-[1.15] md:leading-[1.1] lg:leading-[1.05] xl:leading-[1]"
        variants={heroVariants}
        transition={{ duration: 0.6 }}
      >
        Empowering vendors! <br />
        Create, share, and get booked instantly.
      </motion.h1>

          {/* Paragraph */}
          <motion.p
            className="font-medium leading-[30px] md:leading-[40px] text-[17px] md:text-[24px]"
            variants={heroVariants}
            transition={{ duration: 0.6 }}
          >
            Showcase your expertise online, making it simple for customers to
            instantly access your service details
          </motion.p>

          {/* Buttons */}
          <motion.div
            className="flex gap-3 text-[14px] md:text-[15px] font-medium mt-4 md:mt-0"
            variants={heroVariants}
            transition={{ duration: 0.6 }}
          >
            <Link href="/signup">
              <button className="bg-[#FFB049] rounded-full py-3 px-6 md:w-[137px]">
                Create Account
              </button>
            </Link>
            <Link href="/login">
              <button className="bg-[#6C35A7] text-white rounded-full py-3 px-6 md:w-[137px]">
                Log In
              </button>
            </Link>
          </motion.div>
        </motion.div>

        {/* 4️⃣ Animate the phone image */}
        <MotionImage
          src="/images/phone.png"
          alt="Nex Bookings mockup"
          width={400}
          height={550}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="mt-10 max-w-full h-auto"
        />
      </div>
    </section>
  );
};

export default Hero;
