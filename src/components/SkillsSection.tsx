import React, { useState, useRef, useEffect } from "react";
import { motion, useAnimation, useScroll, useTransform } from "framer-motion";
import { skills } from "../data";

const SkillsSection: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeCategory, setActiveCategory] = useState("All");
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Extract unique categories
  const categories = ["All", ...new Set(skills.map((skill) => skill.category))];

  // Filter skills based on active category
  const filteredSkills =
    activeCategory === "All"
      ? skills
      : skills.filter((skill) => skill.category === activeCategory);

  // Parallax effect values based on scroll
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -15]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 15]);

  // Track mouse position for spotlight effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      setMousePosition({ x, y });
    };

    const sectionEl = sectionRef.current;
    if (sectionEl) {
      sectionEl.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      if (sectionEl) {
        sectionEl.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, []);

  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
    hover: {
      scale: 1.03,
      y: -3,
      zIndex: 5,
      boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
      transition: { duration: 0.25 },
    },
  };

  // Prepare skills for marquee (create optimized rows)
  const createMarqueeRows = () => {
    if (filteredSkills.length <= 6) return [filteredSkills, []];

    // For better visual balance, create rows with similar skill types together
    const sortedSkills = [...filteredSkills].sort((a, b) => {
      // Sort by category then by name for more visual coherence
      if (a.category === b.category) {
        return a.name.localeCompare(b.name);
      }
      return a.category.localeCompare(b.category);
    });

    const midpoint = Math.ceil(sortedSkills.length / 2);
    const firstRow = sortedSkills.slice(0, midpoint);
    const secondRow = sortedSkills.slice(midpoint);

    return [firstRow, secondRow];
  };

  const [firstRow, secondRow] = createMarqueeRows();

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="py-20 relative overflow-hidden"
    >
      {/* Upgraded Spotlight Effect */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950"
        style={{
          backgroundImage: `radial-gradient(
            circle 800px at ${mousePosition.x}px ${mousePosition.y}px,
            rgba(99, 102, 241, 0.15),
            rgba(99, 102, 241, 0.05) 40%,
            transparent 60%
          )`,
        }}
      />

      {/* Enhanced Background Patterns */}
      <div className="absolute inset-0 overflow-hidden opacity-30 dark:opacity-20">
        <div className="absolute top-0 left-0 w-full h-full bg-pattern-grid"></div>

        {/* Floating Elements */}
        <motion.div
          className="absolute top-[10%] right-[10%] w-32 h-32 border-4 border-indigo-200 dark:border-indigo-900 rounded-full opacity-50"
          animate={{
            y: [0, -15, 0],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        ></motion.div>

        <motion.div
          className="absolute bottom-[20%] left-[5%] w-64 h-64 border-2 border-indigo-200 dark:border-indigo-900 rounded-xl opacity-30 transform rotate-12"
          animate={{
            y: [0, 20, 0],
            rotate: [12, 20, 12],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        ></motion.div>

        <motion.div
          className="absolute top-[30%] left-[15%] w-16 h-16 bg-indigo-100 dark:bg-indigo-900/20 rounded-lg opacity-30 transform -rotate-12"
          animate={{
            x: [0, 10, 0],
            rotate: [-12, -20, -12],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        ></motion.div>

        <motion.div
          className="absolute bottom-[10%] right-[25%] w-20 h-20 bg-indigo-100 dark:bg-indigo-900/20 rounded-lg opacity-30 transform rotate-45"
          animate={{
            y: [0, -15, 0],
            rotate: [45, 60, 45],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        ></motion.div>
      </div>

      <div className="container mx-auto px-4 relative z-10" ref={containerRef}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <div className="inline-block px-3 py-1 bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-300 rounded-full text-sm font-medium mb-4">
            My Expertise
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Professional{" "}
            <span className="text-indigo-600 dark:text-indigo-400">Skills</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            I've worked with a variety of technologies in the web and mobile
            development world. Here are some of my areas of expertise.
          </p>
        </motion.div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === category
                  ? "bg-indigo-600 text-white dark:bg-indigo-500"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Fixed layout for small skill sets */}
        {filteredSkills.length <= 6 ? (
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-6"
          >
            {filteredSkills.map((skill) => (
              <motion.div
                key={skill.id}
                variants={cardVariants}
                whileHover="hover"
              >
                <div className="bg-white/90 backdrop-blur-sm dark:bg-gray-800/90 rounded-xl overflow-hidden shadow-lg transition-all duration-300 h-full border border-gray-100 dark:border-gray-700 group">
                  <div className={`h-2 ${skill.color} w-full`}></div>
                  <div className="p-6">
                    <div className="flex flex-col items-center mb-4">
                      <div className="relative w-16 h-16 mb-4 flex items-center justify-center rounded-lg bg-white dark:bg-gray-700 shadow-md group-hover:shadow-lg transition-all">
                        {skill.logoUrl ? (
                          <img
                            src={skill.logoUrl}
                            alt={skill.name}
                            className="w-10 h-10 object-contain group-hover:scale-110 transition-transform duration-300"
                          />
                        ) : (
                          <div
                            className={`text-3xl ${
                              skill.textColor ||
                              "text-gray-700 dark:text-gray-300"
                            } group-hover:scale-110 transition-transform duration-300`}
                          >
                            {skill.icon}
                          </div>
                        )}
                        <div className="absolute -inset-0.5 rounded-lg bg-gradient-to-br from-indigo-400 to-purple-400 opacity-0 group-hover:opacity-30 dark:group-hover:opacity-40 transition-opacity duration-300 blur"></div>
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        {skill.name}
                      </h3>
                      <div className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300">
                        {skill.category || "Development"}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
                          <span>Proficiency</span>
                          <span className="font-medium">
                            {skill.level || 90}%
                          </span>
                        </div>
                        <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level || 90}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 0.3 }}
                            className={`h-full ${skill.color} opacity-90 dark:opacity-80 rounded-full group-hover:opacity-100`}
                          ></motion.div>
                        </div>
                      </div>

                      {skill.features && skill.features.length > 0 && (
                        <div className="mt-4">
                          <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">
                            Key Features:
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {skill.features.slice(0, 3).map((feature, idx) => (
                              <span
                                key={idx}
                                className="inline-block px-2 py-0.5 text-xs rounded-md bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                              >
                                {feature}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="relative py-6 overflow-hidden">
            {/* First Row Marquee - Improved */}
            <div className="relative mb-8">
              {/* Improved Gradient masks */}
              <div className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-white dark:from-gray-950 to-transparent pointer-events-none"></div>
              <div className="absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-white dark:from-gray-950 to-transparent pointer-events-none"></div>

              <div className="overflow-hidden">
                {/* Improved marquee with proper spacing and timing */}
                <div className="flex py-4">
                  <motion.div
                    className="flex gap-6 min-w-max"
                    style={{ y: y1 }}
                    animate={{
                      x: [0, -100 * firstRow.length],
                    }}
                    transition={{
                      x: {
                        repeat: Infinity,
                        repeatType: "loop",
                        duration: Math.max(25, firstRow.length * 3.5),
                        ease: "linear",
                      },
                    }}
                  >
                    {/* Original Cards */}
                    {firstRow.map((skill) => (
                      <SkillCard key={`original-${skill.id}`} skill={skill} />
                    ))}

                    {/* Clone cards for seamless loop */}
                    {firstRow.map((skill) => (
                      <SkillCard key={`clone-${skill.id}`} skill={skill} />
                    ))}
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Second Row Marquee - Improved */}
            {secondRow.length > 0 && (
              <div className="relative">
                {/* Improved Gradient masks */}
                <div className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-white dark:from-gray-950 to-transparent pointer-events-none"></div>
                <div className="absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-white dark:from-gray-950 to-transparent pointer-events-none"></div>

                <div className="overflow-hidden">
                  {/* Improved marquee with proper spacing and timing */}
                  <div className="flex py-4">
                    <motion.div
                      className="flex gap-6 min-w-max"
                      style={{ y: y2 }}
                      animate={{
                        x: [-100 * secondRow.length, 0],
                      }}
                      transition={{
                        x: {
                          repeat: Infinity,
                          repeatType: "loop",
                          duration: Math.max(25, secondRow.length * 3.5),
                          ease: "linear",
                        },
                      }}
                    >
                      {/* Clone cards for seamless loop */}
                      {secondRow.map((skill) => (
                        <SkillCard key={`clone2-${skill.id}`} skill={skill} />
                      ))}

                      {/* Original Cards */}
                      {secondRow.map((skill) => (
                        <SkillCard
                          key={`original2-${skill.id}`}
                          skill={skill}
                        />
                      ))}
                    </motion.div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Enhanced Interactive Note */}
        <motion.div
          className="text-center mt-10 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm py-3 px-6 rounded-full shadow-md inline-block mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <p className="text-gray-600 dark:text-gray-300 text-sm flex items-center justify-center gap-2">
            <span className="inline-block animate-pulse text-indigo-500 dark:text-indigo-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M12 16v-4"></path>
                <path d="M12 8h.01"></path>
              </svg>
            </span>
            Hover over any skill to see details and filter by category
          </p>
        </motion.div>
      </div>

      {/* CSS for background pattern */}
      <style jsx>{`
        .bg-pattern-grid {
          background-image: linear-gradient(
              to right,
              rgba(99, 102, 241, 0.1) 1px,
              transparent 1px
            ),
            linear-gradient(
              to bottom,
              rgba(99, 102, 241, 0.1) 1px,
              transparent 1px
            );
          background-size: 40px 40px;
        }

        @media (prefers-color-scheme: dark) {
          .bg-pattern-grid {
            background-image: linear-gradient(
                to right,
                rgba(99, 102, 241, 0.05) 1px,
                transparent 1px
              ),
              linear-gradient(
                to bottom,
                rgba(99, 102, 241, 0.05) 1px,
                transparent 1px
              );
          }
        }
      `}</style>
    </section>
  );
};

// Extracted SkillCard component for better readability
const SkillCard = ({ skill }: { skill: any }) => {
  return (
    <motion.div
      variants={{
        hover: {
          scale: 1.03,
          y: -3,
          zIndex: 5,
          boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
          transition: { duration: 0.25 },
        },
      }}
      whileHover="hover"
      className="w-[210px] flex-shrink-0"
    >
      <div className="bg-white/90 backdrop-blur-sm dark:bg-gray-800/90 rounded-xl overflow-hidden shadow-md transition-all duration-300 h-[210px] border border-gray-100 dark:border-gray-700 group">
        <div className={`h-1.5 ${skill.color} w-full`}></div>
        <div className="p-4">
          <div className="flex flex-col items-center mb-3">
            <div className="relative w-10 h-10 mb-2 flex items-center justify-center rounded-lg bg-white dark:bg-gray-700 shadow-md group-hover:shadow-lg transition-all">
              {skill.logoUrl ? (
                <img
                  src={skill.logoUrl}
                  alt={skill.name}
                  className="w-6 h-6 object-contain group-hover:scale-110 transition-transform duration-300"
                />
              ) : (
                <div
                  className={`text-lg ${
                    skill.textColor || "text-gray-700 dark:text-gray-300"
                  } group-hover:scale-110 transition-transform duration-300`}
                >
                  {skill.icon}
                </div>
              )}
              <div className="absolute -inset-0.5 rounded-lg bg-gradient-to-br from-indigo-400 to-purple-400 opacity-0 group-hover:opacity-30 dark:group-hover:opacity-40 transition-opacity duration-300 blur"></div>
            </div>
            <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-1 text-center group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
              {skill.name}
            </h3>
            <div className="inline-block px-1.5 py-0.5 text-xs font-medium rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300">
              {skill.category || "Development"}
            </div>
          </div>

          <div className="space-y-2">
            <div>
              <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
                <span className="text-[10px]">Proficiency</span>
                <span className="font-medium text-[10px]">
                  {skill.level || 90}%
                </span>
              </div>
              <div className="h-1 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level || 90}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.3 }}
                  className={`h-full ${skill.color} opacity-90 dark:opacity-80 rounded-full group-hover:opacity-100`}
                ></motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SkillsSection;
