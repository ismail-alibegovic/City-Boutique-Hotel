"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ConveyorLoop } from "@/components/ui/conveyor-loop";
import { MOTION_EASE } from "@/lib/motion";

export function SitePreloader() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    // Check if user already saw the preloader in this session
    const hasSeen =
      typeof window !== "undefined"
        ? sessionStorage.getItem("cbh_preloader_seen")
        : null;

    if (hasSeen && !shouldReduceMotion) {
      setIsLoading(false);
      return;
    }

    const duration = shouldReduceMotion ? 300 : 1500;
    const intervalTime = 30;
    const step = 100 / (duration / intervalTime);

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + step;
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsLoading(false);
            if (typeof window !== "undefined") {
              sessionStorage.setItem("cbh_preloader_seen", "true");
            }
          }, 180);
          return 100;
        }
        return next;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [shouldReduceMotion]);

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          key="site-preloader"
          initial={{ opacity: 1 }}
          exit={{
            clipPath: "inset(0 0 100% 0)",
            opacity: 0.95,
            transition: {
              duration: 0.85,
              ease: [0.76, 0, 0.24, 1],
            },
          }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-between bg-[#111512] text-white px-6 py-10 pointer-events-auto select-none"
        >
          {/* Top Brand Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-white/50 font-mono"
          >
            <span>City Boutique Hotel</span>
            <span className="w-1 h-1 rounded-full bg-white/30" />
            <span>Sarajevo</span>
          </motion.div>

          {/* Center Brand Logo & Conveyor Loop Loader */}
          <div className="flex flex-col items-center justify-center gap-7">
            {/* Illuminated Brand Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: MOTION_EASE.editorial }}
              className="relative"
            >
              <div className="absolute -inset-6 bg-radial from-white/10 to-transparent blur-xl pointer-events-none" />
              <img
                src="/images/logo-light.png"
                alt="City Boutique Hotel Sarajevo"
                width={260}
                height={96}
                className="relative z-10 w-[210px] sm:w-[260px] h-auto object-contain brightness-105"
              />
            </motion.div>

            {/* Conveyor Loop Loader with Monospace Numerical Counter */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="flex flex-col items-center gap-3"
            >
              <div className="flex items-center gap-3 px-4 py-2 rounded-full border border-white/15 bg-white/[0.04] backdrop-blur-md">
                <ConveyorLoop
                  trackLength={12}
                  className="text-white text-base font-mono"
                  style={{
                    // @ts-expect-error CSS variable for conveyor mask
                    "--mask-color": "#111512",
                  }}
                />
                <span className="font-mono text-xs text-white/80 tracking-wider">
                  {Math.round(progress)}%
                </span>
              </div>
              <span className="text-[10px] uppercase font-mono tracking-[0.2em] text-white/40">
                Welcome to Sarajevo
              </span>
            </motion.div>
          </div>

          {/* Bottom Coordinates & Halal 4-Star Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-4 text-[10px] font-mono text-white/40 uppercase tracking-widest text-center"
          >
            <span>43°51&apos;32.6&quot;N 18°25&apos;21.7&quot;E</span>
            <span className="hidden sm:inline w-1 h-1 rounded-full bg-white/20" />
            <span>4-Star Halal Certified</span>
            <span className="hidden sm:inline w-1 h-1 rounded-full bg-white/20" />
            <span>Mula Mustafe Bašeskije 2</span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default SitePreloader;
