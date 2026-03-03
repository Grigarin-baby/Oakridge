'use client'
import { motion } from 'framer-motion';
import Image from 'next/image';

const LoadingAnimation = () => {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-green-700"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 1, delay: 2.5 }}
      onAnimationComplete={() => {
        document.body.style.overflow = 'auto';
      }}
    >
      <motion.div
        className="relative flex flex-col items-center justify-center gap-8"
        initial={{ scale: 1 }}
        animate={{ scale: 0 }}
        transition={{ duration: 0.5, delay: 2 }}
      >
        {/* Animated circles with logo */}
        <motion.div className="relative w-32 h-32">
          {/* Logo Image */}
          <motion.div
            className="absolute inset-0 z-10 rounded-full overflow-hidden"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Image
              src="/images/Oakridge_logo.png"
              alt="Oakridge College Logo"
              fill
              className="object-cover"
              priority
            />
          </motion.div>

          {/* Animated circles */}
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              className="absolute inset-0 border-4 border-green-100 rounded-full"
              initial={{ scale: 1, rotate: 0 }}
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: 360,
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: index * 0.2,
                ease: "easeInOut",
              }}
            />
          ))}
        </motion.div>

        {/* College name with gradient */}
        <motion.div
          className="flex flex-col items-center gap-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <h1 className="text-4xl font-bold text-green-50 tracking-widest text-gradient-animate">
            OAKRIDGE
          </h1>
          <p className="text-green-100/80 text-sm tracking-wider">
            ARTS & SCIENCE COLLEGE
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default LoadingAnimation; 