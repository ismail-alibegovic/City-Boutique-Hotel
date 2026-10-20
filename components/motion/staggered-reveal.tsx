"use client";

import { useRef, ReactNode } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { MOTION_EASE, MOTION_DURATIONS, MOTION_STAGGER } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface StaggeredRevealProps {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delayChildren?: number;
  once?: boolean;
}

export function StaggeredReveal({
  children,
  className,
  stagger = MOTION_STAGGER.normal,
  delayChildren = 0.05,
  once = true,
}: StaggeredRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: "-6% 0px -6% 0px" });
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
        delayChildren,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}

interface StaggerItemProps {
  children: ReactNode;
  className?: string;
  yOffset?: number;
  scale?: number;
}

export function StaggerItem({
  children,
  className,
  yOffset = 22,
  scale = 0.98,
}: StaggerItemProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  const itemVariants = {
    hidden: { opacity: 0, y: yOffset, scale },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: MOTION_DURATIONS.reveal,
        ease: MOTION_EASE.editorial,
      },
    },
  };

  return (
    <motion.div variants={itemVariants} className={cn(className)}>
      {children}
    </motion.div>
  );
}
