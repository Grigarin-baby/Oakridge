"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import Navbar from '@/components/Navbar';

export default function Gallery() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const images = [
    'college.jpg',
    'library.jpg',
    'classroom.jpg',
    'convocation.png',
    'activities.jpg',
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen w-full  bg-gradient-to-b from-black via-gray-600 to-gray-600 relative">
        {/* Images along the curve */}
        <div className="pt-24 md:pt-40 overflow-x-auto overflow-y-hidden pb-12 scrollbar-hide" 
             style={{
               scrollbarWidth: 'none',
               msOverflowStyle: 'none',
               WebkitOverflowScrolling: 'touch',
               height: '100vh',
               scrollBehavior: 'smooth',
               overflowY: 'hidden'
             }}>
          <style jsx global>{`
            .scrollbar-hide::-webkit-scrollbar {
              display: none;
            }
            .scrollbar-hide {
              scroll-behavior: smooth;
              -webkit-overflow-scrolling: touch;
            }
          `}</style>
          <div className="relative flex gap-3 pb-40 md:gap-12 px-4 md:px-12 min-h-[calc(100vh-64px)] items-center" style={{ minWidth: 'max-content' }}>
            {images.map((image, index) => {
              // Calculate vertical offset based on position to follow curve
              const yOffset = index === Math.floor(images.length / 2) ? 'md:translate-y-24 translate-y-8' : 
                            index === Math.floor(images.length / 2) - 1 || index === Math.floor(images.length / 2) + 1 ? 'md:translate-y-12 translate-y-4' : 
                            'translate-y-0';

              const isSelected = selectedIndex === index;
              const isBeforeSelected = selectedIndex !== null && index < selectedIndex;
              const isAfterSelected = selectedIndex !== null && index > selectedIndex;
              
              return (
                <div 
                  key={image} 
                  className={`relative transform ${!isSelected ? yOffset : ''} transition-all  mb-20 duration-500 ease-in-out cursor-pointer
                    ${isSelected ? 'z-10' : 'z-0'}
                    ${isBeforeSelected ? 'md:-translate-x-60 -translate-x-20 opacity-40' : ''}
                    ${isAfterSelected ? 'md:translate-x-60 translate-x-20 opacity-40' : ''}
                  `}
                  onClick={() => setSelectedIndex(isSelected ? null : index)}
                >
                  {/* Polaroid-style card */}
                  <div className={`bg-white p-2 md:p-4 pb-10 md:pb-16 shadow-xl rounded-sm transition-all duration-500 w-[240px] md:w-[400px]
                    ${isSelected ? `md:scale-[1.8] scale-[1.5] md:mt-20 mt-16 ${index === 0 ? 'ml-20 md:ml-40' : index === images.length - 1 ? 'mr-20 md:mr-40' : ''}` : 'hover:scale-105 hover:-rotate-2'}
                  `}>
                    <div className="relative w-full aspect-square overflow-hidden">
                      <Image
                        src={`/images/mock/${image}`}
                        alt={`Gallery image ${index + 1}`}
                        width={400}
                        height={400}
                        className={`object-cover transition-all duration-500
                          ${isSelected ? '' : 'filter grayscale hover:grayscale-0'}
                        `}
                      />
                    </div>
                    {/* Art tag */}
                    <div className="absolute bottom-2 md:bottom-6 left-2 md:left-6 bg-white/90 px-1.5 md:px-3 py-0.5 md:py-1.5 text-[10px] md:text-sm text-gray-600 rounded">
                      Art {String(index + 1).padStart(2, '0')}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
} 