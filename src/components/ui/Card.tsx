import { HTMLAttributes } from "react";
import { motion, HTMLMotionProps } from "framer-motion";

interface CardProps extends HTMLMotionProps<"div"> {}

export function Card({ className = "", children, ...props }: CardProps) {
  return (
    <motion.div
      className={`bg-bgSurface border border-borderSubtle rounded-2xl overflow-hidden @container ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
}