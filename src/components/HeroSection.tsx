import React, { Suspense, useEffect, useState, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { motion } from "framer-motion";
import WorkstationModel from "./WorkstationModel";

// Add this component to the top of your HeroSection.tsx file
const TypewriterEffect: React.FC<{
  text: string;
  delay?: number;
  initialDelay?: number;
}> = ({ text, delay = 50, initialDelay = 0 }) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    // Initial delay before typing starts
    const startTimeout = setTimeout(() => {
      setStarted(true);
    }, initialDelay);

    return () => clearTimeout(startTimeout);
  }, [initialDelay]);

  useEffect(() => {
    if (!started) return;

    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, delay);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, delay, text, started]);

  // Blinking cursor effect
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    // Only blink cursor when typing is complete
    if (currentIndex >= text.length) {
      const cursorInterval = setInterval(() => {
        setShowCursor((prev) => !prev);
      }, 500);

      return () => clearInterval(cursorInterval);
    }
  }, [currentIndex, text.length]);

  return (
    <span>
      {displayText}
      {currentIndex < text.length && (
        <span className="text-indigo-500 dark:text-indigo-400 animate-pulse">
          |
        </span>
      )}
      {currentIndex >= text.length && showCursor && (
        <span className="text-indigo-500 dark:text-indigo-400">|</span>
      )}
    </span>
  );
};

const HeroSection: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const bgRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);

  // Track mouse movement and scroll for effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section id="home" className="relative h-screen w-full overflow-hidden">
      {/* Minimalist Geometric Background */}
      <div ref={bgRef} className="absolute inset-0 bg-white dark:bg-gray-950">
        {/* Geometric Elements */}
        <div className="absolute inset-0">
          {/* Large Circle */}
          <div
            className="absolute w-[700px] h-[700px] rounded-full border-[40px] border-gray-100/60 dark:border-gray-800/60"
            style={{
              top: `calc(50% - 350px)`,
              right: `-250px`,
              transform: `translateY(${mousePosition.y * -20}px)`,
              transition: "transform 0.7s ease-out",
            }}
          ></div>

          {/* Medium Square */}
          <div
            className="absolute w-96 h-96 border-[20px] border-gray-100/70 dark:border-gray-800/70"
            style={{
              top: "15%",
              left: "10%",
              transform: `rotate(45deg) translate(${mousePosition.x * -10}px, ${
                mousePosition.y * 10
              }px)`,
              transition: "transform 0.6s ease-out",
            }}
          ></div>

          {/* Small Triangles */}
          <svg
            className="absolute top-[70%] left-[30%] opacity-60 dark:opacity-50"
            width="120"
            height="120"
            style={{
              transform: `translate(${mousePosition.x * 20}px, ${
                mousePosition.y * -15
              }px)`,
              transition: "transform 0.4s ease-out",
            }}
          >
            <polygon
              points="60,10 110,100 10,100"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
            />
          </svg>

          <svg
            className="absolute top-[20%] right-[20%] opacity-40 dark:opacity-30"
            width="80"
            height="80"
            style={{
              transform: `translate(${mousePosition.x * -15}px, ${
                mousePosition.y * 15
              }px)`,
              transition: "transform 0.5s ease-out",
            }}
          >
            <polygon
              points="40,5 75,70 5,70"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-gray-100 opacity-90 dark:from-gray-950 dark:via-gray-900 dark:to-gray-800 dark:opacity-95"></div>

        {/* Grid Lines */}
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 opacity-[0.07] dark:opacity-[0.1]"
            style={{
              backgroundSize: "30px 30px",
              backgroundImage: `
                linear-gradient(to right, currentColor 1px, transparent 1px),
                linear-gradient(to bottom, currentColor 1px, transparent 1px)
              `,
              backgroundPosition: `${mousePosition.x * 10}px ${
                mousePosition.y * 10
              }px`,
              transition: "background-position 0.3s ease-out",
            }}
          ></div>
        </div>

        {/* Accent Lines */}
        <div
          className="absolute h-0.5 w-40 bg-indigo-500/40 dark:bg-indigo-400/30"
          style={{
            top: "35%",
            left: "5%",
            transform: `translateX(${mousePosition.x * 20}px)`,
            transition: "transform 0.5s ease-out",
          }}
        ></div>

        <div
          className="absolute h-40 w-0.5 bg-indigo-500/40 dark:bg-indigo-400/30"
          style={{
            top: "50%",
            right: "15%",
            transform: `translateY(${mousePosition.y * 20}px)`,
            transition: "transform 0.5s ease-out",
          }}
        ></div>

        {/* Dynamic Dots */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(30)].map((_, i) => {
            const size = 3 + Math.random() * 4;
            return (
              <div
                key={i}
                className="absolute rounded-full bg-indigo-500/30 dark:bg-indigo-400/20"
                style={{
                  width: `${size}px`,
                  height: `${size}px`,
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  transform: `translate(${
                    mousePosition.x * (Math.random() * 50 - 25)
                  }px, ${mousePosition.y * (Math.random() * 50 - 25)}px)`,
                  transition: `transform ${
                    0.3 + Math.random() * 0.7
                  }s ease-out`,
                }}
              ></div>
            );
          })}
        </div>

        {/* Subtle Vignette */}
        <div className="absolute inset-0 bg-radial-minimal pointer-events-none"></div>
      </div>

      {/* Content Container */}
      <div className="relative container mx-auto px-4 h-full flex flex-col md:flex-row items-center justify-center">
        {/* Text Content */}
        <motion.div
          className="md:w-1/2 z-10 text-center md:text-left pb-8 md:pb-0"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-sm font-medium text-indigo-600 dark:text-indigo-400 mb-4"
          >
            WELCOME TO MY PORTFOLIO
          </motion.div>
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Hi, I'm{" "}
            <span className="text-indigo-600 dark:text-indigo-400">
              Wahyu Bagus Setiawan
            </span>
          </motion.h1>
          <motion.h2
            className="text-2xl md:text-3xl font-medium text-gray-700 dark:text-gray-300 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Fullstack Developer
          </motion.h2>
          <motion.p
            className="text-gray-600 dark:text-gray-400 mb-8 max-w-lg mx-auto md:mx-0 h-[4.5rem] md:h-[4.5rem]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <TypewriterEffect
              text="Creating beautiful, functional, and user-friendly applications with modern technologies. Specializing in web and mobile development. "
              delay={40}
              initialDelay={1000}
            />
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <a
              href="#projects"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
            >
              View My Work
            </a>
            <a
              href="#contact"
              className="bg-transparent hover:bg-gray-200 dark:hover:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 px-6 py-3 rounded-lg font-medium transition-colors duration-200"
            >
              Contact Me
            </a>
          </motion.div>
        </motion.div>

        {/* 3D Model */}
        <motion.div
          className="md:w-1/2 h-[350px] md:h-[600px] w-full" // Increased height
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <Canvas
            camera={{ position: [0, 0, 8], fov: 40 }} // Adjusted camera for better view
            style={{ width: "100%", height: "100%" }}
          >
            <Suspense fallback={null}>
              <WorkstationModel />
              <OrbitControls
                enableZoom={false}
                enablePan={false}
                minPolarAngle={Math.PI / 4}
                maxPolarAngle={Math.PI / 2}
              />
            </Suspense>
          </Canvas>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 1,
          duration: 0.5,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      >
        <div className="w-8 h-12 rounded-full border-2 border-gray-400 dark:border-gray-600 flex justify-center items-start p-1">
          <motion.div
            className="w-1.5 h-1.5 rounded-full bg-gray-400 dark:bg-gray-600"
            animate={{ y: [0, 16, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop" }}
          />
        </div>
      </motion.div>

      {/* Custom Styles */}
      <style jsx>{`
        .bg-radial-minimal {
          background: radial-gradient(
            circle at center,
            transparent 50%,
            rgba(0, 0, 0, 0.03) 80%,
            rgba(0, 0, 0, 0.06) 100%
          );
        }

        /* Dark mode adjustments */
        :global(.dark) .bg-radial-minimal {
          background: radial-gradient(
            circle at center,
            transparent 50%,
            rgba(0, 0, 0, 0.3) 80%,
            rgba(0, 0, 0, 0.5) 100%
          );
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
