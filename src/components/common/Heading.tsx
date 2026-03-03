import React from 'react';
import { motion } from 'framer-motion';

interface HeadingProps {
  text: string | React.ReactNode;
  color?: 'white' | 'black' | 'gradient';
  className?: string;
  animate?: boolean;
  delay?: number;
}

const Heading: React.FC<HeadingProps> = ({
  text,
  color = 'black',
  className = '',
  animate = true,
  delay = 0.2
}) => {
  const colorStyles = {
    white: 'text-white',
    black: 'text-black',
    gradient: 'bg-gradient-to-r from-green-50 to-white bg-clip-text text-transparent'
  };

  const baseStyles = 'text-[2.65rem] sm:text-[2.5rem] md:text-[3.5rem] font-extralight tracking-[-0.02em] leading-[1.1] uppercase font-arvo';

  const content = (
    <h2 className={`${baseStyles} ${colorStyles[color]} ${className}`}>
      {text}
    </h2>
  );

  if (animate) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay, duration: 0.8 }}
      >
        {content}
      </motion.div>
    );
  }

  return content;
};

export default Heading; 