import type { Metadata } from "next";
import { Alegreya_Sans, Inter } from "next/font/google";
import { Toaster } from 'sonner';
import "./globals.css";

const alegreyaSans = Alegreya_Sans({
  subsets: ["latin"],
  variable: "--font-alegreya",
  weight: ["100", "300", "400", "500", "700", "800", "900"], // all available weights
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["100", "300", "400", "500", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Nex Bookings",
  description: "Discover and Manage Your Bookings with Ease",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${alegreyaSans.variable} ${inter.variable} antialiased`}
      >
        <Toaster richColors position="top-right" />
        {children}
      </body>
    </html>
  );
}
