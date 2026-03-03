"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Button from "@/components/common/Button";
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import Heading from "@/components/common/Heading";
import SubHeading from "@/components/common/SubHeading";
import FirstSection from "@/components/sections/FirstSection";
import SecondSection from "@/components/sections/SecondSection";
import ThirdSection from "@/components/sections/ThirdSection";
import FourthSection from "@/components/sections/FourthSection";
import FifthSection from "@/components/sections/FifthSection";
import LoadingAnimation from "@/components/animations/LoadingAnimation";
import bookAnimation from "../../public/images/book.json";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const galleryRef = useRef(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [imageScales, setImageScales] = useState<Record<number, number>>({});
  const [imageLoadingStates, setImageLoadingStates] = useState<
    Record<number, boolean>
  >({});
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isLoading) return; // Don't scroll while the page is still in its loading state

    const scrollTimeout = setTimeout(() => {
      if (window.location.hash) {
        const id = window.location.hash.substring(1); // remove the '#'
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }
    }, 300); // Increased timeout for more reliable scrolling after layout settles

    return () => clearTimeout(scrollTimeout);
  }, [isLoading]);

  const handleImageLoad = (index: number) => {
    setImageLoadingStates((prev) => ({ ...prev, [index]: false }));
    setImageErrors((prev) => ({ ...prev, [index]: false }));
  };

  const handleImageError = (index: number) => {
    setImageLoadingStates((prev) => ({ ...prev, [index]: false }));
    setImageErrors((prev) => ({ ...prev, [index]: true }));
  };

  return (
    <>
      {isLoading && <LoadingAnimation />}
      <div className="flex flex-col min-h-screen">
        <FirstSection />

        <SecondSection
          galleryRef={galleryRef}
          imageRefs={imageRefs}
          imageScales={imageScales}
          bookAnimation={bookAnimation}
          imageLoadingStates={imageLoadingStates}
          imageErrors={imageErrors}
          handleImageLoad={handleImageLoad}
          handleImageError={handleImageError}
        />

        <ThirdSection />

        <FourthSection />

        <FifthSection />
      </div>
    </>
  );
}
