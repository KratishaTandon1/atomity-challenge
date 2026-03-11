import React from 'react';
import { motion } from 'framer-motion';

interface ChartBarProps {
  heightPercentage: number;
  label?: string;
  isActive?: boolean;
  onClick?: (e: React.MouseEvent) => void;
  layoutId?: string;
}

export const ChartBar: React.FC<ChartBarProps> = ({ 
  heightPercentage,
  label, 
  isActive = false, 
  onClick,
  layoutId
}) => {
  return (
    <motion.div
      layoutId={layoutId} 
      className={`w-full rounded-t-md transition-shadow cursor-pointer relative group ${isActive ? 'bg-accent' : 'bg-accent'}`}
      style={{
        height: `${Math.max(heightPercentage, 2)}%`,
      }}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.(e as any);
        }
      }}
      tabIndex={0}
      role="button"
      aria-label={label || "Chart bar"}
      initial={{ scaleY: 0, opacity: 0, transformOrigin: 'bottom' }}
      animate={{ scaleY: 1, opacity: 1 }}
      whileHover={{ 
         scaleY: 1.05,
         scaleX: 1.05,
         filter: "brightness(1.1)",
         boxShadow: "0 4px 20px rgba(74, 222, 128, 0.4)" 
      }}
      whileTap={{ scaleY: 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
    >
      <div className="absolute inset-0 bg-white/20 opacity-0 group-active:opacity-100 transition-opacity rounded-t-md" />
    </motion.div>
  );
};
