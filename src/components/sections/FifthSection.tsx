import React from 'react';
import Link from 'next/link';
import ScrollReveal from '@/components/animations/ScrollReveal';
import HoverAnimation from '@/components/animations/HoverAnimation';
import { motion } from 'framer-motion';

const featuredEvents = [
  {
    date: 'OCT 20, 2024',
    category: 'Seminar',
    title: 'International Conference on Environmental Studies',
    description: 'Join us for a groundbreaking conference on environmental sustainability and climate action.'
  },
  {
    date: 'NOV 15, 2024',
    category: 'Cultural',
    title: 'Annual Arts Festival',
    description: 'Experience the vibrant cultural diversity through performances, exhibitions, and workshops.'
  },
  {
    date: 'DEC 01, 2024',
    category: 'Academic',
    title: 'Research Symposium',
    description: 'Showcase of innovative research projects by our faculty and students.'
  }
];

const FifthSection = () => {
  return (
    <section className="py-12 md:py-20 bg-gray-50">
      <div className="w-full px-4 md:px-[90px]">
        <ScrollReveal>
          <h2 className="text-[2.5rem] md:text-[4.5rem] font-extralight text-center text-gray-800 mb-8 md:mb-12 tracking-[-0.02em] uppercase leading-[1.1]">
            Recent and Upcoming Events
          </h2>
        </ScrollReveal>
        <div className="block md:hidden relative px-4 md:px-[90px] ">
          <div className="overflow-x-auto overflow-y-hidden hide-scrollbar">
            <div className="flex px-4 gap-6 w-max pb-4 ">
              {featuredEvents.map((event, index) => (
                <ScrollReveal key={index} delay={index * 0.2}>
                  <HoverAnimation>
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden h-[280px] flex flex-col w-[280px]">
                      <div className="p-4 flex-1 flex flex-col">
                        <div className="flex items-center justify-between mb-3 ">
                          <motion.div 
                            className="text-xs text-green-800 font-light tracking-wide"
                            whileHover={{ scale: 1.05 }}
                          >
                            {event.date}
                          </motion.div>
                          <motion.div 
                            className="inline-block px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-light tracking-wide uppercase"
                            whileHover={{ backgroundColor: "#d9e5f0" }}
                          >
                            {event.category}
                          </motion.div>
                        </div>
                        <h3 className="text-[1.25rem] font-extralight text-gray-800 mb-2 line-clamp-2 tracking-tight">{event.title}</h3>
                        <p className="text-sm text-gray-600 flex-1 line-clamp-3 font-light leading-relaxed">{event.description}</p>
                        <motion.div
                          className="mt-3"
                          whileHover={{ x: 5 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <Link href="/events" className="text-green-800 hover:text-green-600 font-light tracking-wide uppercase text-xs inline-flex items-center">
                            Learn More <span className="ml-1">→</span>
                          </Link>
                        </motion.div>
                      </div>
                    </div>
                  </HoverAnimation>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>

        <div className="hidden md:grid md:grid-cols-3 gap-8 justify-items-start">
          {featuredEvents.map((event, index) => (
            <ScrollReveal key={index} delay={index * 0.2}>
              <HoverAnimation>
                <div className="bg-white rounded-lg shadow-lg overflow-hidden h-[320px] flex flex-col w-full">
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center justify-between mb-4">
                      <motion.div 
                        className="text-sm text-green-800 font-light tracking-wide"
                        whileHover={{ scale: 1.05 }}
                      >
                        {event.date}
                      </motion.div>
                      <motion.div 
                        className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-light tracking-wide uppercase"
                        whileHover={{ backgroundColor: "#d9e5f0" }}
                      >
                        {event.category}
                      </motion.div>
                    </div>
                    <h3 className="text-[1.75rem] font-extralight text-gray-800 mb-3 line-clamp-2 tracking-tight">{event.title}</h3>
                    <p className="text-base text-gray-600 flex-1 line-clamp-3 font-light leading-relaxed">{event.description}</p>
                    <motion.div
                      className="mt-4"
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Link href="/events" className="text-green-800 hover:text-green-600 font-light tracking-wide uppercase text-sm inline-flex items-center">
                        Learn More <span className="ml-1">→</span>
                      </Link>
                    </motion.div>
                  </div>
                </div>
              </HoverAnimation>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FifthSection; 