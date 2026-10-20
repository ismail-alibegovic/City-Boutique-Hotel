"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { Navbar } from "@/components/layout/navbar";
import { MOTION_EASE, MOTION_DURATIONS } from "@/lib/motion";
import { cn } from "@/lib/utils";

const ORBIT_NODES = [
  {
    id: "discover",
    label: "Discover",
    topPercent: "24%",
    leftPercent: "7.3%",
    previewImage: "/images/hotel/sarajevo-oldtown.png",
    caption: "Deluxe Room with Old Quarter View",
  },
  {
    id: "unwind",
    label: "Unwind",
    topPercent: "50%",
    leftPercent: "0%",
    previewImage: "/images/hotel/room-apartment-main.jpg",
    caption: "Penthouse Apartment • 50 m²",
  },
  {
    id: "experience",
    label: "Experience",
    topPercent: "76%",
    leftPercent: "7.3%",
    previewImage: "/images/hotel/breakfast-main.jpg",
    caption: "Rooftop Royal Turkish Breakfast",
  },
];

const HEADLINE_LINES = ["Your Stay in", "the Heart of", "Sarajevo."];

export function HeroSection() {
  const [activeNode, setActiveNode] = useState(ORBIT_NODES[0]);
  const heroRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Scroll-linked interpolation for cinematic depth & section handoff
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const rawContainerScale = useTransform(scrollYProgress, [0, 1], [1, 0.98]);
  const rawBgY = useTransform(scrollYProgress, [0, 1], ["0%", "16%"]);
  const rawBgScale = useTransform(scrollYProgress, [0, 1], [1, 0.96]);
  const rawHeadlineY = useTransform(scrollYProgress, [0, 1], [0, -55]);
  const rawHeadlineOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.25]);
  const rawSubtextY = useTransform(scrollYProgress, [0, 1], [0, -32]);
  const rawOrbitY = useTransform(scrollYProgress, [0, 1], [0, 48]);
  const rawOrbitScale = useTransform(scrollYProgress, [0, 1], [1, 0.96]);

  const containerScale = shouldReduceMotion ? 1 : rawContainerScale;
  const bgY = shouldReduceMotion ? "0%" : rawBgY;
  const bgScale = shouldReduceMotion ? 1 : rawBgScale;
  const headlineY = shouldReduceMotion ? 0 : rawHeadlineY;
  const headlineOpacity = shouldReduceMotion ? 1 : rawHeadlineOpacity;
  const subtextY = shouldReduceMotion ? 0 : rawSubtextY;
  const orbitY = shouldReduceMotion ? 0 : rawOrbitY;
  const orbitScale = shouldReduceMotion ? 1 : rawOrbitScale;

  return (
    <section
      ref={heroRef}
      aria-label="Hero — City Boutique Hotel Sarajevo"
      className="w-full max-w-[1840px] mx-auto px-3 sm:px-4 pt-3 sm:pt-4"
    >
      <motion.div
        style={{ scale: containerScale }}
        initial={
          shouldReduceMotion
            ? false
            : {
                clipPath: "inset(2% 2% 2% 2% round 32px)",
                opacity: 0.9,
              }
        }
        animate={{
          clipPath: "inset(0% 0% 0% 0% round 26px)",
          opacity: 1,
        }}
        transition={{
          duration: 1.2,
          ease: MOTION_EASE.editorial,
        }}
        className="relative w-full min-h-[500px] sm:min-h-[560px] lg:h-[calc(82dvh-16px)] lg:min-h-[560px] lg:max-h-[680px] rounded-[22px] sm:rounded-[26px] overflow-hidden flex flex-col justify-between bg-[#111512] shadow-[0_14px_40px_rgba(17,21,18,0.08)] will-change-transform"
      >
        {/* Step 1: Background Atmospheric Hotel Photograph with subtle cinematic scale settle & parallax */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <motion.div
            style={{ y: bgY, scale: bgScale }}
            className="w-full h-full will-change-transform"
          >
            <motion.img
              src="/images/hotel/reception-main.jpg"
              alt="City Boutique Hotel Sarajevo warm interior salon and entrance lounge"
              fetchPriority="high"
              width={1400}
              height={850}
              initial={
                shouldReduceMotion ? false : { scale: 1.08, opacity: 0.85 }
              }
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                duration: MOTION_DURATIONS.heroScale,
                ease: MOTION_EASE.cinematic,
              }}
              className="w-full h-full object-cover object-center brightness-[0.82] contrast-[1.04]"
            />
          </motion.div>

          {/* Step 2: Cinematic dark #111512 multi-stop overlays settling softly */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0.55 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.1, ease: MOTION_EASE.fade }}
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(17,21,18,0.52) 0%, rgba(17,21,18,0.2) 42%, rgba(17,21,18,0.74) 100%)",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 20% 82%, rgba(17,21,18,0.58) 0%, transparent 58%)",
            }}
          />
        </div>

        {/* Step 3: Overlaid Top Navigation entering with gentle fade and subtle vertical settle */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.75,
            delay: 0.15,
            ease: MOTION_EASE.editorial,
          }}
          className="relative z-40 w-full"
        >
          <Navbar variant="hero-overlay" />
        </motion.div>

        {/* Main Hero Editorial Content Grid */}
        <div className="relative z-10 w-full px-5 sm:px-8 lg:px-10 xl:px-12 pb-6 sm:pb-8 lg:pb-9 pt-6 flex flex-col lg:flex-row lg:items-end justify-between gap-6 lg:gap-8">
          {/* Step 4: Bottom-Left Masked Line-by-Line Headline Reveal with Scroll Drift */}
          <motion.div
            style={{ y: headlineY, opacity: headlineOpacity }}
            className="max-w-[640px] will-change-transform"
          >
            <h1 className="font-editorial text-[clamp(2.4rem,1.25rem+3.8vw,4.75rem)] font-light text-white leading-[1.03] tracking-[-0.035em]">
              {HEADLINE_LINES.map((line, idx) => (
                <span key={idx} className="block overflow-hidden pb-1 -mb-1">
                  <motion.span
                    initial={
                      shouldReduceMotion
                        ? false
                        : { y: "115%", opacity: 0.1 }
                    }
                    animate={{ y: "0%", opacity: 1 }}
                    transition={{
                      duration: 0.85,
                      delay: 0.22 + idx * 0.08,
                      ease: MOTION_EASE.editorial,
                    }}
                    className="block will-change-transform"
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
            </h1>
          </motion.div>

          {/* Right Column: Supporting Paragraph + Floating Circular Image Composition */}
          <div className="flex flex-col items-end gap-4 sm:gap-6">
            {/* Step 5: Right-aligned supporting paragraph fading in softly with subtle scroll drift */}
            <motion.p
              style={{ y: subtextY }}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.42,
                ease: MOTION_EASE.editorial,
              }}
              className="text-white/90 text-xs sm:text-[13.5px] leading-[1.55] max-w-[290px] text-left sm:text-right font-normal self-start sm:self-end will-change-transform"
            >
              Discover authentic Bosnian hospitality, thoughtful comfort, and
              the charm of Sarajevo&apos;s historic center.
            </motion.p>

            {/* Step 6 & 7: Floating Circular Visual with Concentric Orbital Ring & Visual Handoff to Rooms */}
            <motion.div
              style={{ y: orbitY, scale: orbitScale }}
              className="relative pl-[82px] sm:pl-[96px] pr-1 py-2.5 select-none self-end will-change-transform"
            >
              <div className="relative w-[166px] h-[166px] sm:w-[204px] sm:h-[204px] lg:w-[222px] lg:h-[222px]">
                {/* Outer Concentric Orbital Ring with Entrance Animation */}
                <motion.div
                  initial={
                    shouldReduceMotion
                      ? false
                      : { opacity: 0, scale: 0.88, rotate: -8 }
                  }
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{
                    duration: 1.0,
                    delay: 0.35,
                    ease: MOTION_EASE.editorial,
                  }}
                  className="
                    absolute -inset-[13px] sm:-inset-[16px] rounded-full
                    border border-white/40 pointer-events-none will-change-transform
                  "
                >
                  {/* 3 Interactive Nodes Placed on the Circumference */}
                  {ORBIT_NODES.map((node, nodeIdx) => {
                    const isActive = activeNode.id === node.id;
                    return (
                      <motion.button
                        key={node.id}
                        type="button"
                        onClick={() => setActiveNode(node)}
                        onMouseEnter={() => setActiveNode(node)}
                        initial={
                          shouldReduceMotion
                            ? false
                            : { opacity: 0, scale: 0.5 }
                        }
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                          duration: 0.5,
                          delay: 0.52 + nodeIdx * 0.08,
                          ease: MOTION_EASE.micro,
                        }}
                        style={{
                          top: node.topPercent,
                          left: node.leftPercent,
                        }}
                        className="pointer-events-auto group absolute -translate-x-1/2 -translate-y-1/2 flex items-center focus:outline-none cursor-pointer"
                      >
                        {/* Label positioned to the left of the dot */}
                        <span
                          className={cn(
                            "absolute right-full mr-2.5 sm:mr-3 text-[11px] sm:text-xs tracking-[-0.01em] whitespace-nowrap transition-colors duration-200",
                            isActive
                              ? "text-white font-medium"
                              : "text-white/80 group-hover:text-white"
                          )}
                        >
                          {node.label}
                        </span>

                        {/* Glowing White Circular Dot Marker */}
                        <span
                          className={cn(
                            "block w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-white transition-all duration-300",
                            isActive
                              ? "ring-4 ring-white/35 scale-110 shadow-[0_0_12px_rgba(255,255,255,0.6)]"
                              : "ring-2 ring-white/25 opacity-90 group-hover:opacity-100"
                          )}
                        />
                      </motion.button>
                    );
                  })}
                </motion.div>

                {/* Inner Circular Hotel Room Photograph with Subtle Scale-in & Crossfade */}
                <motion.div
                  initial={
                    shouldReduceMotion
                      ? false
                      : { opacity: 0, scale: 0.92 }
                  }
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.85,
                    delay: 0.35,
                    ease: MOTION_EASE.editorial,
                  }}
                  className="w-full h-full"
                >
                  <Link
                    href="/rooms"
                    aria-label={`Explore ${activeNode.caption}`}
                    className="group relative w-full h-full rounded-full overflow-hidden border-[6px] border-[#171715]/45 ring-1 ring-white/20 shadow-[0_16px_40px_rgba(0,0,0,0.45)] block bg-[#171715]"
                  >
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={activeNode.id}
                        src={activeNode.previewImage}
                        alt={activeNode.caption}
                        width={240}
                        height={240}
                        initial={
                          shouldReduceMotion
                            ? false
                            : { opacity: 0.65, scale: 1.05 }
                        }
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0.7 }}
                        transition={{
                          duration: 0.45,
                          ease: MOTION_EASE.fade,
                        }}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                      />
                    </AnimatePresence>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-50 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none" />
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
