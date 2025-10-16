import Link from "next/link";
import React from "react";
import { RightArrowCircle } from "../Icons";

const CallToAction = () => {
  return (
    <div>
      <section className="py-6 md:py-10 px-6 md:px-12 bg-[#FFB049] text-start overflow-y-hidden md:overflow-y-visible my-4 mx-4 md:my-10 md:mx-24 rounded-2xl flex flex-col md:flex-row items-center justify-between h-80  ">
        <div className=" mx-auto">
          <h1 className="text-[26px] lg:text-[38px] leading-[42px] md:leading-[50px] font-bold text-white mb-4 max-w-[598px] mx-auto">
            Get Started Today and unlock a new stream of customers
          </h1>
          <div className="flex flex-col sm:flex-row justify-start gap-4">
            <Link href="/signup">
              <button className="bg-[#6C35A7] text-white font-medium py-3 px-6 rounded-full hover:bg-opacity-90 transition flex items-center justify-center gap-2">
                Get your booking site today
               <RightArrowCircle />
              </button>
            </Link>
          </div>
        </div>

        <div>
          <img
            src="/Artboard.svg"
            alt="cta illustration"
            className="mt-6  mx-auto "
          />
        </div>
      </section>
    </div>
  );
};

export default CallToAction;
