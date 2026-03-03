import React from 'react';
import { motion } from 'framer-motion';

interface HoverAnimationProps {
  children: React.ReactNode;
  scale?: number;
}

const HoverAnimation: React.FC<HoverAnimationProps> = ({ children, scale = 1.05 }) => {
  return (
    <motion.div
      whileHover={{ scale }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20
      }}
    >
      {children}
    </motion.div>
  );
};

export default HoverAnimation; 