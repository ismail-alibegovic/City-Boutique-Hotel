"use client";

import { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { MOTION_EASE, MOTION_DURATIONS } from "@/lib/motion";

interface PageTransitionProps {
  children: ReactNode;
  className?: string;
}

export function PageTransition({ children, className }: PageTransitionProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: MOTION_DURATIONS.normal,
        ease: MOTION_EASE.editorial,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
