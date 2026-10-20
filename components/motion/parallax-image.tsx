"use client";

import { useRef, useState, useEffect, ReactNode } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ParallaxImageProps {
  children: ReactNode;
  className?: string;
  distance?: number; // pixel differential (-distance to +distance)
  disabledOnMobile?: boolean;
}

export function ParallaxImage({
  children,
  className,
  distance = 24,
  disabledOnMobile = true,
}: ParallaxImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile, { passive: true });
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const effectiveDistance = shouldReduceMotion || (disabledOnMobile && isMobile) ? 0 : distance;
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [-effectiveDistance, effectiveDistance]
  );

  return (
    <div
      ref={containerRef}
      className={cn("relative overflow-hidden", className)}
    >
      <motion.div
        style={{ y }}
        className="w-full h-full will-change-transform scale-[1.08]"
      >
        {children}
      </motion.div>
    </div>
  );
}
