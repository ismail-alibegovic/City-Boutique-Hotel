"use client";

import { useRef, ReactNode } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { MOTION_EASE, MOTION_DURATIONS } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface ImageRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  scaleFrom?: number;
  once?: boolean;
}

export function ImageReveal({
  children,
  className,
  delay = 0,
  duration = MOTION_DURATIONS.cinematic,
  scaleFrom = 1.08,
  once = true,
}: ImageRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: "-6% 0px -6% 0px" });
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={cn("overflow-hidden", className)}>{children}</div>;
  }

  return (
    <div ref={ref} className={cn("overflow-hidden", className)}>
      <motion.div
        initial={{ scale: scaleFrom, opacity: 0.85 }}
        animate={
          isInView
            ? { scale: 1, opacity: 1 }
            : { scale: scaleFrom, opacity: 0.85 }
        }
        transition={{
          duration,
          delay,
          ease: MOTION_EASE.cinematic,
        }}
        className="w-full h-full will-change-transform"
      >
        {children}
      </motion.div>
    </div>
  );
}
