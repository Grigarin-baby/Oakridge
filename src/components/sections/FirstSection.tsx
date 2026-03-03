import React, { useState, useEffect } from "react";
import Image from "next/image";
import { FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";
import Button from "@/components/common/Button";
import Heading from "@/components/common/Heading";
import TextLabel from "@/components/common/TextLabel";
import SubText from "@/components/common/SubText";
import Navbar from "@/components/Navbar";

export default function FirstSection() {
  const [showImageAnimation, setShowImageAnimation] = useState(false);

  useEffect(() => {
    // Add a small delay before showing the image animation
    const timer = setTimeout(() => {
      setShowImageAnimation(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="home" className="relative h-screen overflow-hidden">
      {/* Background Image */}
      <div
        className={`absolute inset-0 hero-image-container ${
          showImageAnimation ? "animate" : ""
        }`}
      >
        {/* Desktop background */}
        <Image
          src="/images/Oakridge.png"
          alt="Campus"
          fill
          className="object-cover object-center hidden md:block"
          priority
          sizes="100vw"
        />
        {/* Mobile background */}
        <Image
          src="/images/Oakridge_mobile.png"
          alt="Campus"
          fill
          className="object-cover object-center md:hidden"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/5" />
      </div>

      {/* Green Overlay with 45-degree cut */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-green-700 clip-hero" />
      </div>

      {/* Content Area */}
      <div className="relative z-10 h-full flex items-center">
        {/* Left Content */}
        <div className="w-[45%] relative z-10 flex items-center px-5 md:px-[90px]">
          <div className="hero-text-animate">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-4"
            >
              <TextLabel
                text="Welcome to Oakridge College"
                color="white"
                variant="tag"
                className="bg-white/20 px-4 py-2 rounded-full inline-block"
              />
            </motion.div>
            <Heading
              text={
                <>
                  Empowering Minds,
                  <br />
                  Shaping Futures
                </>
              }
              color="gradient"
              delay={0.2}
            />
            <SubText
              text="Join a community dedicated to academic excellence, innovation, and personal growth. Discover your potential at Oakridge College."
              color="light"
              size="large"
              className="mb-8"
              delay={0.4}
              maxWidth="500px"
            />
            <motion.div
              className="flex md:gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              {/* Desktop Apply Button with beam */}
              <div className="beam-border-wrapper hidden md:block rounded-lg">
                <Button
                  variant="primary"
                  href="#"
                  className="bg-transparent text-green-600 border-0 hover:bg-green-50/10"
                >
                  <TextLabel text="Apply Now" variant="primary" color="green" />
                </Button>
              </div>
              {/* Mobile Apply Button with beam */}
              <div className="beam-border-wrapper md:hidden rounded-lg mr-5">
                <Button
                  variant="primary"
                  href="#"
                  className="bg-transparent text-green-600 border-0 hover:bg-green-50/10 flex justify-center items-center w-[100px]"
                >
                  <TextLabel text="Apply" variant="primary" color="green" />
                </Button>
              </div>
              <Button
                variant="secondary"
                href="/programmes"
                className="bg-transparent text-green-600 border-2 border-green-600 hover:bg-green-50 hidden md:flex"
              >
                <TextLabel
                  text="Explore Programs"
                  variant="primary"
                  color="white"
                />
              </Button>
              <Button
                variant="secondary"
                href="/programmes"
                className=" bg-transparent text-green-600 border-2 border-green-600 hover:bg-green-50 flex justify-center items-center md:hidden w-[100px]"
              >
                <TextLabel text="Explore" variant="button" color="green" />
              </Button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Navbar */}
      <Navbar />
    </section>
  );
}
