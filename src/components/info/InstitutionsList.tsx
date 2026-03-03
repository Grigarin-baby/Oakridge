import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const institutions = [
  {
    name: "Oakridge College of Engineering and Technology",
    link: "https://icet.ac.in"
  },
  {
    name: "Oakridge Trust",
    link: "/trust"
  },
  {
    name: "Oakridge School of Science",
    link: "/science"
  },
  {
    name: "Oakridge College of Arts and Science",
    link: "/"
  }
];

const InstitutionsList = () => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-white mb-4">Our Institutions</h3>
      {institutions.map((institution, index) => (
        <motion.div
          key={index}
          whileHover={{ x: 5 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Link 
            href={institution.link}
            className="text-gray-300 hover:text-white transition-colors duration-200 block"
          >
            {institution.name}
          </Link>
        </motion.div>
      ))}
    </div>
  );
};

export default InstitutionsList; 