import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollReveal from '@/components/animations/ScrollReveal';
import { useRouter } from 'next/navigation';
import { FaArrowRight, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { HiOutlineArrowLongLeft, HiOutlineArrowLongRight } from 'react-icons/hi2';
import Button from '@/components/common/Button';
import Heading from '@/components/common/Heading';
import SubHeading from '@/components/common/SubHeading';
import TextLabel from '@/components/common/TextLabel';
import SubText from '@/components/common/SubText';

const programsByType = {
  'Computer & Commerce': [
    {
      title: "BCA - Bachelor of Computer Applications",
      description: "Three-year program focusing on computer applications and software development. Learn programming and latest technologies for IT careers.",
      department: "Computer"
    },
    {
      title: "BCom Finance",
      description: "Comprehensive program in financial management, accounting, and business economics for banking and finance careers.",
      department: "Commerce"
    },
    {
      title: "BCom Computer Application",
      description: "Blend of commerce education and computer applications for modern business environment.",
      department: "Commerce"
    }
  ],
  'Arts & Management': [
    {
      title: "BA English Language & Literature",
      description: "Study classic and contemporary literature while developing critical thinking and communication skills in this three-year program.",
      department: "English"
    },
    {
      title: "BBA - Bachelor of Business Administration",
      description: "Learn management principles, marketing, and entrepreneurship for today's dynamic business world.",
      department: "Management"
    },
    {
      title: "BA Sociology",
      description: "Study human society and social behavior. Prepare for careers in social services and research.",
      department: "Sociology"
    }
  ]
};

interface ProgramCardProps {
  title: string;
  type: string;
  description: string;
  department: string;
}

const ProgramCard = ({ title, type, description, department }: ProgramCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();

  const handleArrowClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const courseId = title.split(' ')[0];
    router.push(`/programmes#${courseId}`);
  };

  return (
    <motion.div 
      className="bg-green-100 rounded-[20px] p-12 cursor-pointer group h-[350px] w-full border-2 border-black flex flex-col justify-between relative overflow-hidden transform-gpu backface-hidden"
      style={{
        transformStyle: "preserve-3d",
      }}
      initial={{ scale: 1, y: 0 }}
      whileHover={{ 
        scale: 1.02,
        y: -10,
        transition: { 
          duration: 0.8,
          ease: [0.4, 0, 0.2, 1]
        }
      }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 25
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="relative z-10">
        <SubHeading
          text={title}
          color="black"
          size="medium"
          className="mb-4 transition-colors duration-700 group-hover:text-white"
          animate={false}
        />
      </div>
      <div className="flex items-center justify-between mt-8 relative z-10">
        <TextLabel
          text={`/${department}`}
          color="black"
          variant="tag"
          className="border-2 border-black rounded-full px-6 py-2 transition-all duration-700 group-hover:text-white group-hover:border-white"
        />
        <Button
          variant="icon"
          onClick={handleArrowClick}
          className="w-10 h-10 border-black group-hover:border-white"
          icon={FaArrowRight({ className: "text-black group-hover:text-white transition-colors duration-700" })}
        >
          <span className="sr-only">View Program</span>
        </Button>
      </div>
      <motion.div
        className="absolute inset-0 bg-black rounded-full"
        initial={{ 
          scale: 0,
          x: "50%",
          y: "50%",
          opacity: 0
        }}
        animate={{ 
          scale: isHovered ? 10 : 0,
          opacity: isHovered ? 1 : 0,
          transition: {
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1]
          }
        }}
        style={{
          transformOrigin: "center center"
        }}
      />
    </motion.div>
  );
};

export default function ThirdSection() {
  const [selectedProgram, setSelectedProgram] = useState<'Computer & Commerce' | 'Arts & Management'>('Computer & Commerce');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const handlePrevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    const programs = programsByType[selectedProgram];
    const newIndex = currentIndex === 0 ? programs.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
    setTimeout(() => setIsAnimating(false), 300);
  };

  const handleNextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    const programs = programsByType[selectedProgram];
    const newIndex = currentIndex === programs.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
    setTimeout(() => setIsAnimating(false), 300);
  };

  return (
    <section id="programs" className="py-20 bg-green-100">
      <div className="w-full">
        {/* Academic Programs Header */}
        <div className="px-4 md:px-[90px]">
          <ScrollReveal>
            <Heading
              text="ACADEMIC PROGRAMS"
              color="black"
              className="mb-3"
            />
            <SubText
              text="Explore University's 10+ courses across various specialisations that provoke intellectual and intuitive learning among students."
              color="black"
              className="mb-8"
              maxWidth="600px"
            />
          </ScrollReveal>
        </div>

        {/* Program Type Navigation */}
        <div className="px-5 md:px-[90px] mb-16">
          <div className="flex justify-between items-start gap-8">
            <Button 
              variant="text"
              onClick={() => {
                setSelectedProgram('Computer & Commerce');
                setCurrentIndex(0);
              }}
              isActive={selectedProgram === 'Computer & Commerce'}
            >
              <div>
                <SubHeading
                  text="/Computer & Commerce"
                  color="gray"
                  size="large"
                  className="mb-2"
                  animate={false}
                  isActive={selectedProgram === 'Computer & Commerce'}
                />
                <TextLabel
                  text="Department"
                  color="gray"
                  variant="tag"
                />
              </div>
            </Button>
            <Button 
              variant="text"
              onClick={() => {
                setSelectedProgram('Arts & Management');
                setCurrentIndex(0);
              }}
              isActive={selectedProgram === 'Arts & Management'}
            >
              <div className="pl-11">
                <SubHeading
                  text="/Arts & Management"
                  color="gray"
                  size="large"
                  className="mb-2"
                  animate={false}
                  isActive={selectedProgram === 'Arts & Management'}
                />
                <TextLabel
                  text="Department"
                  color="gray"
                  variant="tag"
                />
              </div>
            </Button>
          </div>
        </div>

        {/* Desktop View */}
        <div className="hidden md:block px-[90px]">
          <AnimatePresence mode="wait">
            <motion.div 
              key={selectedProgram}
              initial={{ rotateY: -90, opacity: 0, transformOrigin: "left" }}
              animate={{ rotateY: 0, opacity: 1 }}
              exit={{ rotateY: 90, opacity: 0 }}
              transition={{
                duration: 0.6,
                ease: [0.4, 0, 0.2, 1],
                opacity: { duration: 0.3 }
              }}
            >
              <div className="grid gap-12 grid-cols-3">
                {programsByType[selectedProgram].map((dept, index) => (
                  <ScrollReveal key={index} delay={index * 0.2}>
                    <motion.div 
                      className="w-full"
                      initial={{ rotateY: -90, opacity: 0 }}
                      animate={{ rotateY: 0, opacity: 1 }}
                      transition={{
                        duration: 0.5,
                        delay: index * 0.1,
                        ease: [0.4, 0, 0.2, 1]
                      }}
                    >
                      <div className="perspective-1000">
                        <ProgramCard 
                          title={dept.title}
                          type={selectedProgram}
                          description={dept.description}
                          department={dept.department}
                        />
                      </div>
                    </motion.div>
                  </ScrollReveal>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Mobile Carousel View */}
        <div className="block md:hidden px-5 relative">
          <div className="overflow-hidden h-[450px]">
            <div className="relative h-full">
              {programsByType[selectedProgram].map((dept, index) => (
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
                  <ProgramCard 
                    title={dept.title}
                    type={selectedProgram}
                    description={dept.description}
                    department={dept.department}
                  />
                </div>
              ))}
            </div>

            {/* Navigation Arrows */}
            <button 
              onClick={handlePrevSlide}
              className="absolute left-5 bottom-10 w-12 h-12 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center text-white transition-colors z-20"
              disabled={isAnimating}
            >
              {FaChevronLeft({ className: "w-6 h-6" })}
            </button>
            <button 
              onClick={handleNextSlide}
              className="absolute right-5 bottom-10 w-12 h-12 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center text-white transition-colors z-20"
              disabled={isAnimating}
            >
              {FaChevronRight({ className: "w-6 h-6" })}
            </button>
          </div>

          {/* Carousel Indicators */}
          <div className="flex justify-center mt-4 gap-2">
            {programsByType[selectedProgram].map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setIsAnimating(true);
                  setCurrentIndex(index);
                  setTimeout(() => setIsAnimating(false), 300);
                }}
                className="focus:outline-none"
                disabled={isAnimating}
              >
                <div
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentIndex ? 'bg-black' : 'bg-black/30'
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 