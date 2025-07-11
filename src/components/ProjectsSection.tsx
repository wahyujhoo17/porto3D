import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProjectCard from "./ProjectCard";
import ProjectDetails from "./ProjectDetails";
import { supabase } from "../utils/supabaseClient";
import { Project } from "../types";

// Helper function to throttle mouse events for better performance
const throttle = (func: Function, limit: number) => {
  let inThrottle: boolean;
  return function (this: any, ...args: any[]) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

const ProjectsSection: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorHidden, setCursorHidden] = useState(true);
  const [activeFilter, setActiveFilter] = useState("All Projects");
  const containerRef = useRef<HTMLDivElement>(null);

  // Reduced lamp effect state
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 6;

  // State to toggle between paginated and show all modes
  const [showAllProjects, setShowAllProjects] = useState(false);

  // Check for reduced motion preference on load
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    setIsReducedMotion(prefersReducedMotion);
  }, []);

  useEffect(() => {
    // Reset to first page when filter changes
    setCurrentPage(1);
    // Also reset to paginated view when filter changes
    setShowAllProjects(false);
  }, [activeFilter]);

  // Fetch projects from Supabase
  useEffect(() => {
    async function getProject() {
      const { data, error } = await supabase.from("projects").select("*");
      if (error) {
        console.error("Error fetching projects:", error);
      } else if (data && data.length > 0) {
        // console.log("Fetched projects:", data);
        // Pastikan technologies dan features jadi array
        const parsed = data.map((p) => ({
          ...p,
          technologies: Array.isArray(p.technologies)
            ? p.technologies
            : typeof p.technologies === "string"
            ? JSON.parse(p.technologies)
            : [],
          features: Array.isArray(p.features)
            ? p.features
            : typeof p.features === "string"
            ? JSON.parse(p.features)
            : [],
        }));
        setProjects(parsed);
      } else {
        setProjects([]);
      }
    }
    getProject();
  }, []);

  // Throttled mouse handler for better performance
  const handleMouseMove = useCallback(
    throttle((e: MouseEvent) => {
      if (isReducedMotion) return;
      setCursorHidden(false);
      setMousePosition({ x: e.clientX, y: e.clientY });
    }, 16), // ~60fps
    [isReducedMotion]
  );

  const handleMouseLeave = useCallback(() => {
    setCursorHidden(true);
  }, []);

  useEffect(() => {
    // Use passive event listeners for better performance
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document
      .getElementById("projects")
      ?.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document
        .getElementById("projects")
        ?.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [handleMouseMove, handleMouseLeave]);

  const filterOptions = ["All Projects", "Web Apps", "Mobile", "Design"];

  // Filter projects based on active filter
  const filteredProjects =
    activeFilter === "All Projects"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  // Calculate pagination or show all projects
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;

  // Display either all projects or paginated projects based on showAllProjects state
  const displayedProjects = showAllProjects
    ? filteredProjects
    : filteredProjects.slice(indexOfFirstProject, indexOfLastProject);

  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);

  // Handle page change
  const paginate = (pageNumber: number) => {
    document
      .getElementById("projects")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
    setCurrentPage(pageNumber);
  };

  const handleShowAllProjects = () => {
    setShowAllProjects(true);
    document
      .getElementById("projects")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Pagination controls with conditional rendering
  const renderPaginationControls = () => {
    if (totalPages <= 1 || showAllProjects) return null;

    return (
      <div className="flex justify-center items-center mt-12 space-x-2">
        {/* Previous page button */}
        <button
          onClick={() => currentPage > 1 && paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200 ${
            currentPage === 1
              ? "bg-gray-100 dark:bg-gray-800/50 text-gray-400 dark:text-gray-600 cursor-not-allowed"
              : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 shadow-sm border border-gray-200 dark:border-gray-700/50"
          }`}
          aria-label="Previous page"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        {/* Page number buttons - simplified to improve performance */}
        {Array.from({ length: totalPages })
          .map((_, idx) => idx + 1)
          .filter(
            (pageNumber) =>
              pageNumber === 1 ||
              pageNumber === totalPages ||
              (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
          )
          .map((pageNumber, i, filtered) => (
            <React.Fragment key={pageNumber}>
              {i > 0 && filtered[i - 1] !== pageNumber - 1 && (
                <span className="flex items-center justify-center w-10 h-10 text-gray-500 dark:text-gray-400">
                  &hellip;
                </span>
              )}
              <button
                onClick={() => paginate(pageNumber)}
                className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200 ${
                  pageNumber === currentPage
                    ? "bg-indigo-600 text-white shadow-md border border-indigo-600"
                    : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 shadow-sm border border-gray-200 dark:border-gray-700/50"
                }`}
                aria-label={`Page ${pageNumber}`}
                aria-current={pageNumber === currentPage ? "page" : undefined}
              >
                {pageNumber}
              </button>
            </React.Fragment>
          ))}

        {/* Next page button */}
        <button
          onClick={() => currentPage < totalPages && paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200 ${
            currentPage === totalPages
              ? "bg-gray-100 dark:bg-gray-800/50 text-gray-400 dark:text-gray-600 cursor-not-allowed"
              : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 shadow-sm border border-gray-200 dark:border-gray-700/50"
          }`}
          aria-label="Next page"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    );
  };

  return (
    <>
      <section
        id="projects"
        className="py-20 relative overflow-hidden bg-[#f7f7f7] dark:bg-[#111111]"
      >
        {/* Simpler gradient background without heavy blur */}
        <div className="absolute inset-0 bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-950 -z-10"></div>

        {/* Light pattern background instead of SVG - better performance */}
        <div className="absolute inset-0 opacity-10 dark:opacity-5 -z-10 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:40px_40px]"></div>

        {/* Lightweight cursor lamp effect - only when not reduced motion and not hidden */}
        {!isReducedMotion && !cursorHidden && (
          <div
            className="absolute pointer-events-none opacity-30 dark:opacity-20 z-10 transition-opacity"
            style={{
              left: mousePosition.x,
              top: mousePosition.y,
              width: "300px", // Reduced size
              height: "300px", // Reduced size
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.3) 40%, rgba(255,255,255,0) 70%)",
              transform: "translate(-50%, -50%)",
              // Removed filter blur for better performance
              willChange: "transform", // Hint for browser optimization
            }}
          />
        )}

        {/* Single static blob instead of animated ones */}
        {!isReducedMotion && (
          <div
            className="absolute top-0 left-0 w-[300px] h-[300px] bg-indigo-400/10 dark:bg-indigo-400/5 rounded-full -z-5 opacity-60"
            style={{
              filter: "blur(70px)",
              transform: "translateZ(0)", // Force GPU acceleration
            }}
          ></div>
        )}

        <div
          className="container mx-auto px-4 relative z-10"
          ref={containerRef}
        >
          <div className="text-center mb-16 relative">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mt-6 mb-5">
              Recent{" "}
              <span className="text-indigo-600 dark:text-indigo-400 relative inline-block">
                Projects
                {/* Simple underline instead of gradient */}
                <div className="absolute -bottom-2 left-0 right-0 h-[2px] bg-indigo-400 dark:bg-indigo-500/60"></div>
              </span>
            </h2>

            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed text-lg">
              Explore a collection of projects that showcase my skills and
              passion for creating intuitive, user-centric digital experiences.
            </p>

            {/* Simplified filter buttons */}
            <div className="inline-flex p-1 rounded-xl bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              {filterOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => setActiveFilter(option)}
                  className={`px-5 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeFilter === option
                      ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm"
                      : "text-gray-600 dark:text-gray-300 hover:bg-white/70 dark:hover:bg-gray-700/70"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative">
            {/* Removed central glow effect for better performance */}

            {/* Performance optimized project rendering */}
            <AnimatePresence mode="wait">
              {displayedProjects.length > 0 ? (
                <>
                  {displayedProjects.map((project, index) => (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{
                        duration: 0.4,
                        delay: Math.min(index * 0.05, 0.3), // Reduced delay substantially
                      }}
                    >
                      <ProjectCard
                        project={project}
                        index={index}
                        onViewDetails={setSelectedProject}
                      />
                    </motion.div>
                  ))}
                </>
              ) : (
                <motion.div
                  className="col-span-3 py-16 text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 mb-4">
                    <svg
                      className="w-6 h-6 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-medium mb-2 text-gray-700 dark:text-gray-300">
                    No projects found
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-6">
                    Try selecting a different category
                  </p>
                  <button
                    onClick={() => setActiveFilter("All Projects")}
                    className="px-5 py-2 rounded-full text-sm font-medium bg-white dark:bg-gray-800 text-indigo-600 dark:text-indigo-400 shadow-sm border border-gray-200 dark:border-gray-700"
                  >
                    View all projects
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Pagination Controls */}
          {renderPaginationControls()}

          {/* Page info indicator */}
          {!showAllProjects && filteredProjects.length > projectsPerPage && (
            <div className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400">
              Showing {indexOfFirstProject + 1}-
              {Math.min(indexOfLastProject, filteredProjects.length)} of{" "}
              {filteredProjects.length} projects
            </div>
          )}

          {/* Show a "return to paginated view" button when in show all mode */}
          {showAllProjects && filteredProjects.length > projectsPerPage && (
            <div className="mt-8 text-center">
              <button
                onClick={() => setShowAllProjects(false)}
                className="px-5 py-2 rounded-full text-sm font-medium bg-white dark:bg-gray-800 text-indigo-600 dark:text-indigo-400 shadow-sm border border-gray-200 dark:border-gray-700"
              >
                Return to paginated view
              </button>
            </div>
          )}

          {/* Simplified CTA Button */}
          {!showAllProjects && filteredProjects.length > projectsPerPage && (
            <div className="mt-16 text-center">
              <button
                onClick={handleShowAllProjects}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white dark:bg-gray-800 text-indigo-600 dark:text-indigo-400 font-medium shadow-sm border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <span>Explore All Projects</span>
                <svg
                  className="w-4 h-4 transition-transform group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>
      </section>

      <AnimatePresence>
        {selectedProject && (
          <ProjectDetails
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default ProjectsSection;
