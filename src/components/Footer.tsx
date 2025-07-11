import React from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 bg-gray-900 dark:bg-gray-950 text-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center md:text-left mb-4 md:mb-0"
          >
            <h3 className="text-xl font-bold">Wahyu Bagus Setiawan</h3>
            <p className="text-gray-400 text-sm">Fullstack Developer</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col items-center"
          >
            <div className="flex items-center text-gray-400 text-sm">
              <span>Made with</span>
              <Heart
                size={16}
                className="mx-1 text-red-500"
                fill="currentColor"
              />
              <span>using React, Tailwind CSS, and Three.js</span>
            </div>
            <p className="text-gray-500 text-sm mt-2">
              &copy; {currentYear} Wahyu. All rights reserved.
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
