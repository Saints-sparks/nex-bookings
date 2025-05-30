import Link from "next/link";
import React from "react";

const CallToAction = () => {
  return (
    <section
      className="py-6 md:py-10 px-6 md:px-12 bg-white text-center  bg-[url('/images/cta-bg.png')]
        bg-cover bg-center my-4 mx-4 md:my-10 md:mx-24 rounded-2xl"
    >
      <div className=" mx-auto">
        <h1 className="text-[26px] md:text-[38px] leading-[42px] md:leading-[50px] font-bold text-white mb-4 max-w-[598px] mx-auto">
          Get Started Today and unlock a new stream of customers
        </h1>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href="#">
            <button className="bg-[#6C35A7] text-white font-medium py-3 w-[164px] mx-auto rounded-full hover:bg-opacity-90 transition">
              Create Account
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
