"use client";
import { motion } from "framer-motion";
import CallToAction from "@/components/landing/CallToAction";
import FastOperations from "@/components/landing/FastOperations";
import Footer from "@/components/Footer";
import Hero from "@/components/landing/Hero";
import Navbar from "@/components/Navbar";
import SimplifyBookings from "@/components/landing/SimplifyBookings";
import Testimonials from "@/components/landing/Testimonial";
import FAQ from "@/components/landing/FAQ";
import { useRedirectIfAuthenticated } from "@/hooks/useRedirectIfAuthenticated";

// Define animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function Landing() {
  useRedirectIfAuthenticated();
  return (
    <div>
      {/* Navbar slides down */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <Navbar />
      </motion.div>

      {/* Hero fades in */}
      <motion.div variants={fadeInUp} initial="hidden" animate="visible">
        <Hero />
      </motion.div>

      {/* Fast operations with staggered children */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.2 } },
        }}
      >
        <FastOperations />
      </motion.div>

    
      <SimplifyBookings />
      <Testimonials />
      <FAQ />

      {/* Call to action pulses in */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 10 }}
      >
        <CallToAction />
      </motion.div>

      {/* Footer fades up */}
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.3 }}
      >
        <Footer />
      </motion.div>
    </div>
  );
}
