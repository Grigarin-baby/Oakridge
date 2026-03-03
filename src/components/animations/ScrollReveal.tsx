import React, { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number;
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({ children, delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ 
        opacity: 0,
        y: 50,
        scale: 0.95
      }}
      animate={{
        opacity: isInView ? 1 : 0,
        y: isInView ? 0 : 50,
        scale: isInView ? 1 : 0.95,
      }}
      transition={{
        duration: 1,
        delay: delay,
        ease: [0.22, 1, 0.36, 1]
      }}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal; 