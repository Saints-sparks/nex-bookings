import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "res.cloudinary.com", // allow Cloudinary URLs
      // add any other external hosts here
    ],
  },
  /* config options here */
};

export default nextConfig;
