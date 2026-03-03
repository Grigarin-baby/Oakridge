"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, AnimatePresence } from "framer-motion";
import { FaUser, FaChevronDown, FaBars, FaTimes } from "react-icons/fa";
import { usePathname, useRouter } from "next/navigation";
import Button from "@/components/common/Button";
import TextLabel from "@/components/common/TextLabel";

const mainNavItems = [
  {
    title: "HOME",
    href: "/",
    elementId: "home",
  },
  {
    title: "ABOUT",
    href: "/#about",
    elementId: "about",
  },
  {
    title: "PROGRAMMES",
    href: "/#programs",
    elementId: "programs",
  },
  {
    title: "FACULTY",
    href: "/about/faculty",
  },
  {
    title: "GALLERY",
    href: "/gallery",
  },
  {
    title: "CONTACT",
    href: "/#contact-section",
    elementId: "contact-section",
  },
];

const menuVariants = {
  closed: {
    opacity: 0,
    x: "100%",
    transition: {
      duration: 0.2,
      staggerChildren: 0,
      staggerDirection: -1,
      when: "afterChildren",
    },
  },
  open: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.25,
      type: "spring",
      stiffness: 200,
      damping: 20,
      staggerChildren: 0.05,
      delayChildren: 0.1,
      when: "beforeChildren",
    },
  },
};

const menuItemVariants = {
  closed: {
    opacity: 0,
    x: 20,
    transition: {
      duration: 0.15,
    },
  },
  open: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.2,
      type: "spring",
      stiffness: 150,
      damping: 20,
    },
  },
};

const backdropVariants = {
  closed: {
    opacity: 0,
    transition: {
      duration: 0.15,
    },
  },
  open: {
    opacity: 1,
    transition: {
      duration: 0.2,
    },
  },
};

const closeButtonVariants = {
  closed: {
    opacity: 0,
    rotate: -180,
    transition: {
      duration: 0.15,
    },
  },
  open: {
    opacity: 1,
    rotate: 0,
    transition: {
      duration: 0.2,
      delay: 0.1,
    },
  },
};

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const pathname = usePathname();

  useEffect(() => {
    const unsubscribe = scrollY.on("change", (latest) => {
      setIsScrolled(latest > 50);
    });
    return () => unsubscribe();
  }, [scrollY]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-sm border-b border-white/10 ${
        isScrolled ? "bg-green-700/90" : "bg-black/20"
      }`}
      initial={{ y: 0 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-full">
        <nav className="flex items-center justify-between h-16 px-5 md:pr-[6.5rem] md:pl-[90px]">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="relative w-8 h-8 rounded-full overflow-hidden bg-white">
              <Image
                src="/images/Oakridge_logo.png"
                alt="Oakridge College Logo"
                fill
                className="object-cover"
                priority
              />
            </div>
            <TextLabel
              text="OAKRIDGE"
              color="white"
              variant="nav"
              className="text-xl font-bold"
            />
          </Link>

          {/* Navigation Links - Desktop */}
          <div className="hidden lg:flex items-center space-x-6">
            {mainNavItems.map((item) => (
              <NavLink
                key={item.href}
                item={item}
                isMobileMenuOpen={isMobileMenuOpen}
                setIsMobileMenuOpen={setIsMobileMenuOpen}
              />
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden text-white p-2 focus:outline-none"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <FaTimes className="w-6 h-6" />
            ) : (
              <FaBars className="w-6 h-6" />
            )}
          </button>

          {/* Student Portal Button - Desktop */}
          <div className="hidden lg:block">
            <Button
              variant="secondary"
              href="#"
              className="bg-transparent text-green-600 border-2 border-green-600 hover:bg-green-50"
            >
              <TextLabel
                text="STUDENT PORTAL"
                variant="primary"
                color="white"
              />
            </Button>
          </div>
        </nav>

        {/* Mobile Menu Overlay */}
        <AnimatePresence mode="wait">
          {isMobileMenuOpen && (
            <motion.div
              className="fixed inset-0 z-[9999] lg:hidden overflow-hidden"
              initial="closed"
              animate="open"
              exit="closed"
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
              }}
            >
              {/* Backdrop */}
              <motion.div
                variants={backdropVariants}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm"
                onClick={() => setIsMobileMenuOpen(false)}
              />

              {/* Menu Content */}
              <motion.div
                variants={menuVariants}
                className="fixed right-0 top-0 h-[100dvh] w-64 bg-green-700 shadow-lg py-6 px-4 overflow-y-auto overflow-x-hidden will-change-transform"
                style={{
                  WebkitBackfaceVisibility: "hidden",
                  backfaceVisibility: "hidden",
                }}
              >
                {/* Close Button */}
                <motion.button
                  variants={closeButtonVariants}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="absolute top-4 right-4 p-2 text-white hover:text-green-100 focus:outline-none"
                  aria-label="Close menu"
                >
                  <FaTimes className="w-6 h-6" />
                </motion.button>

                {/* Menu Title */}
                <motion.div
                  variants={menuItemVariants}
                  className="mb-8 pb-4 border-b border-white/10"
                >
                  <TextLabel
                    text="MENU"
                    color="white"
                    variant="nav"
                    className="text-xl font-bold"
                  />
                </motion.div>

                <div className="flex flex-col space-y-4">
                  {mainNavItems.map((item) => (
                    <motion.div
                      key={item.href}
                      variants={menuItemVariants}
                      whileHover={{ x: 5 }}
                      className="border-b border-white/10 py-2"
                    >
                      <Link
                        href={item.href}
                        className="text-white hover:text-green-100 transition-colors duration-300"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <TextLabel
                          text={item.title}
                          color="white"
                          variant="nav"
                        />
                      </Link>
                    </motion.div>
                  ))}

                  {/* Student Portal Button - Mobile */}
                  <motion.div
                    variants={menuItemVariants}
                    whileHover={{ scale: 1.02 }}
                    className="flex justify-center"
                  >
                    <Button
                      variant="secondary"
                      href="#"
                      className="bg-transparent text-green-600 border-2 border-green-600 hover:bg-green-50"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <TextLabel
                        text="STUDENT PORTAL"
                        variant="primary"
                        color="white"
                        className="text-center"
                      />
                    </Button>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}

function NavLink({
  item,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
}: {
  item: NavItem;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const scrollTohash = (hash: string) => {
    const element = document.getElementById(hash);
    if (element) {
      const navHeight = 64; // Height of the fixed navbar
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (item.elementId) {
      e.preventDefault();
      if (pathname !== "/") {
        router.push(item.href);
        if (isMobileMenuOpen) setIsMobileMenuOpen(false);
      } else {
        scrollTohash(item.elementId);
        if (isMobileMenuOpen) setIsMobileMenuOpen(false);
      }
    }
  };

  return (
    <div
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link
        href={item.href}
        onClick={item.elementId ? handleClick : undefined}
        className="flex items-center gap-1 hover:text-green-100 transition-colors duration-300"
        legacyBehavior
        passHref
      >
        <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <TextLabel
            text={item.title}
            color={isHovered ? "green-100" : "white"}
            variant="nav"
          />
          {item.subItems && <FaChevronDown className="text-xs text-white" />}
        </motion.a>
      </Link>

      {item.subItems && (
        <div className="absolute top-full left-0 mt-2 py-2 bg-white rounded-lg shadow-lg min-w-[200px] invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-300">
          {item.subItems.map((subItem) => (
            <Link
              key={subItem.href}
              href={subItem.href}
              className="block px-4 py-2 hover:bg-green-50 transition-colors"
            >
              <TextLabel text={subItem.title} color="white" variant="nav" />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

interface NavItem {
  title: string;
  href: string;
  elementId?: string;
  subItems?: { title: string; href: string }[];
}
