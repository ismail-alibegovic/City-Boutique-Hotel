"use client";

import { useRef, ReactNode } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { MOTION_EASE, MOTION_DURATIONS, MOTION_STAGGER } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface TextRevealProps {
  lines: string[];
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
  lineClassName?: string;
  delay?: number;
  stagger?: number;
  duration?: number;
  once?: boolean;
}

export function TextReveal({
  lines,
  as: Component = "h2",
  className,
  lineClassName,
  delay = 0,
  stagger = MOTION_STAGGER.tight,
  duration = MOTION_DURATIONS.reveal,
  once = true,
}: TextRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: "-6% 0px -6% 0px" });
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return (
      <Component className={className}>
        {lines.map((line, idx) => (
          <span key={idx} className={cn("block", lineClassName)}>
            {line}
          </span>
        ))}
      </Component>
    );
  }

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  };

  const lineVariants = {
    hidden: { y: "115%", opacity: 0.05 },
    visible: {
      y: "0%",
      opacity: 1,
      transition: {
        duration,
        ease: MOTION_EASE.editorial,
      },
    },
  };

  return (
    <div ref={ref}>
      <Component className={className}>
        <motion.span
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="inline-block w-full"
        >
          {lines.map((line, idx) => (
            <span
              key={idx}
              className="block overflow-hidden pb-1 -mb-1"
            >
              <motion.span
                variants={lineVariants}
                className={cn("block will-change-transform", lineClassName)}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </motion.span>
      </Component>
    </div>
  );
}
