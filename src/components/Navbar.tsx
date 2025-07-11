import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "./ThemeToggle";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
  ];

  // Fungsi untuk mendeteksi section yang aktif saat scrolling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Deteksi section aktif
      const sections = navLinks.map((link) => link.href.substring(1));

      // Temukan section yang sedang dalam viewport
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section) {
          const rect = section.getBoundingClientRect();
          // Section dianggap visible jika bagian atasnya berada dalam 30% atas viewport
          if (rect.top <= window.innerHeight * 0.3 && rect.bottom >= 0) {
            if (activeSection !== sections[i]) {
              setActiveSection(sections[i]);
            }
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeSection, navLinks]);

  const scrollToSection = (sectionId: string) => {
    setIsOpen(false);
    const element = document.querySelector(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      // Update active section
      setActiveSection(sectionId.substring(1));
    }
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-md py-3 shadow-md"
          : "py-5 bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
        <motion.a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection("#home");
          }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center"
        >
          <img
            src="./images/logo.png"
            alt="Logo"
            className="h-8 sm:h-9 md:h-10 w-auto object-contain"
          />
        </motion.a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link, index) => (
            <motion.button
              key={index}
              onClick={() => scrollToSection(link.href)}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors py-1 ${
                activeSection === link.href.substring(1)
                  ? "text-indigo-600 dark:text-indigo-400"
                  : ""
              }`}
            >
              {link.name}
              {activeSection === link.href.substring(1) && (
                <motion.div
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600 dark:bg-indigo-400 rounded-full"
                  layoutId="activeNavIndicator"
                  transition={{ duration: 0.3 }}
                />
              )}
            </motion.button>
          ))}
          <ThemeToggle />
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center space-x-3">
          <ThemeToggle />
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-gray-700 dark:text-gray-300"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white dark:bg-gray-900 overflow-hidden"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
              {navLinks.map((link, index) => (
                <motion.button
                  key={index}
                  onClick={() => scrollToSection(link.href)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className={`relative text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 py-2 transition-colors ${
                    activeSection === link.href.substring(1)
                      ? "text-indigo-600 dark:text-indigo-400"
                      : ""
                  }`}
                >
                  <span>{link.name}</span>
                  {activeSection === link.href.substring(1) && (
                    <motion.div
                      className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600 dark:bg-indigo-400 rounded-full"
                      layoutId="activeMobileNavIndicator"
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
