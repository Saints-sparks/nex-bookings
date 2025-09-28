"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const MotionImage = motion(Image);

const heroVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const Hero = () => {
  return (
    <section className="relative min-h-screen flex flex-col justify-center pt-50 overflow-hidden pb-0 md:pb-auto">
      {/* Background Gradient Element */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 rounded-full z-0"
        style={{
          width: "1440px",
          height: "490px",
          background:
            "linear-gradient(90deg, #6C35A7 0%, #D9B6FF 20%, #E085FE 40%, #FDD29A 60%, #EFE8B3 100%)",
          opacity: 0.2,
          filter: "blur(120px)",
        }}
      />

      {/* Dotted Lines */}
      {/* Top horizontal dotted line */}
      <div
        className="absolute top-30 left-1/2 -translate-x-1/2 w-full h-[1px]
                  bg-[repeating-linear-gradient(to_right,rgba(0,0,0,0.16)_0,rgba(0,0,0,0.16)_8px,transparent_8px,transparent_16px)]"
      />

      {/* Left */}
      <div
        className="absolute top-0 left-[5%] h-full w-[1px]
                   bg-[repeating-linear-gradient(to_bottom,rgba(0,0,0,0.16)_0,rgba(0,0,0,0.16)_8px,transparent_8px,transparent_16px)]"
      />

      {/* Right */}
      <div
        className="absolute top-0 right-[5%] h-full w-[1px]
                    bg-[repeating-linear-gradient(to_bottom,rgba(0,0,0,0.16)_0,rgba(0,0,0,0.16)_8px,transparent_8px,transparent_16px)]"
      />

      <div className="relative flex flex-col items-center text-center px-6 md:px-18 lg:px-26 z-0">
        <motion.div
          className="max-w-[618px] flex flex-col gap-3 md:gap-5 items-center"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.2 } },
          }}
          initial="hidden"
          animate="show"
        >
          <motion.h1
            className="text-[27px] sm:text-[45px] md:text-[38px] lg:text-[48px] xl:text-[46px] max-w-5xl font-bold text-[#6C35A7] leading-[1.2] sm:leading-[1.15] md:leading-[1.1] lg:leading-[1.05] xl:leading-[1]"
            variants={heroVariants}
            transition={{ duration: 0.6 }}
          >
            Empowering vendors! <br />
            Create, share, and get booked instantly.
          </motion.h1>

          <motion.p
            className="font-medium leading-[30px] md:leading-[40px] text-[17px] md:text-[20px] lg:text-[24px]"
            variants={heroVariants}
            transition={{ duration: 0.6 }}
          >
            Showcase your expertise online, making it simple for customers to
            instantly access your service details
          </motion.p>

          <motion.div
            className="flex gap-3 text-[14px] md:text-[15px] font-medium mt-4 md:mt-0"
            variants={heroVariants}
            transition={{ duration: 0.6 }}
          >
            <Link href="/signup">
              <button className="bg-[#6C35A7] text-white font-medium py-3 px-6 rounded-full hover:bg-opacity-90 transition flex items-center justify-center gap-2">
                Create Account
                <img
                  src="/Group 2u.svg"
                  alt="arrow right"
                  className="inline-block"
                />
              </button>
            </Link>

            <Link href="/login">
              <button className="bg-[#FFB049] text-white rounded-full py-3 px-6 md:w-[137px] w-[137px]">
                Log In
              </button>
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Hero Image Container - Responsive and contained within dotted lines */}
      <div className="relative flex justify-center mt-10 px-[5%] w-full">
        <div className="relative w-full max-w-[917px] aspect-[917/576]">
          <MotionImage
            src="/Group 1.png"
            alt="Nex Bookings mockup"
            fill
            style={{ objectFit: "contain" }}
            className="w-full h-full"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
