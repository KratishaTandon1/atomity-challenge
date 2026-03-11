import React from 'react';
import { motion } from 'framer-motion';

interface ResourceTileProps {
  label: string;
  icon: React.ReactNode;
  delay?: number;
}

export const ResourceTile: React.FC<ResourceTileProps> = ({ label, icon, delay = 0 }) => {
  return (
    <motion.div
      className="flex flex-col items-center justify-center py-4 px-6 rounded-[1rem] bg-surface border border-border-subtle shadow-sm transition-colors cursor-pointer group"
      initial={{ opacity: 0, scale: 0.8, y: 15 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      whileHover={{ 
        scale: 1.05, 
        y: -4, 
        boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
        borderColor: "var(--color-accent)"
      }}
      whileTap={{ scale: 0.96 }}
      transition={{ 
        delay, 
        type: 'spring', 
        stiffness: 300, 
        damping: 20 
      }}
    >
      <div className="text-foreground transition-colors group-hover:text-accent mb-2 flex items-center justify-center">
        {icon}
      </div>
      <span className="text-xs font-bold text-foreground transition-colors group-hover:text-accent tracking-widest uppercase">
        {label}
      </span>
    </motion.div>
  );
};
