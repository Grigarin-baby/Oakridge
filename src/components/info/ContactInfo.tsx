import React from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const ContactInfo = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-2xl font-semibold text-gray-800 mb-6">Contact Information</h3>
      <div className="space-y-4">
        <div className="flex items-center">
          <FaPhone className="text-green-600 mr-3 text-xl" />
          <div>
            <p className="text-gray-800">Phone</p>
            <a href="tel:+91-800-123-4567" className="text-green-600 hover:text-green-700">+91 800 123 4567</a>
          </div>
        </div>
        <div className="flex items-center">
          <FaEnvelope className="text-green-600 mr-3 text-xl" />
          <div>
            <p className="text-gray-800">Email</p>
            <a href="mailto:info@oakridgecollege.edu" className="text-green-600 hover:text-green-700">info@oakridgecollege.edu</a>
          </div>
        </div>
        <div className="flex items-center">
          <FaMapMarkerAlt className="text-green-600 mr-3 text-xl" />
          <div>
            <p className="text-gray-800">Address</p>
            <p className="text-gray-600">Green Valley Road, Riverside, Kerala - 670001</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo; 