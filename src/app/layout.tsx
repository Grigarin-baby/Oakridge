import React from "react";
import type { Metadata } from "next";
import { Arvo } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";

const arvo = Arvo({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-arvo",
});

export const metadata: Metadata = {
  title: "Oakridge College",
  description: "Empowering Minds, Shaping Futures",
  icons: {
    icon: "/images/Oakridge_logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${arvo.variable}`}>
      <body className={`${arvo.className}`}>
        <div className="vertical-line-left" />
        <div className="vertical-line-right" />
        {children}
        <Footer />
      </body>
    </html>
  );
}
