'use client'

import Image from 'next/image';

export default function TestImage() {
  return (
    <div className="p-4">
      <h2>Test Image</h2>
      <div className="relative w-96 h-[300px] border border-gray-300">
        <Image
          src="/images/mock/college.jpg"
          alt="Test College Image"
          fill
          sizes="(max-width: 768px) 100vw, 384px"
          style={{ objectFit: 'contain' }}
        />
      </div>
      <div className="mt-4">
        <img 
          src="/images/mock/college.jpg" 
          alt="Regular img tag test"
          width={384}
          height={300}
          className="object-contain border border-gray-300"
        />
      </div>
    </div>
  );
} 