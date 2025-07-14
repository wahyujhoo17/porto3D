import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll } from "framer-motion";
import {
  ArrowLeft,
  ExternalLink,
  Github,
  Code,
  Monitor,
  Layers,
  Star,
  Share2,
  ChevronDown,
  CheckCircle,
  Calendar,
  Clock,
} from "lucide-react";
import { Project } from "../types";
import { ContainerScroll } from "./ui/container-scroll-animation";
import { WavyBackground } from "./ui/wavy-background";

interface ProjectDetailsProps {
  project: Project;
  onClose: () => void;
}

interface ButtonWithTooltipProps {
  href?: string;
  tooltip: string;
  icon: React.ReactNode;
  color: string;
  onClick?: () => void;
}

const ButtonWithTooltip: React.FC<ButtonWithTooltipProps> = ({
  href,
  tooltip,
  icon,
  color,
  onClick,
}) => {
  return (
    <div className="relative group/button">
      <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 rounded-lg bg-gray-800 text-white px-2.5 py-1 text-sm font-medium invisible opacity-0 group-hover/button:visible group-hover/button:opacity-100 transition-all duration-200 whitespace-nowrap shadow-lg pointer-events-none z-50">
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 rotate-45 w-2 h-2 bg-gray-800"></div>
        {tooltip}
      </div>
      {href ? (
        <motion.a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          className={`w-10 h-10 ${color} flex items-center justify-center rounded-xl shadow-md transition-all`}
        >
          {icon}
        </motion.a>
      ) : (
        <motion.button
          onClick={onClick}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          className={`w-10 h-10 ${color} flex items-center justify-center rounded-xl shadow-md transition-all`}
        >
          {icon}
        </motion.button>
      )}
    </div>
  );
};

interface FloatingButtonsProps {
  project: Project;
  onClose: () => void;
}

const FloatingButtons: React.FC<FloatingButtonsProps> = ({
  project,
  onClose,
}) => {
  return (
    <>
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2, duration: 0.3 }}
        onClick={onClose}
        className="fixed top-5 left-5 sm:top-8 sm:left-8 z-50 flex items-center gap-2 px-4 py-2.5 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-full shadow-lg text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all border border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-700"
      >
        <ArrowLeft size={18} />
        <span className="font-medium text-sm hidden sm:inline">Back</span>
      </motion.button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="fixed bottom-5 right-5 sm:bottom-8 sm:right-8 z-50 flex flex-col gap-3"
      >
        {(project.demoUrl || project.githubUrl) && (
          <div className="relative group">
            <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 rounded-lg bg-gray-800 text-white px-3 py-1.5 text-sm font-medium invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200 whitespace-nowrap shadow-lg pointer-events-none">
              <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 rotate-45 w-2 h-2 bg-gray-800"></div>
              Project Links
            </div>

            <div className="p-2.5 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700">
              <div className="flex flex-col gap-2.5">
                {project.demoUrl && (
                  <ButtonWithTooltip
                    href={project.demoUrl}
                    tooltip="View Live Demo"
                    icon={<ExternalLink size={18} />}
                    color="bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white"
                  />
                )}

                {project.githubUrl && (
                  <ButtonWithTooltip
                    href={project.githubUrl}
                    tooltip="View Source Code"
                    icon={<Github size={18} />}
                    color="bg-gray-800 hover:bg-gray-900 dark:bg-gray-700 dark:hover:bg-gray-600 text-white"
                  />
                )}

                <ButtonWithTooltip
                  tooltip="Share Project"
                  icon={<Share2 size={18} />}
                  color="bg-white hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600"
                  onClick={() => {
                    if (navigator.share) {
                      navigator
                        .share({
                          title: project.title,
                          text: `Check out this awesome project: ${project.title}`,
                          url: window.location.href,
                        })
                        .catch(console.error);
                    }
                  }}
                />
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </>
  );
};

const ProjectDetails: React.FC<ProjectDetailsProps> = ({
  project,
  onClose,
}) => {
  const [activeSection, setActiveSection] = useState<string>("overview");
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [isDarkMode] = useState<boolean>(() => {
    if (document.documentElement.classList.contains("dark")) return true;
    if (document.documentElement.classList.contains("light")) return false;
    return false;
  });
  const modalRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const overviewRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const demoRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress: modalScrollProgress } = useScroll({
    container: modalRef,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const fadeInVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const navItems = [
    { id: "overview", label: "Overview", icon: <Layers size={16} /> },
    {
      id: "features",
      label: "Features",
      icon: <Star size={16} />,
      condition: Array.isArray(project.features) && project.features.length > 0,
    },
    {
      id: "demo",
      label: "Demo",
      icon: <Monitor size={16} />,
      condition: !!project.demoUrl,
    },
  ].filter(
    (item) => !item.hasOwnProperty("condition") || item.condition === true
  );

  useEffect(() => {
    const handleScroll = () => {
      if (!modalRef.current) return;

      const scrollPos = modalRef.current.scrollTop;
      const docHeight =
        modalRef.current.scrollHeight - modalRef.current.clientHeight;
      setScrollProgress(scrollPos / docHeight);

      const heroHeight = window.innerHeight;

      if (scrollPos > heroHeight * 0.4) {
        const sections = [
          { id: "overview", ref: overviewRef },
          {
            id: "features",
            ref: featuresRef,
            condition:
              Array.isArray(project.features) && project.features.length > 0,
          },
          { id: "demo", ref: demoRef, condition: !!project.demoUrl },
        ].filter(
          (section) =>
            !section.hasOwnProperty("condition") || section.condition === true
        );

        for (let i = sections.length - 1; i >= 0; i--) {
          const section = sections[i];
          if (section.ref && section.ref.current) {
            const rect = section.ref.current.getBoundingClientRect();
            if (rect.top <= 150) {
              setActiveSection(section.id);
              break;
            }
          }
        }
      } else {
        setActiveSection("overview");
      }
    };

    const modalElement = modalRef.current;
    if (modalElement) {
      modalElement.addEventListener("scroll", handleScroll);
      return () => modalElement.removeEventListener("scroll", handleScroll);
    }
  }, [project.features, project.demoUrl]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const sectionRefs: { [key: string]: React.RefObject<HTMLDivElement> } = {
      overview: overviewRef,
      features: featuresRef,
      demo: demoRef,
    };

    const ref = sectionRefs[sectionId];
    if (ref.current && modalRef.current) {
      const offset = 80;
      const top = ref.current.offsetTop - offset;
      modalRef.current.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <motion.div
      ref={modalRef}
      className="fixed inset-0 z-50 overflow-y-auto scrollbar-hide"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ overflowX: "hidden" }}
    >
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <WavyBackground
          colors={
            isDarkMode
              ? [
                  "rgba(99, 102, 241, 0.6)", // indigo-500 - lebih pekat
                  "rgba(79, 70, 229, 0.5)", // indigo-600 - tambahan
                  "rgba(139, 92, 246, 0.5)", // violet-500 - lebih pekat
                  "rgba(14, 165, 233, 0.5)", // sky-500 - lebih pekat
                ]
              : [
                  "rgba(99, 102, 241, 0.8)", // indigo-500
                  "rgba(139, 92, 246, 0.7)", // violet-500
                  "rgba(59, 130, 246, 0.6)", // blue-500
                  "rgba(14, 165, 233, 0.5)", // sky-500
                ]
          }
          waveWidth={isDarkMode ? 75 : 65}
          backgroundFill={
            isDarkMode
              ? "rgba(15, 23, 42, 0.95)" // slate-900 dengan opacity tinggi untuk dark mode
              : "rgba(249, 250, 251, 0.9)" // white untuk light mode
          }
        />
      </div>

      {/* <div className="fixed inset-0 -z-5 bg-gray-50/40 dark:bg-gray-900/80 backdrop-blur-[2px] pointer-events-none"></div> */}
      <div className="fixed inset-0 -z-5 bg-gray-50/20 dark:bg-gray-900/40 backdrop-blur-[1px] pointer-events-none"></div>

      <div className="fixed top-0 left-0 w-full h-1 z-[60] bg-gray-200/80 dark:bg-gray-800/80">
        <motion.div
          className="h-full bg-gradient-to-r from-indigo-500 to-indigo-600 dark:from-indigo-600 dark:to-indigo-400"
          style={{ width: `${scrollProgress * 100}%` }}
        />
      </div>

      <FloatingButtons project={project} onClose={onClose} />

      <div className="relative z-10">
        <div ref={contentRef} className="container mx-auto px-4 pt-0 pb-20">
          <div className="max-w-6xl mx-auto">
            <div className="sticky top-[52px] py-2 bg-white/70 dark:bg-gray-800/50 backdrop-blur-md z-40 mb-6 mt-2 rounded-full mx-auto max-w-max">
              <div className="flex overflow-x-auto hide-scrollbar">
                <div className="flex gap-1 mx-auto bg-gray-100/80 dark:bg-gray-800/60 p-1 rounded-full shadow-inner">
                  {navItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className={`flex items-center px-4 py-2 text-sm font-medium rounded-full transition-all ${
                        activeSection === item.id
                          ? "bg-white dark:bg-gray-700 text-indigo-600 dark:text-indigo-400 shadow-md"
                          : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-white/50 dark:hover:bg-gray-700/50"
                      }`}
                    >
                      {item.icon}
                      <span className="ml-2">{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="w-full overflow-hidden mb-12 relative">
              <div className="relative mx-auto max-w-5xl">
                <div className="relative z-10 p-4 md:p-8">
                  <ContainerScroll
                    scrollYProgress={modalScrollProgress}
                    titleComponent={
                      <>
                        <h1 className="text-3xl font-semibold text-black dark:text-white mb-2">
                          {project.category}
                        </h1>
                        <span className="text-5xl md:text-7xl font-bold mt-1 leading-none text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600 dark:from-indigo-400 dark:to-violet-400">
                          {project.title}
                        </span>
                        <div className="flex flex-wrap justify-center gap-3 mt-6">
                          {project.technologies.slice(0, 5).map((tech, i) => (
                            <motion.span
                              key={i}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.1 * i }}
                              className="px-4 py-2 text-sm font-medium bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm text-gray-700 dark:text-gray-300 rounded-full shadow-sm border border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors"
                            >
                              {tech}
                            </motion.span>
                          ))}
                          {project.technologies.length > 5 && (
                            <motion.span
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.6 }}
                              className="px-4 py-2 text-sm font-medium bg-indigo-100/90 dark:bg-indigo-900/60 backdrop-blur-sm text-indigo-800 dark:text-indigo-300 rounded-full shadow-sm border border-indigo-200 dark:border-indigo-800"
                            >
                              +{project.technologies.length - 5} more
                            </motion.span>
                          )}
                        </div>
                      </>
                    }
                  >
                    <div className="relative w-full h-full rounded-xl overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent z-10 pointer-events-none"></div>
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover object-center"
                        draggable={false}
                      />
                    </div>
                  </ContainerScroll>
                </div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="flex flex-col items-center mt-4 mb-12 text-gray-500 dark:text-gray-400 animate-bounce"
            >
              <ChevronDown size={24} />
              <span className="text-sm mt-1">Scroll for details</span>
            </motion.div>

            <motion.div
              ref={overviewRef}
              id="overview"
              variants={fadeInVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="mb-28"
            >
              <div className="prose dark:prose-invert prose-lg max-w-none">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 flex items-center">
                  <span className="w-12 h-12 bg-indigo-100/80 dark:bg-indigo-900/60 text-indigo-600 dark:text-indigo-300 rounded-full mr-4 flex items-center justify-center text-lg shadow-md">
                    <Layers size={24} />
                  </span>
                  Project Overview
                </h2>

                <div className="bg-white/80 dark:bg-gray-800/60 backdrop-blur-sm p-8 rounded-2xl border border-gray-200/50 dark:border-gray-700/50 mb-10 shadow-lg hover:shadow-xl transition-shadow">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                    {project.description}
                  </p>
                </div>

                {(project.date || project.duration) && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                    {project.date && (
                      <div className="bg-gradient-to-br from-blue-50/90 to-cyan-50/90 dark:from-blue-900/20 dark:to-cyan-900/20 p-6 backdrop-blur-sm rounded-2xl border border-blue-100/80 dark:border-blue-800/30 shadow-lg hover:shadow-xl transition-shadow">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/60 text-blue-600 dark:text-blue-400 rounded-full mr-4 flex items-center justify-center shadow-md">
                            <Calendar size={20} />
                          </div>
                          <div>
                            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                              Project Date
                            </h4>
                            <p className="text-gray-700 dark:text-gray-300">
                              {project.date}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {project.duration && (
                      <div className="bg-gradient-to-br from-emerald-50/90 to-green-50/90 dark:from-emerald-900/20 dark:to-green-900/20 p-6 backdrop-blur-sm rounded-2xl border border-emerald-100/80 dark:border-emerald-800/30 shadow-lg hover:shadow-xl transition-shadow">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900/60 text-emerald-600 dark:text-emerald-400 rounded-full mr-4 flex items-center justify-center shadow-md">
                            <Clock size={20} />
                          </div>
                          <div>
                            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                              Duration
                            </h4>
                            <p className="text-gray-700 dark:text-gray-300">
                              {project.duration}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {project.role && (
                  <div className="bg-indigo-50/90 dark:bg-indigo-900/30 p-8 backdrop-blur-sm rounded-2xl border border-indigo-100/80 dark:border-indigo-800/30 my-10 shadow-lg hover:shadow-xl transition-shadow">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                      <Code
                        size={22}
                        className="mr-3 text-indigo-600 dark:text-indigo-400"
                      />
                      My Role
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 text-lg">
                      {project.role}
                    </p>
                  </div>
                )}

                {project.challenges && (
                  <div className="mt-14">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                      <span className="w-10 h-10 bg-purple-100/80 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400 rounded-full mr-4 flex items-center justify-center shadow-md">
                        <span>💡</span>
                      </span>
                      Challenges & Solutions
                    </h3>
                    <div className="bg-white/80 dark:bg-gray-800/60 backdrop-blur-sm p-8 rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-lg hover:shadow-xl transition-shadow">
                      <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                        {project.challenges}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>

            {Array.isArray(project.features) && project.features.length > 0 && (
              <motion.div
                ref={featuresRef}
                id="features"
                variants={fadeInVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="mb-28"
              >
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-16 flex items-center justify-center text-center">
                  <span className="w-12 h-12 bg-gradient-to-br from-green-100/80 to-emerald-100/80 dark:from-green-900/40 dark:to-emerald-900/40 text-green-600 dark:text-green-400 rounded-full mr-4 flex items-center justify-center shadow-lg">
                    <Star size={24} />
                  </span>
                  Key Features
                </h2>

                <motion.div
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                >
                  {project.features.map((feature, index) => (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      className="relative group overflow-hidden rounded-2xl bg-gradient-to-br from-white/90 to-gray-50/90 dark:from-gray-800/60 dark:to-gray-800/80 backdrop-blur-sm p-6 shadow-lg border border-gray-200/50 dark:border-gray-700/30 transition-all duration-300 hover:shadow-xl hover:border-green-300/70 dark:hover:border-green-700/70"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-green-400/10 to-emerald-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-lg dark:from-green-600/10 dark:to-emerald-600/10"></div>

                      <div className="relative z-10 flex items-start space-x-4">
                        <div className="flex-shrink-0 mt-1">
                          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-md group-hover:scale-105 transition-transform">
                            <CheckCircle size={20} />
                          </div>
                        </div>

                        <div className="flex-1">
                          <p className="text-gray-700 dark:text-gray-300 text-base md:text-lg leading-relaxed">
                            {feature}
                          </p>
                        </div>
                      </div>

                      <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-green-500/10 dark:bg-green-400/5 rounded-full opacity-0 group-hover:opacity-100 group-hover:scale-125 transition-all duration-300 blur-sm"></div>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            )}

            {project.demoUrl && (
              <motion.div
                ref={demoRef}
                id="demo"
                variants={fadeInVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="mb-28"
              >
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 flex items-center">
                  <span className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/60 text-indigo-600 dark:text-indigo-300 rounded-full mr-4 flex items-center justify-center shadow-md">
                    <Monitor size={24} />
                  </span>
                  Live Demo
                </h2>

                <div className="relative">
                  <div className="relative">
                    <div className="absolute -top-5 -left-5 w-10 h-10 border-t-4 border-l-4 border-indigo-500 dark:border-indigo-400 rounded-tl-xl"></div>
                    <div className="absolute -top-5 -right-5 w-10 h-10 border-t-4 border-r-4 border-indigo-500 dark:border-indigo-400 rounded-tr-xl"></div>
                    <div className="absolute -bottom-5 -left-5 w-10 h-10 border-b-4 border-l-4 border-indigo-500 dark:border-indigo-400 rounded-bl-xl"></div>
                    <div className="absolute -bottom-5 -right-5 w-10 h-10 border-b-4 border-r-4 border-indigo-500 dark:border-indigo-400 rounded-br-xl"></div>

                    <div className="overflow-hidden rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 group hover:shadow-indigo-100 dark:hover:shadow-indigo-900/20 transition-all">
                      <div className="bg-gray-100 dark:bg-gray-800 py-4 px-6 flex items-center border-b border-gray-200 dark:border-gray-700">
                        <div className="flex space-x-2 mr-6">
                          <div className="w-3.5 h-3.5 rounded-full bg-red-500"></div>
                          <div className="w-3.5 h-3.5 rounded-full bg-yellow-500"></div>
                          <div className="w-3.5 h-3.5 rounded-full bg-green-500"></div>
                        </div>
                        <div className="flex-1 text-center">
                          <span className="text-sm font-medium text-gray-600 dark:text-gray-300 truncate">
                            {project.demoUrl.replace(/(^\w+:|^)\/\//, "")}
                          </span>
                        </div>
                        <div className="w-16"></div>
                      </div>

                      <div className="bg-white dark:bg-gray-900 w-full">
                        <div className="aspect-[16/9] w-full">
                          <iframe
                            src={project.demoUrl}
                            title={`${project.title} Demo`}
                            className="w-full h-full border-0"
                            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            loading="lazy"
                          />
                        </div>
                      </div>
                    </div>

                    <p className="text-center text-gray-600 dark:text-gray-400 mt-8 text-sm">
                      For the best experience, you can interact with the demo
                      directly above or{" "}
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium"
                      >
                        visit the full site
                      </a>
                      .
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectDetails;
