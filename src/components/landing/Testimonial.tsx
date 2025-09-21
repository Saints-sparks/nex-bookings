"use client";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import React, { useState } from "react";

const testimonials = [
  {
    id: 1,
    quote: "Managing my services and bookings in one place has saved me so much time and stress.",
    author: "Rachael, Lagos",
    company: "Company Name",
    imageSrc: "/vectora.svg",
  },
  {
    id: 2,
    quote: "The custom booking site makes my brand look professional and clients love how simple it is to book me.",
    author: "Peter, Lagos",
    company: "Company Name",
    imageSrc: "/vectora.svg",
  },
  {
    id: 3,
    quote: "With instant booking alerts, I never miss a client. It keeps my schedule perfectly organized.",
    author: "Kemi, Abuja",
    company: "Company Name",
    imageSrc: "/vectora.svg",
  },
  {
    id: 4,
    quote: "Osiso Pro gives me a professional feel for my service, listings, and bookings are all so simple to manage.",
    author: "David, Lagos",
    company: "Company Name",
    imageSrc: "/vectora.svg",
  },
  {
    id: 5,
    quote: "Booking clients has never been easier. My business has grown significantly thanks to this platform.",
    author: "Sarah, Accra",
    company: "Creative Designs",
    imageSrc: "/vectora.svg",
  },
  {
    id: 6,
    quote: "The scheduling tools are intuitive and highly customizable. It's a lifesaver!",
    author: "John, London",
    company: "Global Services",
    imageSrc: "/vectora.svg",
  },
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const numTestimonials = testimonials.length;

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? numTestimonials - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === numTestimonials - 1 ? 0 : prevIndex + 1
    );
  };

  const getTestimonialCard = (offset: number) => {
    const index = (currentIndex + offset + numTestimonials) % numTestimonials;
    const testimonial = testimonials[index];

    if (!testimonial) return null;

    let cardClasses = "p-8 bg-[#F2F2F2] rounded-[20px] h-[383px] w-[350px] md:w-[400px] lg:w-[450px] flex flex-col justify-between mx-auto transition-all duration-300 ease-in-out absolute ";
    let contentClasses = "";

    if (offset === 0) {
      cardClasses += "z-0 scale-100 opacity-100 relative";
    } else if (offset === -1) {
      cardClasses += "z-0 -left-[180px] md:-left-[220px] scale-90 opacity-70 blur-[1px]";
      contentClasses += "text-sm";
    } else if (offset === 1) {
      cardClasses += "z-0 -right-[180px] md:-right-[220px] scale-90 opacity-70 blur-[1px]";
      contentClasses += "text-sm";
    } else {
        return null;
    }

    return (
      <div key={testimonial.id} className={cardClasses}>
        <div>
          <img
            src={testimonial.imageSrc}
            alt="Booking page"
            className="w-16 h-16 mb-4"
          />
          <h3 className={`font-medium text-[20px] md:text-[24px] text-black mb-4 ${contentClasses}`}>
            {testimonial.quote}
          </h3>
        </div>
        <p className={`mt-2 text-[16px] md:text-[18px] font-bold text-[#6C35A7] ${contentClasses}`}>
          {testimonial.author}
        </p>
      </div>
    );
  };

  return (
    <section className="bg-[#ffff] py-10 md:py-15 px-4 xl:px-[150px] relative overflow-hidden">
      <div className="text-center max-w-5xl mx-auto">
        <h1 className="font-bold text-[25px] md:text-[42px] text-[#6C35A7] leading-[45px] md:leading-[100%]">
          Testimonials
        </h1>
        <p className="leading-[30px] md:leading-[42px] font-medium text-[15px] text-center md:text-[19px] mt-2 max-w-3xl mx-auto">
          Real stories from professionals who trust us with their bookings.
        </p>
      </div>

      <div className="relative flex justify-center items-center mt-8 md:mt-16 h-[400px] w-full max-w-[900px] mx-auto">
        {getTestimonialCard(-1)}
        {getTestimonialCard(1)}
        {getTestimonialCard(0)}
      </div>

      <div className="flex justify-center mt-8 space-x-4">
        <button onClick={handlePrev} className="p-3  bg-[#F2F2F2] rounded-2xl hover:bg-gray-200 ">
          <Image src="/Tertiary button.svg" alt="Previous" width={24} height={24} />
          <span className="sr-only">Previous</span>
        </button>
        <button onClick={handleNext} className="p-3  bg-[#F2F2F2] rounded-2xl hover:bg-gray-200">
          <Image src="/Tertiary button1.svg" alt="Next" width={24} height={24} />
          <span className="sr-only">Next</span>
        </button>
      </div>
    </section>
  );
};

export default Testimonials;