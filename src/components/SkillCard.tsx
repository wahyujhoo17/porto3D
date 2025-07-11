import React from 'react';
import { motion } from 'framer-motion';
import * as LucideIcons from 'lucide-react';
import { Skill } from '../types';

interface SkillCardProps {
  skill: Skill;
  index: number;
}

const SkillCard: React.FC<SkillCardProps> = ({ skill, index }) => {
  // Dynamically import icon from lucide-react
  const IconComponent = LucideIcons[skill.icon as keyof typeof LucideIcons];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="flex flex-col items-center bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
    >
      <div className={`${skill.color} p-3 rounded-full mb-4`}>
        {IconComponent && <IconComponent size={24} className="text-white" />}
      </div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{skill.name}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-400 text-center">{skill.description}</p>
    </motion.div>
  );
};

export default SkillCard;