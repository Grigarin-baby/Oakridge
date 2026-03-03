"use client"
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Heading from '@/components/common/Heading';
import SubHeading from '@/components/common/SubHeading';
import SubText from '@/components/common/SubText';
import TextLabel from '@/components/common/TextLabel';
import Button from '@/components/common/Button';
import emailjs from '@emailjs/browser';

interface EducationEntry {
  id: number;
  examination: string;
  board: string;
  schoolName: string;
  percentage: string;
  startDate: string;
  endDate: string;
}

// Environment variables
const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!;
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!;
const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!;
const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL!;

// Log environment variables to verify they're loaded
console.log('EmailJS Config:', {
  serviceId: EMAILJS_SERVICE_ID,
  templateId: EMAILJS_TEMPLATE_ID,
  publicKey: EMAILJS_PUBLIC_KEY,
  adminEmail: ADMIN_EMAIL
});

export default function AdmissionForm() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [photo, setPhoto] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmissionSuccess, setIsSubmissionSuccess] = useState(false);
  const [educationEntries, setEducationEntries] = useState<EducationEntry[]>([{
    id: 1,
    examination: '',
    board: '',
    schoolName: '',
    percentage: '',
    startDate: '',
    endDate: ''
  }]);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    gender: '',
    dateOfBirth: '',
    contactNumber: '',
    email: '',
    fatherName: '',
    motherName: '',
    fatherOccupation: '',
    motherOccupation: '',
    religion: '',
    caste: '',
    bloodGroup: '',
    course: '',
    homeContactNumber: '',
    address: '',
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    // Initialize EmailJS with public key from environment variable
    emailjs.init(EMAILJS_PUBLIC_KEY);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEducationChange = (id: number, field: keyof EducationEntry, value: string) => {
    setEducationEntries(prev => prev.map(entry => 
      entry.id === id ? { ...entry, [field]: value } : entry
    ));
  };

  const validateStep1 = () => {
    const newErrors: { [key: string]: string } = {};
    
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.gender) newErrors.gender = 'Gender is required';
    if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
    if (!formData.contactNumber.trim()) {
      newErrors.contactNumber = 'Contact number is required';
    } else if (!/^\d{10}$/.test(formData.contactNumber)) {
      newErrors.contactNumber = 'Please enter a valid 10-digit contact number';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.fatherName.trim()) newErrors.fatherName = 'Father\'s name is required';
    if (!formData.motherName.trim()) newErrors.motherName = 'Mother\'s name is required';
    if (!formData.course) newErrors.course = 'Course selection is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: { [key: string]: string } = {};
    
    if (educationEntries.length === 0) {
      newErrors.education = 'At least one education entry is required';
    }

    educationEntries.forEach((entry) => {
      if (!entry.examination) {
        newErrors[`education_${entry.id}_examination`] = 'Examination is required';
      }
      if (!entry.board) {
        newErrors[`education_${entry.id}_board`] = 'Board is required';
      }
      if (!entry.schoolName) {
        newErrors[`education_${entry.id}_schoolName`] = 'School/College name is required';
      }
      if (!entry.percentage) {
        newErrors[`education_${entry.id}_percentage`] = 'Mark percentage is required';
      } else if (Number(entry.percentage) < 0 || Number(entry.percentage) > 100) {
        newErrors[`education_${entry.id}_percentage`] = 'Mark percentage must be between 0 and 100';
      }
      if (!entry.startDate) {
        newErrors[`education_${entry.id}_startDate`] = 'Start date is required';
      }
      if (!entry.endDate) {
        newErrors[`education_${entry.id}_endDate`] = 'End date is required';
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    let isValid = false;
    
    switch (currentStep) {
      case 1:
        isValid = validateStep1();
        break;
      case 2:
        isValid = validateStep2();
        if (isValid) {
          handleSubmitApplication();
        }
        break;
      default:
        isValid = true;
    }

    if (isValid && currentStep === 1) {
      setCurrentStep(prev => Math.min(prev + 1, 2));
    }
  };

  const handlePrevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleAddEducation = () => {
    setEducationEntries(prev => [...prev, {
      id: prev.length + 1,
      examination: '',
      board: '',
      schoolName: '',
      percentage: '',
      startDate: '',
      endDate: ''
    }]);
  };

  const handleRemoveEducation = (id: number) => {
    setEducationEntries(prev => prev.filter(entry => entry.id !== id));
  };

  const handleSubmitApplication = async () => {
    try {
      setIsSubmitting(true);
      
      const formattedEducationDetails = educationEntries.map((entry, index) => `
        Education Entry ${index + 1}:
        - Examination: ${entry.examination}
        - Board: ${entry.board}
        - School/College: ${entry.schoolName}
        - Percentage: ${entry.percentage}%
        - Period: ${entry.startDate} to ${entry.endDate}
      `).join('\n');

      const templateParams = {
        to_email: ADMIN_EMAIL,
        from_name: `${formData.firstName} ${formData.lastName}`,
        firstName: formData.firstName,
        lastName: formData.lastName,
        gender: formData.gender,
        dateOfBirth: formData.dateOfBirth,
        contactNumber: formData.contactNumber,
        email: formData.email,
        fatherName: formData.fatherName,
        fatherOccupation: formData.fatherOccupation,
        motherName: formData.motherName,
        motherOccupation: formData.motherOccupation,
        religion: formData.religion,
        caste: formData.caste,
        bloodGroup: formData.bloodGroup,
        course: formData.course,
        homeContactNumber: formData.homeContactNumber,
        address: formData.address,
        educationDetails: formattedEducationDetails
      };

      const response = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );

      if (response.status === 200) {
        setIsSubmissionSuccess(true);
        
        // Reset form
        setFormData({
          firstName: '',
          lastName: '',
          gender: '',
          dateOfBirth: '',
          contactNumber: '',
          email: '',
          fatherName: '',
          motherName: '',
          fatherOccupation: '',
          motherOccupation: '',
          religion: '',
          caste: '',
          bloodGroup: '',
          course: '',
          homeContactNumber: '',
          address: '',
        });
        setEducationEntries([{
          id: 1,
          examination: '',
          board: '',
          schoolName: '',
          percentage: '',
          startDate: '',
          endDate: ''
        }]);
        setCurrentStep(1);

        // Wait for animation to complete before redirecting
        setTimeout(() => {
          router.push('/');
        }, 2000);
      }
    } catch (error) {
      console.error('Error submitting application:', error);
      alert('Error submitting application. Please try again or contact support if the issue persists.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen py-4 md:py-8 lg:py-12 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url("/assets/college.jpg")' }}>
      {isSubmissionSuccess ? (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-8 flex flex-col items-center transform scale-up-center">
            <div className="w-16 h-16 mb-4 relative">
              <div className="checkmark">
                <div className="checkmark_stem"></div>
                <div className="checkmark_kick"></div>
              </div>
            </div>
            <h2 className="text-2xl font-semibold text-green-600 mb-2">Success!</h2>
            <p className="text-gray-600">Your application has been submitted successfully.</p>
            <p className="text-gray-500 text-sm mt-2">Redirecting to home page...</p>
          </div>
        </div>
      ) : (
        <div className="container mx-auto px-2 sm:px-4">
          <div className="max-w-3xl mx-auto bg-background-light/90 backdrop-blur-sm rounded-lg md:rounded-2xl shadow-lg p-3 sm:p-6 md:p-8">
            {/* Header */}
            <div className="mb-4 sm:mb-6 md:mb-8 text-center">
              <Heading text="Admission Form" />
            </div>

            {/* Progress Steps */}
            <div className="flex items-center justify-center mb-6 sm:mb-8 md:mb-12">
              <div className="flex items-center w-full max-w-2xl justify-between px-2">
                <div className="flex flex-col items-center">
                  <div className={`w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-xs sm:text-sm md:text-base ${
                    currentStep >= 1 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-600'
                  }`}>
                    1
                  </div>
                  <span className="text-xs sm:text-sm mt-1">
                    <SubText text="Personal" />
                  </span>
                </div>
                <div className={`flex-1 h-1 mx-1 sm:mx-2 md:mx-4 ${
                  currentStep > 1 ? 'bg-primary' : 'bg-gray-200'
                }`} />
                <div className="flex flex-col items-center">
                  <div className={`w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-xs sm:text-sm md:text-base ${
                    currentStep === 2 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-600'
                  }`}>
                    2
                  </div>
                  <span className="text-xs sm:text-sm mt-1">
                    <SubText text="Education" />
                  </span>
                </div>
              </div>
            </div>

            {/* Form Steps */}
            <form onSubmit={(e) => e.preventDefault()}>
              {currentStep === 1 && (
                <div className="space-y-4 sm:space-y-6">
                  <SubText text="Personal Details" color='green'/>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <TextLabel text="First Name" required />
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        placeholder="Enter First Name"
                        className={`w-full px-3 sm:px-4 py-2 text-sm sm:text-base border-2 ${
                          errors.firstName ? 'border-red-500' : 'border-gray-300'
                        } rounded-lg focus:ring-2 focus:ring-primary focus:border-primary placeholder-gray-400`}
                      />
                      {errors.firstName && (
                        <p className="mt-1 text-xs text-red-500">{errors.firstName}</p>
                      )}
                    </div>
                    <div>
                      <TextLabel text="Last Name" required />
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        placeholder="Enter Last Name"
                        className={`w-full px-3 sm:px-4 py-2 text-sm sm:text-base border-2 ${
                          errors.lastName ? 'border-red-500' : 'border-gray-300'
                        } rounded-lg focus:ring-2 focus:ring-primary focus:border-primary placeholder-gray-400`}
                      />
                      {errors.lastName && (
                        <p className="mt-1 text-xs text-red-500">{errors.lastName}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <TextLabel text="Gender" required />
                      <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleInputChange}
                        className={`w-full px-3 sm:px-4 py-2 text-sm sm:text-base border-2 ${
                          errors.gender ? 'border-red-500' : 'border-gray-300'
                        } rounded-lg focus:ring-2 focus:ring-primary focus:border-primary text-gray-600`}
                      >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                      {errors.gender && (
                        <p className="mt-1 text-xs text-red-500">{errors.gender}</p>
                      )}
                    </div>
                    <div>
                      <TextLabel text="Date of Birth" required />
                      <input
                        type="date"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleInputChange}
                        className={`w-full px-3 sm:px-4 py-2 text-sm sm:text-base border-2 ${
                          errors.dateOfBirth ? 'border-red-500' : 'border-gray-300'
                        } rounded-lg focus:ring-2 focus:ring-primary focus:border-primary text-gray-600`}
                      />
                      {errors.dateOfBirth && (
                        <p className="mt-1 text-xs text-red-500">{errors.dateOfBirth}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <TextLabel text="Contact Number" required />
                      <input
                        type="tel"
                        name="contactNumber"
                        value={formData.contactNumber}
                        onChange={handleInputChange}
                        placeholder="Enter Contact Number"
                        className={`w-full px-3 sm:px-4 py-2 text-sm sm:text-base border-2 ${
                          errors.contactNumber ? 'border-red-500' : 'border-gray-300'
                        } rounded-lg focus:ring-2 focus:ring-primary focus:border-primary placeholder-gray-400`}
                      />
                      {errors.contactNumber && (
                        <p className="mt-1 text-xs text-red-500">{errors.contactNumber}</p>
                      )}
                    </div>
                    <div>
                      <TextLabel text="Email" required />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Enter Email Address"
                        className={`w-full px-3 sm:px-4 py-2 text-sm sm:text-base border-2 ${
                          errors.email ? 'border-red-500' : 'border-gray-300'
                        } rounded-lg focus:ring-2 focus:ring-primary focus:border-primary placeholder-gray-400`}
                      />
                      {errors.email && (
                        <p className="mt-1 text-xs text-red-500">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <TextLabel text="Father's Name" required />
                      <input
                        type="text"
                        name="fatherName"
                        value={formData.fatherName}
                        onChange={handleInputChange}
                        placeholder="Enter Father's Name"
                        className={`w-full px-3 sm:px-4 py-2 text-sm sm:text-base border-2 ${
                          errors.fatherName ? 'border-red-500' : 'border-gray-300'
                        } rounded-lg focus:ring-2 focus:ring-primary focus:border-primary placeholder-gray-400`}
                      />
                      {errors.fatherName && (
                        <p className="mt-1 text-xs text-red-500">{errors.fatherName}</p>
                      )}
                    </div>
                    <div>
                      <TextLabel text="Mother's Name" required />
                      <input
                        type="text"
                        name="motherName"
                        value={formData.motherName}
                        onChange={handleInputChange}
                        placeholder="Enter Mother's Name"
                        className={`w-full px-3 sm:px-4 py-2 text-sm sm:text-base border-2 ${
                          errors.motherName ? 'border-red-500' : 'border-gray-300'
                        } rounded-lg focus:ring-2 focus:ring-primary focus:border-primary placeholder-gray-400`}
                      />
                      {errors.motherName && (
                        <p className="mt-1 text-xs text-red-500">{errors.motherName}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <TextLabel text="Father's Occupation" />
                      <input
                        type="text"
                        name="fatherOccupation"
                        value={formData.fatherOccupation}
                        onChange={handleInputChange}
                        placeholder="Enter Father's Occupation"
                        className={`w-full px-3 sm:px-4 py-2 text-sm sm:text-base border-2 ${
                          errors.fatherOccupation ? 'border-red-500' : 'border-gray-300'
                        } rounded-lg focus:ring-2 focus:ring-primary focus:border-primary placeholder-gray-400`}
                      />
                      {errors.fatherOccupation && (
                        <p className="mt-1 text-xs text-red-500">{errors.fatherOccupation}</p>
                      )}
                    </div>
                    <div>
                      <TextLabel text="Mother's Occupation" />
                      <input
                        type="text"
                        name="motherOccupation"
                        value={formData.motherOccupation}
                        onChange={handleInputChange}
                        placeholder="Enter Mother's Occupation"
                        className={`w-full px-3 sm:px-4 py-2 text-sm sm:text-base border-2 ${
                          errors.motherOccupation ? 'border-red-500' : 'border-gray-300'
                        } rounded-lg focus:ring-2 focus:ring-primary focus:border-primary placeholder-gray-400`}
                      />
                      {errors.motherOccupation && (
                        <p className="mt-1 text-xs text-red-500">{errors.motherOccupation}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                    <div>
                      <TextLabel text="Religion" />
                      <input
                        type="text"
                        name="religion"
                        value={formData.religion}
                        onChange={handleInputChange}
                        placeholder="Enter Religion"
                        className={`w-full px-3 sm:px-4 py-2 text-sm sm:text-base border-2 ${
                          errors.religion ? 'border-red-500' : 'border-gray-300'
                        } rounded-lg focus:ring-2 focus:ring-primary focus:border-primary placeholder-gray-400`}
                      />
                      {errors.religion && (
                        <p className="mt-1 text-xs text-red-500">{errors.religion}</p>
                      )}
                    </div>
                    <div>
                      <TextLabel text="Caste" />
                      <input
                        type="text"
                        name="caste"
                        value={formData.caste}
                        onChange={handleInputChange}
                        placeholder="Enter Caste"
                        className={`w-full px-3 sm:px-4 py-2 text-sm sm:text-base border-2 ${
                          errors.caste ? 'border-red-500' : 'border-gray-300'
                        } rounded-lg focus:ring-2 focus:ring-primary focus:border-primary placeholder-gray-400`}
                      />
                      {errors.caste && (
                        <p className="mt-1 text-xs text-red-500">{errors.caste}</p>
                      )}
                    </div>
                    <div className="sm:col-span-2 lg:col-span-1">
                      <TextLabel text="Blood Group" />
                      <select
                        name="bloodGroup"
                        value={formData.bloodGroup}
                        onChange={handleInputChange}
                        className={`w-full px-3 sm:px-4 py-2 text-sm sm:text-base border-2 ${
                          errors.bloodGroup ? 'border-red-500' : 'border-gray-300'
                        } rounded-lg focus:ring-2 focus:ring-primary focus:border-primary text-gray-600`}
                      >
                        <option value="">Select Blood Group</option>
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                      </select>
                      {errors.bloodGroup && (
                        <p className="mt-1 text-xs text-red-500">{errors.bloodGroup}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <TextLabel text="Course" required />
                      <select
                        name="course"
                        value={formData.course}
                        onChange={handleInputChange}
                        className={`w-full px-3 sm:px-4 py-2 text-sm sm:text-base border-2 ${
                          errors.course ? 'border-red-500' : 'border-gray-300'
                        } rounded-lg focus:ring-2 focus:ring-primary focus:border-primary text-gray-600`}
                      >
                        <option value="">Select Course</option>
                        <option value="bcom">B.Com</option>
                        <option value="ba">BA</option>
                        <option value="bba">BBA</option>
                        <option value="bca">BCA</option>
                      </select>
                      {errors.course && (
                        <p className="mt-1 text-xs text-red-500">{errors.course}</p>
                      )}
                    </div>
                    <div>
                      <TextLabel text="Home Contact Number" />
                      <input
                        type="tel"
                        name="homeContactNumber"
                        value={formData.homeContactNumber}
                        onChange={handleInputChange}
                        placeholder="Enter Home Contact Number"
                        className={`w-full px-3 sm:px-4 py-2 text-sm sm:text-base border-2 ${
                          errors.homeContactNumber ? 'border-red-500' : 'border-gray-300'
                        } rounded-lg focus:ring-2 focus:ring-primary focus:border-primary placeholder-gray-400`}
                      />
                      {errors.homeContactNumber && (
                        <p className="mt-1 text-xs text-red-500">{errors.homeContactNumber}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <TextLabel text="Address" required />
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      rows={3}
                      placeholder="Enter Full Address"
                      className={`w-full px-3 sm:px-4 py-2 text-sm sm:text-base border-2 ${
                        errors.address ? 'border-red-500' : 'border-gray-300'
                      } rounded-lg focus:ring-2 focus:ring-primary focus:border-primary placeholder-gray-400`}
                    />
                    {errors.address && (
                      <p className="mt-1 text-xs text-red-500">{errors.address}</p>
                    )}
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-4 sm:space-y-6">
                  <SubText text="Education Details" color='green'/>
                  
                  {educationEntries.map((entry) => (
                    <div key={entry.id} className="space-y-3 sm:space-y-4 p-3 sm:p-4 border-2 border-gray-200 rounded-lg">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        <div>
                          <TextLabel text="Examination" required />
                          <select
                            value={entry.examination}
                            onChange={(e) => handleEducationChange(entry.id, 'examination', e.target.value)}
                            className={`w-full px-3 sm:px-4 py-2 text-sm sm:text-base border-2 ${
                              errors[`education_${entry.id}_examination`] ? 'border-red-500' : 'border-gray-300'
                            } rounded-lg focus:ring-2 focus:ring-primary focus:border-primary text-gray-600`}
                          >
                            <option value="">Select Examination</option>
                            <option value="sslc">SSLC</option>
                            <option value="hsc">Higher Secondary</option>
                            <option value="ug">UG</option>
                            <option value="pg">PG</option>
                          </select>
                          {errors[`education_${entry.id}_examination`] && (
                            <p className="mt-1 text-xs text-red-500">{errors[`education_${entry.id}_examination`]}</p>
                          )}
                        </div>
                        <div>
                          <TextLabel text="Board" required />
                          <select
                            value={entry.board}
                            onChange={(e) => handleEducationChange(entry.id, 'board', e.target.value)}
                            className={`w-full px-3 sm:px-4 py-2 text-sm sm:text-base border-2 ${
                              errors[`education_${entry.id}_board`] ? 'border-red-500' : 'border-gray-300'
                            } rounded-lg focus:ring-2 focus:ring-primary focus:border-primary text-gray-600`}
                          >
                            <option value="">Select Board</option>
                            <option value="state">State Board</option>
                            <option value="cbse">CBSE</option>
                            <option value="other">Other</option>
                          </select>
                          {errors[`education_${entry.id}_board`] && (
                            <p className="mt-1 text-xs text-red-500">{errors[`education_${entry.id}_board`]}</p>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        <div>
                          <TextLabel text="School/College Name" required />
                          <input
                            type="text"
                            value={entry.schoolName}
                            onChange={(e) => handleEducationChange(entry.id, 'schoolName', e.target.value)}
                            placeholder="Enter School/College Name"
                            className={`w-full px-3 sm:px-4 py-2 text-sm sm:text-base border-2 ${
                              errors[`education_${entry.id}_schoolName`] ? 'border-red-500' : 'border-gray-300'
                            } rounded-lg focus:ring-2 focus:ring-primary focus:border-primary placeholder-gray-400`}
                          />
                          {errors[`education_${entry.id}_schoolName`] && (
                            <p className="mt-1 text-xs text-red-500">{errors[`education_${entry.id}_schoolName`]}</p>
                          )}
                        </div>
                        <div>
                          <TextLabel text="Mark Percentage" required />
                          <input
                            type="number"
                            min="0"
                            max="100"
                            value={entry.percentage}
                            onChange={(e) => handleEducationChange(entry.id, 'percentage', e.target.value)}
                            placeholder="Enter Mark Percentage"
                            className={`w-full px-3 sm:px-4 py-2 text-sm sm:text-base border-2 ${
                              errors[`education_${entry.id}_percentage`] ? 'border-red-500' : 'border-gray-300'
                            } rounded-lg focus:ring-2 focus:ring-primary focus:border-primary placeholder-gray-400`}
                          />
                          {errors[`education_${entry.id}_percentage`] && (
                            <p className="mt-1 text-xs text-red-500">{errors[`education_${entry.id}_percentage`]}</p>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        <div>
                          <TextLabel text="Period of Education" required />
                          <div className="grid grid-cols-2 gap-2">
                            <input
                              type="month"
                              value={entry.startDate}
                              onChange={(e) => handleEducationChange(entry.id, 'startDate', e.target.value)}
                              placeholder="Start Date"
                              className={`w-full px-3 sm:px-4 py-2 text-sm sm:text-base border-2 ${
                                errors[`education_${entry.id}_startDate`] ? 'border-red-500' : 'border-gray-300'
                              } rounded-lg focus:ring-2 focus:ring-primary focus:border-primary text-gray-600`}
                            />
                            <input
                              type="month"
                              value={entry.endDate}
                              onChange={(e) => handleEducationChange(entry.id, 'endDate', e.target.value)}
                              placeholder="End Date"
                              className={`w-full px-3 sm:px-4 py-2 text-sm sm:text-base border-2 ${
                                errors[`education_${entry.id}_endDate`] ? 'border-red-500' : 'border-gray-300'
                              } rounded-lg focus:ring-2 focus:ring-primary focus:border-primary text-gray-600`}
                            />
                          </div>
                          {(errors[`education_${entry.id}_startDate`] || errors[`education_${entry.id}_endDate`]) && (
                            <p className="mt-1 text-xs text-red-500">
                              {errors[`education_${entry.id}_startDate`] || errors[`education_${entry.id}_endDate`]}
                            </p>
                          )}
                        </div>
                        {educationEntries.length > 1 && (
                          <div className="flex items-end">
                            <button
                              type="button"
                              onClick={() => handleRemoveEducation(entry.id)}
                              className="px-3 sm:px-4 py-2 text-primary hover:text-primary-dark"
                            >
                              Remove
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={handleAddEducation}
                    className="text-primary hover:text-primary-dark font-medium text-sm sm:text-base"
                  >
                    + Add Another Education
                  </button>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between items-center gap-3 sm:gap-4 mt-6 sm:mt-8">
                {currentStep > 1 && (
                  <Button
                    variant="primary"
                    onClick={handlePrevStep}
                    className='border-2 border-green-500 text-green-500 '
                  >
                    ← Back
                  </Button>
                )}
                {currentStep === 2 ? (
                  <Button
                    variant="primary"
                    onClick={handleSubmitApplication}
                    className={`ml-auto border-2 border-green-500 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Application'}
                  </Button>
                ) : (
                  <Button
                    variant="primary"
                    onClick={handleNextStep}
                    className="ml-auto border-2 border-green-500 text-sm px-2 sm:px-3 py-1.5"
                  >
                    Save & Next
                  </Button>
                )}
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
} 