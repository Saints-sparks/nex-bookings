"use client";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const SimplifyBookings = () => {
  return (
    <section className="bg-[#ffff] py-10 md:py-15 px-4 xl:px-[150px]">
      <div className="text-center max-w-5xl mx-auto">
        <h1 className="font-bold text-[25px] md:text-[42px] text-[#6C35A7] leading-[45px] md:leading-[100%]">
          Simplify How You Handle Bookings
        </h1>
        <p className="leading-[30px] md:leading-[42px] font-medium text-[15px] text-center md:text-[19px] mt-2 max-w-3xl mx-auto">
          No more juggling WhatsApp messages or missed calls. Get a smart
          booking page that automates scheduling, payments, and reminders for
          free.
        </p>
      </div>

      <div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 mt-8">
  <div className="bg-white p-4 rounded-[20px] border border-solid border-[#E1E1E1]/50">
    <img
      src="/akar-icons_schedule.svg"
      alt="Booking page"
      className="w-8 h-8 mb-4"
    />
    <h3 className="font-bold text-lg text-[#6C35A7]">
      Free Professional Booking Page
    </h3>
    <p className="mt-2 text-[17px] text-black">
      Make it easy for clients to view your offerings, check availability, and book in seconds.
    </p>
  </div>

  <div className="bg-white p-4 rounded-[20px] border border-solid border-[#E1E1E1]/50">
    <img
      src="/category-2.svg"
      alt="Booking page"
      className="w-8 h-8 mb-4"
    />
    <h3 className="font-bold text-lg text-[#6C35A7]">
      List Unlimited Services
    </h3>
    <p className="mt-2 text-[17px] text-black">
      Add as many services as you want for free and keep growing your offerings.
    </p>
  </div>

  <div className="bg-white p-4 rounded-[20px] border border-solid border-[#E1E1E1]/50">
    <img
      src="/notification.svg"
      alt="Booking page"
      className="w-8 h-8 mb-4"
    />
    <h3 className="font-bold text-lg text-[#6C35A7]">
      Prompt Notification
    </h3>
    <p className="mt-2 text-[17px] text-black">
      Get free instant WhatsApp and Email alerts the moment a client books your service.
    </p>
  </div>

  <div className="bg-white p-4 rounded-[20px] border border-solid border-[#E1E1E1]/50">
    <img
      src="/moneys.svg"
      alt="Booking page"
      className="w-8 h-8 mb-4"
    />
    <h3 className="font-bold text-lg text-[#6C35A7]">
      Upfront Payment
    </h3>
    <p className="mt-2 text-[17px] text-black">
      No delays. Clients pay while booking, so you receive payment for your service right away.
    </p>
  </div>

  <div className="bg-white p-4 rounded-[20px] border border-solid border-[#E1E1E1]/50">
    <img
      src="/task-square.svg"
      alt="Booking page"
      className="w-8 h-8 mb-4"
    />
    <h3 className="font-bold text-lg text-[#6C35A7]">
      Access to Booking Records
    </h3>
    <p className="mt-2 text-[17px] text-black">
      Track every booking with a clear record for easy management, all in one place.
    </p>
  </div>

  <div className="bg-white p-4 rounded-[20px] border border-solid border-[#E1E1E1]/50">
    <img
      src="/trend-up.svg"
      alt="Booking page"
      className="w-8 h-8 mb-4"
    />
    <h3 className="font-bold text-lg text-[#6C35A7]">
      Free Access to Insights & Analytics
    </h3>
    <p className="mt-2 text-[17px] text-black">
      Monitor your business growth with free, easy-to-read stats on your dashboard.
    </p>
  </div>
</div>

      </div>
    </section>
  );
};

export default SimplifyBookings;
