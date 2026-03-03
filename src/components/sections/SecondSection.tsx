import React, { MutableRefObject, useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Lottie from 'lottie-react';
import { galleryImages } from '@/constants/galleryData';
import Heading from '@/components/common/Heading';
import SubHeading from '@/components/common/SubHeading';
import SubText from '@/components/common/SubText';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface SecondSectionProps {
  galleryRef: MutableRefObject<null>;
  imageRefs: MutableRefObject<(HTMLDivElement | null)[]>;
  imageScales: Record<number, number>;
  bookAnimation: any;
  imageLoadingStates: Record<number, boolean>;
  imageErrors: Record<number, boolean>;
  handleImageLoad: (index: number) => void;
  handleImageError: (index: number) => void;
}

interface GalleryImage {
  src: string;
  title: string;
  description: string;
}

interface GalleryCardProps {
  image: GalleryImage;
  index: number;
  imageRefs: MutableRefObject<(HTMLDivElement | null)[]>;
  imageScales: Record<number, number>;
  handleImageError: (index: number) => void;
  handleImageLoad: (index: number) => void;
}

export default function SecondSection({
  galleryRef,
  imageRefs,
  imageScales,
  bookAnimation,
  imageLoadingStates,
  imageErrors,
  handleImageError,
  handleImageLoad
}: SecondSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const handlePrevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    const newIndex = currentIndex === 0 ? galleryImages.length - 1 : currentIndex - 1;
    console.log('Previous clicked:', { currentIndex, newIndex });
    setCurrentIndex(newIndex);
    setTimeout(() => setIsAnimating(false), 500); // Match duration with transition
  };

  const handleNextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    const newIndex = currentIndex === galleryImages.length - 1 ? 0 : currentIndex + 1;
    console.log('Next clicked:', { currentIndex, newIndex });
    setCurrentIndex(newIndex);
    setTimeout(() => setIsAnimating(false), 500); // Match duration with transition
  };

  const goToSlide = (index: number) => {
    if (isAnimating) return;
    setIsAnimating(true);
    console.log('Going to slide:', { currentIndex, newIndex: index });
    setCurrentIndex(index);
    setTimeout(() => setIsAnimating(false), 500);
  };

  // Autoplay functionality
  useEffect(() => {
    const autoplayInterval = setInterval(() => {
      if (!isAnimating) {
        handleNextSlide();
      }
    }, 5000);

    return () => clearInterval(autoplayInterval);
  }, [currentIndex, isAnimating]); // Add dependencies to prevent stale closure

  return (
    <section 
      ref={galleryRef}
      className="min-h-screen bg-gradient-to-br from-green-900 via-green-800 to-green-700 flex items-center py-20 relative overflow-hidden"
    >
      <div className="w-full px-4 md:px-[90px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center">
          <div className="lg:col-start-2 px-1">
            <motion.div
              initial={{ 
                opacity: 0,
                y: 100,
                scale: 0.95
              }}
              whileInView={{ 
                opacity: 1,
                y: 0,
                scale: 1
              }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{
                duration: 1.8,
                ease: [0.25, 0.1, 0.25, 1]
              }}
              className="w-full max-w-[800px]"
            >
              <Heading
                text={<>
                  EDUCATION IS NOT<br />
                  PREPARATION FOR LIFE;<br />
                  EDUCATION IS LIFE<br />
                  ITSELF
                </>}
                color="white"
              />
            </motion.div>
          </div>
          <div className="lg:col-start-1 lg:row-start-1">
            <div className="hidden md:block">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1.2 }}
                className="w-full max-w-[500px]"
              >
                <Lottie 
                  animationData={bookAnimation} 
                  loop={true}
                  className="w-full h-full"
                />
              </motion.div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 md:mt-16">
          {/* Desktop Grid View */}
          <div className="hidden md:grid md:grid-cols-3 gap-8 perspective-1000">
            {galleryImages.map((image, index) => (
              <motion.div
                key={index}
                className={`${index === 0 ? 'col-span-2' : 'col-span-1'}`}
                initial={{ 
                  opacity: 0,
                  x: image.title === 'Modern Classrooms' ? -100 : 
                     image.title === 'Library' ? 100 :
                     0,
                  y: image.title !== 'Modern Classrooms' && image.title !== 'Library' ? 20 : 0,
                  scale: image.title === 'Modern Classrooms' || image.title === 'Library' ? 
                         1 : 0.95,
                  rotateX: (image.title === 'Campus View' || image.title === 'Convocation' || image.title === 'Student Life') ? 180 : 0,
                  transformOrigin: (image.title === 'Campus View' || image.title === 'Convocation' || image.title === 'Student Life') ? 'center bottom' : 'center center'
                }}
                whileInView={{ 
                  opacity: 1,
                  x: 0,
                  y: 0,
                  scale: 1,
                  rotateX: 0
                }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{
                  duration: 2,
                  delay: index * 0.4,
                  ease: [0.22, 1, 0.36, 1],
                  opacity: {
                    duration: 1.5,
                    ease: [0.4, 0, 0.2, 1]
                  },
                  scale: {
                    duration: 1.8,
                    ease: [0.25, 0.1, 0.25, 1]
                  },
                  rotateX: {
                    duration: 2.2,
                    ease: [0.22, 1, 0.36, 1]
                  }
                }}
                style={{
                  transformStyle: (image.title === 'Campus View' || image.title === 'Convocation' || image.title === 'Student Life') ? 
                    'preserve-3d' : 'flat'
                }}
              >
                <GalleryCard 
                  image={image} 
                  index={index} 
                  imageRefs={imageRefs} 
                  imageScales={imageScales} 
                  handleImageError={handleImageError} 
                  handleImageLoad={handleImageLoad} 
                />
              </motion.div>
            ))}
          </div>

          {/* Mobile Carousel View */}
          <div className="block md:hidden relative">
            <div className="overflow-hidden h-[600px] sm:h-[800px]">
              <div className="relative h-full">
                {galleryImages.map((image, index) => (
                  <div
                    key={index}
                    className="absolute top-0 left-0 w-full h-full"
                    style={{
                      transform: `translateX(${(index - currentIndex) * 100}%)`,
                      opacity: index === currentIndex ? 1 : 0,
                      zIndex: index === currentIndex ? 1 : 0,
                      transition: 'all 0.3s ease-out'
                    }}
                  >
                    <div className="w-full h-full">
                      <GalleryCard 
                        image={image} 
                        index={index} 
                        imageRefs={imageRefs} 
                        imageScales={imageScales} 
                        handleImageError={handleImageError} 
                        handleImageLoad={handleImageLoad} 
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Navigation Arrows */}
              <button 
                onClick={handlePrevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center text-white transition-colors z-20"
                disabled={isAnimating}
              >
                {FaChevronLeft({ className: "w-6 h-6" })}
              </button>
              <button 
                onClick={handleNextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center text-white transition-colors z-20"
                disabled={isAnimating}
              >
                {FaChevronRight({ className: "w-6 h-6" })}
              </button>
            </div>

            {/* Carousel Indicators */}
            <div className="flex justify-center mt-4 gap-2">
              {galleryImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className="focus:outline-none"
                  disabled={isAnimating}
                >
                  <div
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentIndex ? 'bg-white' : 'bg-white/30'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const GalleryCard = ({ image, index, imageRefs, imageScales, handleImageError, handleImageLoad }: GalleryCardProps) => {
  return (
    <motion.div 
      ref={el => {
        imageRefs.current[index] = el;
      }}
      className="w-full md:h-[400px] h-full rounded-2xl overflow-hidden shadow-2xl transform-gpu relative"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <div 
        className="absolute inset-0 transform-gpu will-change-transform"
        style={{
          transform: `scale(${imageScales[index] || 1})`,
          transition: 'transform 0.2s ease-out'
        }}
      >
        <Image
          src={image.src}
          alt={image.title}
          fill
          className="object-cover"
          onError={() => handleImageError(index)}
          onLoad={() => handleImageLoad(index)}
          sizes="(max-width: 768px) 100vw, 33vw"
          priority={index === 0}
        />
      </div>
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 sm:p-8">
        <SubHeading
          text={image.title}
          color="white"
          size="large"
          className="mb-2 sm:mb-4 text-xl sm:text-2xl"
          animate={false}
        />
        <SubText
          text={image.description}
          variant="overlay"
          size="large"
          animate={false}
          className="text-sm sm:text-base"
        />
      </div>
    </motion.div>
  );
}; 