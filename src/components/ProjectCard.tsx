import React, { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Github, ArrowUpRight } from "lucide-react";
import { Project } from "../types";

interface ProjectCardProps {
  project: Project;
  index: number;
  onViewDetails: (project: Project) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  index,
  onViewDetails,
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="group relative rounded-xl overflow-hidden h-full"
      style={{
        transformStyle: "preserve-3d",
        perspective: "1200px",
      }}
    >
      {/* Custom corner accents */}
      <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-indigo-500/0 group-hover:border-indigo-500/80 transition-colors duration-500 rounded-tl-md z-20"></div>
      <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-indigo-500/0 group-hover:border-indigo-500/80 transition-colors duration-500 rounded-br-md z-20"></div>

      {/* Card Content with Enhanced 3D */}
      <motion.div
        animate={{
          rotateX: hovered ? "12deg" : "0deg",
          rotateY: hovered ? "-6deg" : "0deg",
          y: hovered ? -12 : 0,
          boxShadow: hovered
            ? "0 30px 60px -15px rgba(0, 0, 0, 0.25), 0 18px 36px -18px rgba(0, 0, 0, 0.3)"
            : "0 10px 30px -15px rgba(0, 0, 0, 0.15)",
          borderColor: hovered
            ? "rgba(99, 102, 241, 0.2)"
            : "rgba(229, 231, 235, 0.5)",
        }}
        transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }} // Custom cubic bezier for smoother motion
        className="bg-white dark:bg-gray-800/95 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-200/50 dark:border-gray-700/50 h-full flex flex-col"
      >
        {/* Image Container with Enhanced Styling */}
        <div className="h-52 overflow-hidden relative">
          {/* Enhanced image effect */}
          <motion.div
            animate={{ scale: hovered ? 1.12 : 1, y: hovered ? -5 : 0 }}
            transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
            className="absolute inset-0 overflow-hidden"
          >
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Enhanced gradient overlay with spotlight effect */}
          <div
            className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"
            style={{
              backgroundImage: hovered
                ? `radial-gradient(circle at 50% 50%, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.8) 90%), linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0) 100%)`
                : `linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.2) 100%)`,
            }}
          ></div>

          {/* Title with animated underline */}
          <div className="absolute bottom-0 left-0 p-4 w-full">
            <h3 className="text-xl font-bold text-white drop-shadow-md group-hover:text-indigo-100 transition-colors">
              {project.title}
            </h3>
            <motion.div
              animate={{
                width: hovered ? "40%" : "0%",
                opacity: hovered ? 1 : 0,
              }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="h-0.5 bg-indigo-400 mt-2"
            />
          </div>

          {/* Project type label with new design */}
          <motion.div
            animate={{
              x: hovered ? 0 : -100,
              opacity: hovered ? 1 : 0,
            }}
            transition={{ duration: 0.4, ease: "backOut" }}
            className="absolute left-0 top-6 bg-indigo-600/90 backdrop-blur-sm text-white text-xs font-medium py-1 pr-3 pl-3 rounded-r-full shadow-md flex items-center gap-1"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-white/80 inline-block"></span>
            <span>{project.technologies[0]}</span>
          </motion.div>
        </div>

        {/* Content Section with Animation */}
        <div className="p-5 flex-grow flex flex-col">
          {/* Technology Tags with Enhanced Design */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            {project.technologies.slice(0, 3).map((tech, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.1 + i * 0.1 }}
                className="px-2 py-1 text-xs font-medium bg-indigo-100/80 dark:bg-indigo-900/40 text-indigo-800 dark:text-indigo-200 rounded-md flex items-center"
              >
                <span className="w-1 h-1 rounded-full bg-indigo-500 mr-1.5"></span>
                {tech}
              </motion.span>
            ))}
            {project.technologies.length > 3 && (
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.4 }}
                className="px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md"
              >
                +{project.technologies.length - 3}
              </motion.span>
            )}
          </div>

          {/* Description with Gradient Mask */}
          <div className="relative">
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2 leading-relaxed">
              {project.description}
            </p>
            <div className="absolute bottom-0 left-0 w-full h-4 bg-gradient-to-t from-white dark:from-gray-800 to-transparent pointer-events-none"></div>
          </div>

          {/* Action Bar */}
          <div className="flex justify-between items-center mt-auto pt-3 border-t border-gray-100 dark:border-gray-700/40">
            {/* View Details Button with Arrow Animation */}
            <button
              onClick={() => onViewDetails(project)}
              className="group/btn flex items-center gap-1 text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 text-sm font-medium transition-all"
            >
              <span>View Details</span>
              <motion.span
                animate={{
                  x: hovered ? 2 : 0,
                  y: hovered ? -2 : 0,
                }}
                transition={{ duration: 0.2 }}
              >
                <ArrowUpRight
                  size={14}
                  className="transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
                />
              </motion.span>
            </button>

            {/* Action Icons with Hover Animation */}
            <div className="flex space-x-1.5">
              <motion.a
                whileHover={{ y: -3, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-gray-100/80 dark:bg-gray-700/60 text-gray-700 dark:text-gray-300 hover:bg-indigo-100 hover:text-indigo-600 dark:hover:bg-indigo-900/60 dark:hover:text-indigo-300 transition-all shadow-sm"
              >
                <ExternalLink size={14} />
              </motion.a>
              <motion.a
                whileHover={{ y: -3, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-gray-100/80 dark:bg-gray-700/60 text-gray-700 dark:text-gray-300 hover:bg-indigo-100 hover:text-indigo-600 dark:hover:bg-indigo-900/60 dark:hover:text-indigo-300 transition-all shadow-sm"
              >
                <Github size={14} />
              </motion.a>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Enhanced 3D Lighting Effect */}
      <div
        className={`absolute inset-0 rounded-xl opacity-0 transition-opacity duration-500 pointer-events-none ${
          hovered ? "opacity-40 dark:opacity-30" : ""
        }`}
        style={{
          background:
            "radial-gradient(circle at 30% 20%, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.1) 30%, rgba(0,0,0,0.1) 100%)",
        }}
      />

      {/* Enhanced Shadow Effect */}
      <motion.div
        animate={{
          opacity: hovered ? 1 : 0,
          width: hovered ? "70%" : "40%",
          height: hovered ? "10px" : "5px",
          y: hovered ? 5 : 15,
        }}
        transition={{ duration: 0.4 }}
        className="absolute -bottom-5 left-1/2 -translate-x-1/2 bg-black/20 dark:bg-white/10 blur-xl rounded-full pointer-events-none"
      />

      {/* Particle Effects (Optional) */}
      {hovered && (
        <>
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              initial={{
                opacity: 0,
                y: 0,
                x: (i - 1) * 20,
                scale: 0,
              }}
              animate={{
                opacity: [0, 0.8, 0],
                y: -30 - i * 10,
                scale: [0, 1, 0.5],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
                repeatDelay: 0.5,
              }}
              className="absolute -bottom-2 left-1/2 w-1 h-1 bg-indigo-400 rounded-full pointer-events-none"
            />
          ))}
        </>
      )}
    </motion.div>
  );
};

export default ProjectCard;
