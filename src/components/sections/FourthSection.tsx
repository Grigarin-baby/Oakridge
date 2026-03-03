import React from 'react';
import { motion } from 'framer-motion';
import { FaGraduationCap, FaUsers, FaChalkboardTeacher, FaBook } from 'react-icons/fa';
import ScrollReveal from '@/components/animations/ScrollReveal';
import Button from '@/components/common/Button';
import SubText from '@/components/common/SubText';
import Heading from '@/components/common/Heading';
import SubHeading from '@/components/common/SubHeading';
import TextLabel from '@/components/common/TextLabel';

const stats = [
  { number: 1000, label: 'Students', icon: FaUsers({ className: "text-4xl text-primary" }) },
  { number: 50, label: 'Faculty', icon: FaChalkboardTeacher({ className: "text-4xl text-primary" }) },
  { number: 7, label: 'Programs', icon: FaGraduationCap({ className: "text-4xl text-primary" }) },
  { number: 18, label: 'Years of Excellence', icon: FaBook({ className: "text-4xl text-primary" }) },
];

interface CountUpProps {
  end: number;
  duration?: number;
}

const CountUp = ({ end, duration = 2 }: CountUpProps) => {
  const [count, setCount] = React.useState(0);
  const [hasAnimated, setHasAnimated] = React.useState(false);
  const elementRef = React.useRef<HTMLSpanElement>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated) {
          let startTime: number;
          let animationFrame: number;

          const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = (timestamp - startTime) / (duration * 1000);

            if (progress < 1) {
              setCount(Math.min(Math.floor(end * progress), end));
              animationFrame = requestAnimationFrame(animate);
            } else {
              setCount(end);
              setHasAnimated(true);
            }
          };

          animationFrame = requestAnimationFrame(animate);

          return () => {
            if (animationFrame) {
              cancelAnimationFrame(animationFrame);
            }
          };
        }
      },
      {
        threshold: 0.5,
      }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [end, duration, hasAnimated]);

  return <span ref={elementRef}>{count}</span>;
};

const FourthSection = () => {
  return (
    <>
      {/* About Section */}
      <section id="about" className="py-20 bg-gradient-to-b from-gray-800 to-gray-900">
        <div>
          <ScrollReveal>
            <Heading
              text="ABOUT OUR COLLEGE"
              color="white"
              className="text-center mb-8"
            />
          </ScrollReveal>
          <div className=" container w-[280px] md:w-[700px] mx-auto text-center  md:px-8 px-2">
            <ScrollReveal delay={0.2}>
              <SubText
                text="Established in 2010, Oakridge Arts and Science College is a premier institution
                nestled in a serene campus along Green Valley Road. Our modern facilities and dedicated
                faculty provide an ideal environment for academic pursuits and holistic development."
                color="white"
                size="large"
                className="container mb-6 px-2 md:px-0"
                />
            </ScrollReveal>
                </div>
            <ScrollReveal delay={0.4}>
              <div className="w-full flex  justify-center  gap-4 md:gap-10">
                <Button
                  variant="primary"
                  href="/about"
                  className="bg-transparent text-green-600 border-2 border-green-600 hover:bg-green-50"
                >
                  Learn More
                </Button>
              </div>
            </ScrollReveal>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="w-full px-4 md:px-[90px]">
          {/* Mobile View - Single Card */}
          <div className="block md:hidden px-4 md:px-[90px]">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="grid grid-cols-2 gap-6">
                {stats.map((stat, index) => (
                  <div key={index} className="flex flex-col items-center text-center">
                    <div className="text-green-700 text-3xl mb-2">
                      {stat.icon}
                    </div>
                    <div>
                      <SubHeading
                        text={
                          <span className="text-xl">
                            <CountUp end={stat.number} />
                            {typeof stat.number === 'number' ? 
                              <span className="text-green-700">+</span> 
                            : ''}
                          </span>
                        }
                        color="black"
                        size="small"
                        className="mb-1"
                        animate={false}
                      />
                      <TextLabel
                        text={stat.label}
                        color="gray"
                        variant="tag"
                        className="tracking-wide uppercase text-xs"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Desktop View */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="w-full">
                <ScrollReveal delay={index * 0.2}>
                  <motion.div 
                    className="text-center p-8 bg-white rounded-xl shadow-lg hover-lift flex flex-col items-center justify-center h-[200px] relative overflow-hidden group w-full"
                    whileHover={{ y: -5 }}
                  >
                    <motion.div
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="mb-4 relative z-10"
                    >
                      <div className="text-green-700 transform transition-transform group-hover:scale-110 duration-300 text-4xl">
                        {stat.icon}
                      </div>
                    </motion.div>
                    <SubHeading
                      text={
                        <span className="text-2xl">
                          <CountUp end={stat.number} />
                          {typeof stat.number === 'number' ? 
                            <span className="text-green-700">+</span> 
                          : ''}
                        </span>
                      }
                      color="black"
                      size="large"
                      className="mb-2 relative z-10"
                      animate={false}
                    />
                    <TextLabel
                      text={stat.label}
                      color="gray"
                      variant="tag"
                      className="relative z-10 tracking-wide uppercase text-base"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </motion.div>
                </ScrollReveal>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default FourthSection; 