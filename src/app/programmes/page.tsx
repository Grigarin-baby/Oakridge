"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Heading from "@/components/common/Heading";
import SubHeading from "@/components/common/SubHeading";
import TextLabel from "@/components/common/TextLabel";
import SubText from "@/components/common/SubText";
import Navbar from "@/components/Navbar";
import Button from "@/components/common/Button";
import { FaArrowRight } from "react-icons/fa";

const departmentTabs = [
  { id: "commerce", name: "Commerce" },
  { id: "english", name: "English" },
  { id: "computer-application", name: "Computer Science" },
];

export default function ProgramsPage() {
  const [isClient, setIsClient] = useState(false);
  const [activeDepartment, setActiveDepartment] = useState("commerce");
  const [activeCourse, setActiveCourse] = useState<string | null>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const departments = [
    {
      id: "commerce",
      title: "Department of Commerce",
      description:
        "Developing business leaders with practical knowledge and ethical values",
      image: "/images/commerce.jpg",
      about:
        "Our Commerce department provides comprehensive education in business principles, financial management, and commercial practices, preparing students for diverse careers in the corporate world.",
      courses: [
        {
          id: "bcom-finance",
          title: "BCom Finance",
          description:
            "Specialized program focusing on financial management, investment analysis, and banking operations",
          duration: "3 years (6 semesters)",
          eligibility: "Plus Two in any stream with minimum 50% marks",
          highlights: [
            "Covers financial accounting, corporate finance, and investment management",
            "Includes practical training in financial software and tools",
            "Industry visits and guest lectures from finance professionals",
          ],
          career:
            "Financial analyst, investment banker, accountant, tax consultant, banking professional",
        },
        {
          id: "bcom-computer-application",
          title: "BCom Computer Application",
          description:
            "Integration of commerce education with computer applications for modern business needs",
          duration: "3 years (6 semesters)",
          eligibility: "Plus Two in any stream with minimum 50% marks",
          highlights: [
            "Focus on business applications of computer technology",
            "Hands-on training in accounting and business software",
            "Industry-relevant curriculum with practical exposure",
          ],
          career:
            "Business analyst, systems analyst, database administrator, IT consultant",
        },
      ],
    },
    {
      id: "english",
      title: "Department of English",
      description:
        "Nurturing critical thinking and communication skills through literature and language studies",
      image: "/images/english.jpg",
      about:
        "Our English department fosters analytical thinking, creativity, and effective communication through the study of literature, language, and critical theory.",
      courses: [
        {
          id: "ba-english",
          title: "BA English Language and Literature",
          description:
            "Comprehensive study of English literature, language, and critical theory",
          duration: "3 years (6 semesters)",
          eligibility: "Plus Two in any stream with minimum 45% marks",
          highlights: [
            "In-depth study of British, American, and World literature",
            "Creative writing and communication skills development",
            "Workshops with renowned authors and scholars",
          ],
          career:
            "Content writer, editor, teacher, journalist, public relations officer",
        },
      ],
    },
    {
      id: "computer-application",
      title: "Department of Computer Applications",
      description:
        "Empowering students with cutting-edge technical skills for the digital age",
      image: "/images/computer-science.jpg",
      about:
        "Our Computer Applications department provides hands-on training in software development, programming, and IT solutions, preparing students for careers in the technology sector.",
      courses: [
        {
          id: "bca",
          title: "Bachelor of Computer Applications (BCA)",
          description:
            "Comprehensive program in computer applications and software development",
          duration: "3 years (6 semesters)",
          eligibility:
            "Plus Two with Mathematics/Computer Science with minimum 50% marks",
          highlights: [
            "Project-based learning approach",
            "Industry-aligned curriculum with latest technologies",
            "Internship opportunities with leading IT companies",
          ],
          career:
            "Software developer, web developer, system analyst, database administrator",
        },
      ],
    },
  ];

  const currentDepartment =
    departments.find((dept) => dept.id === activeDepartment) || departments[0];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="min-h-screen  bg-black" role="main">
        {/* Hero Section */}
        <header
          className="relative h-screen flex items-center justify-center overflow-hidden"
          role="banner"
        >
          {/* Background Image */}
          <div className="absolute inset-0 -z-10">
            <Image
              src="/images/ilahiya-college.jpg"
              alt="Oakridge College Campus - A panoramic view of our educational institution"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/5" />
          </div>

          {/* Green Overlay with 45-degree cut */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-green-700 clip-hero" />
          </div>

          <div className="container mx-auto px-4 text-center text-black relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-4"
            >
              <TextLabel
                text="ACADEMIC PROGRAMMES"
                className="bg-white/20 px-4 py-2 rounded-full inline-block text-white tracking-wider"
              />
            </motion.div>
            <h1 className="sr-only">Explore Our Academic Programmes</h1>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Heading
                text={
                  <span>
                    Explore Our{" "}
                    <span className="text-green-300">Programmes</span>
                  </span>
                }
                color="white"
                className="mb-6 leading-tight"
              />
              <SubText
                text="Discover a world of opportunities with our comprehensive range of academic programmes designed to shape future leaders."
                color="light"
                size="large"
                className="max-w-3xl mx-auto"
              />
            </motion.div>
          </div>
        </header>

        {/* Department Tabs */}
        <div className="bg-white w-full shadow-sm  top-[64px] z-20 md:px-6 ">
          <div className="md:px-10 w-full  ">
            <div className="flex overflow-x-auto hide-scrollbar">
              <div className="flex  px-1 md:px-0 ">
                {departmentTabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveDepartment(tab.id)}
                    className={` px-4 md:px-6 py-4 transition-colors duration-200 ${
                      activeDepartment === tab.id
                        ? "border-b-2 border-green-600"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    <SubHeading
                      text={tab.name}
                      color={activeDepartment === tab.id ? "green" : "gray"}
                      isActive={activeDepartment === tab.id}
                      className="whitespace-nowrap"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Department Content */}
        <section className="py-16 bg-white w-full px-5">
          <div className=" mx-auto md:px-16 ">
            <div className="flex flex-col lg:flex-row gap-12">
              {/* Department Info */}
              <div className="md:w-[800px] w-full  ">
                <div className="sticky top-24">
                  <div className="  min-h-[400px] md:w-auto w-full relative rounded-xl overflow-hidden mb-6">
                    <Image
                      src={currentDepartment.image}
                      alt={currentDepartment.title}
                      width={700}
                      height={500}
                      className="w-full h-64 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-6">
                      <SubHeading
                        text="Department of Commerce"
                        color="white"
                        className="mb-2"
                      />
                    </div>
                  </div>

                  <div className="bg-gray-50 border-2 md:border-0 md:shadow-sm md:shadow-black  p-6 rounded-lg">
                    <SubHeading
                      text="About the Department"
                      className="  mb-3"
                    />
                    <TextLabel
                      text={currentDepartment.about}
                      className="text-gray-600  mb-4"
                    />
                  </div>
                </div>
              </div>

              {/* Courses List */}
              <div className="lg:w-2/3">
                <div className="space-y-6">
                  {currentDepartment.courses.map((course) => (
                    <motion.div
                      key={course.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300"
                    >
                      <div
                        className="p-6 cursor-pointer"
                        onClick={() =>
                          setActiveCourse(
                            activeCourse === course.id ? null : course.id
                          )
                        }
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <SubHeading
                              text={course.title}
                              className="mb-1 text-gray-900"
                            />

                            <TextLabel
                              text={course.description}
                              className="text-gray-600"
                            />
                          </div>
                          <button className="text-gray-400 hover:text-gray-600">
                            <svg
                              className={`w-5 h-5 transform transition-transform ${
                                activeCourse === course.id ? "rotate-180" : ""
                              }`}
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M19 9l-7 7-7-7"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>

                      <AnimatePresence>
                        {activeCourse === course.id && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="px-6 pb-6 pt-0 space-y-4">
                              <div>
                                <SubText
                                  text="Duration"
                                  className=" text-gray-900 mb-1"
                                />

                                <TextLabel
                                  text={course.duration}
                                  className="text-gray-600"
                                />
                              </div>
                              <div>
                                <SubText
                                  text=" Eligibility"
                                  className=" text-gray-900 mb-1"
                                />

                                <TextLabel
                                  text={course.eligibility}
                                  className="text-gray-600"
                                />
                              </div>
                              <div>
                                <SubText
                                  text="       Programme Highlights"
                                  className="font-medium text-gray-900 mb-1"
                                />

                                <ul className="list-disc pl-5 text-gray-600 space-y-1">
                                  {course.highlights.map((highlight, index) => (
                                    <li key={index}>
                                      <TextLabel
                                        text={highlight}
                                        className="text-gray-600"
                                      />
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              <div>
                                <SubText
                                  text="Career Opportunities"
                                  className=" text-gray-900 mb-1"
                                />

                                <TextLabel text= {course.career} className="text-gray-600"/>
                              </div>
                              <div className="pt-2">
                                <Link
                                  href="/admission"
                                  className="inline-flex items-center text-green-600 hover:text-green-700 font-medium"
                                >
                                  Apply Now
                                  <svg
                                    className="w-4 h-4 ml-1"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                                    />
                                  </svg>
                                </Link>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-green-700 to-green-800 text-white">
          <div className="  md:container mx-auto px-3 md:px-6 text-center">
            <div className="md:max-w-5xl   mx-auto">
              <Heading text=" Ready to Start Your Journey?" className=" text-white mb-6"/>
               
              
              <SubText text="  Join our community of learners and take the first step towards a
                successful career." className=" text-gray-100 mb-8"/>  
              <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button
                variant="primary"
                href="/admission"
                icon={FaArrowRight({ className: "w-4 h-4" })}
              >
                <TextLabel
                  text={<span className="hidden md:inline">Apply Now</span>}
                  color="green"
                  variant="button"
                />
                <TextLabel
                  text={<span className="inline md:hidden">Apply</span>}
                  color="green"
                  variant="button"
                />
              </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
