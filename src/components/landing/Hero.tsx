"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { RightArrowCircle } from "../Icons";

const MotionImage = motion(Image);

const heroVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const Hero = () => {
  return (
    <section
      className="relative h-screen flex flex-col justify-center pt-50 md:pt-100 overflow-hidden pb-0 md:pb-auto"
      // gentle gradient: white -> soft purple at the bottom
      style={{
        background:
          "linear-gradient(180deg, #ffffff 0%, #F5E7FF 70%, #EFE8FF 100%)",
      }}
    >
      

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

      {/* Intersection circles (top-left & top-right) */}
      {/* These sit where the top horizontal dotted line crosses the left/right vertical dotted lines */}
      <div
        aria-hidden="true"
        className="absolute top-30 left-[5%] z-20 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-[16px] h-[16px] sm:w-[20px] sm:h-[20px] rounded-full bg-white"
        style={{
          boxShadow:
            "inset 0 -1px 4px rgba(0,0,0,0.2), 0 3px 4px rgba(0,0,0,0.15)",
        }}
      >
        <div
          aria-hidden="true"
          className="rounded-full w-[8px] h-[8px] sm:w-[10px] sm:h-[10px]"
          style={{
            background: "linear-gradient(180deg, #DCDCDC 0%, #8F8F8F 100%)",
          }}
        />
      </div>

      <div
        aria-hidden="true"
        className="absolute top-30 right-[5%] z-20 translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-[16px] h-[16px] sm:w-[20px] sm:h-[20px] rounded-full bg-white"
        style={{
          boxShadow:
            "inset 0 -1px 4px rgba(0,0,0,0.2), 0 3px 4px rgba(0,0,0,0.15)",
        }}
      >
        <div
          aria-hidden="true"
          className="rounded-full w-[8px] h-[8px] sm:w-[10px] sm:h-[10px]"
          style={{
            background: "linear-gradient(180deg, #DCDCDC 0%, #8F8F8F 100%)",
          }}
        />
      </div>

      <div className="relative flex flex-col items-center text-center px-6 md:px-18 lg:px-26 z-0">
        <motion.div
          className="max-w-[1000px] flex flex-col gap-3 md:gap-5 items-center"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.2 } },
          }}
          initial="hidden"
          animate="show"
        >
          <motion.h1
            className="text-[27px] sm:text-[45px] md:text-[38px] lg:text-[48px] xl:text-[46px]  font-bold text-[#6C35A7] leading-[1.2] sm:leading-[1.15] md:leading-[1.1] lg:leading-[1.05] xl:leading-[1]"
            variants={heroVariants}
            transition={{ duration: 0.6 }}
          >
            Empowering vendors! <br />
            Create, share, and get booked instantly.
          </motion.h1>

          <motion.p
            className="font-medium leading-[30px] md:leading-[40px] text-[17px] md:text-[20px] lg:text-[24px] max-w-[618px]"
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
              <button className="bg-[#6C35A7] text-white font-medium h-full px-6 rounded-full hover:bg-opacity-90 transition flex items-center justify-center gap-2">
                Create Account
                <RightArrowCircle />
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

      {/* HERO IMAGE */}
      <div className="relative flex justify-center md:mt-10 px-[8%] w-full">
        {/* outer wrapper:
            - mobile: overflow-hidden  => will clip the pushed image bottom (the "cut off" you want)
            - md+:   overflow-visible => lets large shadows extend left without being clipped
        */}
        <div className="relative w-full max-w-[918px] mx-auto overflow-hidden md:overflow-visible">
          {/* SVG defs (unchanged) */}
          <svg
            aria-hidden="true"
            width="0"
            height="0"
            style={{ position: "absolute", left: 0, top: 0 }}
          >
            <defs>
              <filter
                id="azureMultiShadow"
                x="-300%"
                y="-300%"
                width="600%"
                height="600%"
                colorInterpolationFilters="sRGB"
                filterUnits="objectBoundingBox"
              >
                <feDropShadow
                  dx="-17.28"
                  dy="11.52"
                  stdDeviation="23.525"
                  floodColor="#00459E"
                  floodOpacity="0.10"
                />
                <feDropShadow
                  dx="-71.05"
                  dy="48.01"
                  stdDeviation="42.725"
                  floodColor="#00459E"
                  floodOpacity="0.09"
                />
                <feDropShadow
                  dx="-159.38"
                  dy="107.54"
                  stdDeviation="57.61"
                  floodColor="#00459E"
                  floodOpacity="0.05"
                />
                <feDropShadow
                  dx="-283.24"
                  dy="191.07"
                  stdDeviation="68.17"
                  floodColor="#00459E"
                  floodOpacity="0.01"
                />
                <feDropShadow
                  dx="-442.63"
                  dy="297.65"
                  stdDeviation="74.89"
                  floodColor="#00459E"
                  floodOpacity="0.00"
                />
              </filter>
            </defs>
          </svg>

          {/* this wrapper gets the filter; heights remain responsive */}
          <div
            className="relative w-full h-[300px] sm:h-[320px] md:h-[400px] lg:h-[500px] xl:h-[577px] flex justify-center items-center"
            style={{
              filter: "url(#azureMultiShadow)",
              WebkitFilter: "url(#azureMultiShadow)",
            }}
          >
            {/* inner clip container keeps the content area; outer wrapper controls clipping on mobile */}
            <div className="relative w-full h-full overflow-hidden">
              <MotionImage
                src="/group1.png"
                alt="Nex Bookings mockup"
                fill
                // NOTE: use CSS translate for mobile push; remove y from Framer to avoid conflicts
                style={{ objectFit: "contain" }}
                // translate-y-12 on mobile, reset on md+; tweak 12 -> 8/16 to adjust distance
                className="w-full h-full translate-y-12 md:translate-y-0"
                initial={{ opacity: 0, scale: 0.9 }} // removed y
                animate={{ opacity: 1, scale: 1 }} // removed y
                transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
