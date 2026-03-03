import React, { useEffect, useRef } from 'react';
import { motion, useInView, useAnimation, Variants } from 'framer-motion';

interface ScrollAnimationProps {
  children: React.ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right';
  duration?: number;
  delay?: number;
  className?: string;
  scale?: boolean;
  once?: boolean;
}

const variants: Variants = {
  hidden: {
    opacity: 0,
    y: 50,
    scale: 0.95,
  },
  visible: (custom: { duration: number; delay: number }) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: custom.duration,
      delay: custom.delay,
      ease: [0.25, 0.1, 0, 1], // Custom ease for smooth animation
      opacity: { duration: custom.duration * 0.7 }, // Fade in faster
      y: { 
        type: "spring",
        damping: 15,
        stiffness: 100
      },
      scale: {
        duration: custom.duration * 1.2, // Slightly longer scale animation
        ease: [0.33, 1, 0.68, 1]  // Custom ease for scale
      }
    }
  }),
  hover: {
    scale: 1.02,
    y: -5,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.1, 0, 1]
    }
  }
};

const ScrollAnimation: React.FC<ScrollAnimationProps> = ({
  children,
  duration = 0.7,
  delay = 0,
  className = '',
  scale = true,
  once = true
}) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once,
    margin: "-10% 0px" 
  });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    } else if (!once) {
      controls.start("hidden");
    }
  }, [isInView, controls, once]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
      custom={{ duration, delay }}
      whileHover={scale ? "hover" : undefined}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default ScrollAnimation; 