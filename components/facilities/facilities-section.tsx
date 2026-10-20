"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { FACILITIES_DATA, FacilityItem } from "@/lib/hotel-data";
import { TextReveal } from "@/components/motion/text-reveal";
import { RevealOnScroll } from "@/components/motion/reveal-on-scroll";
import { cn } from "@/lib/utils";

const START_OFFSETS = [45, -35, 65, -40, 35];

function FacilityCard({
  facility,
  idx,
  scrollYProgress,
  shouldReduceMotion,
}: {
  facility: FacilityItem;
  idx: number;
  scrollYProgress: any;
  shouldReduceMotion: boolean;
}) {
  const isCenterpiece = idx === 2;
  const startOffset = START_OFFSETS[idx % START_OFFSETS.length];

  const rawY = useTransform(
    scrollYProgress,
    [0, 1],
    [startOffset, 0]
  );
  const rawOpacity = useTransform(scrollYProgress, [0, 0.5], [0.35, 1]);
  const rawScale = useTransform(
    scrollYProgress,
    [0, 1],
    [isCenterpiece ? 0.94 : 0.97, 1]
  );
  const rawInnerY = useTransform(scrollYProgress, [0, 1], [-12, 12]);

  const y = shouldReduceMotion ? 0 : rawY;
  const opacity = shouldReduceMotion ? 1 : rawOpacity;
  const scale = shouldReduceMotion ? 1 : rawScale;
  const innerY = shouldReduceMotion ? 0 : rawInnerY;

  return (
    <motion.div
      style={{ y, opacity, scale }}
      className={cn(
        isCenterpiece
          ? "col-span-2 lg:col-span-3"
          : "col-span-1 lg:col-span-2",
        facility.heightClass,
        facility.offsetClass,
        "will-change-transform"
      )}
    >
      <Link
        href={`/facilities#${facility.id}`}
        className="group relative w-full h-full rounded-[20px] sm:rounded-[22px] overflow-hidden bg-[#171715] block transition-all duration-500 ease-out hover:-translate-y-1.5 focus:outline-none focus:ring-2 focus:ring-[#171715] shadow-[0_6px_24px_rgba(0,0,0,0.04)]"
      >
        <motion.div
          style={{ y: innerY }}
          className="w-full h-full scale-[1.08] will-change-transform"
        >
          <img
            src={facility.image}
            alt={`${facility.title} at City Boutique Hotel Sarajevo`}
            width={400}
            height={500}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-106 brightness-[0.9]"
          />
        </motion.div>

        {/* Cinematic dark gradient overlay */}
        <div
          className="absolute inset-0 transition-opacity duration-500 group-hover:opacity-90 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, rgba(17,21,18,0.08) 0%, rgba(17,21,18,0.16) 55%, rgba(17,21,18,0.82) 100%)",
          }}
        />

        {/* Top category pill that fades in on hover (or stays visible on touch) */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-[10px] text-white/90 opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-y-1 group-hover:translate-y-0 whitespace-nowrap z-10">
          <span>{facility.hours}</span>
          <ArrowUpRight className="w-2.5 h-2.5 text-white/70" />
        </div>

        {/* Bottom Centered Label with smooth upward glide on hover */}
        <div className="absolute bottom-4 left-3 right-3 text-center transition-transform duration-300 group-hover:-translate-y-1 z-10">
          <h3 className="text-sm sm:text-[16px] lg:text-[17px] font-normal text-white tracking-[-0.015em]">
            {facility.shortLabel}
          </h3>
        </div>
      </Link>
    </motion.div>
  );
}

export function FacilitiesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Synchronized scroll progress driving asymmetric card assembly
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "center center"],
  });

  return (
    <section
      ref={sectionRef}
      aria-labelledby="facilities-heading"
      className="w-full max-w-[1840px] mx-auto px-5 sm:px-8 lg:px-12 xl:px-16 py-8 sm:py-10 lg:py-12"
    >
      <div>
        {/* Top Editorial Header Row matching Dribbble screenshot */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-10 items-center mb-8 sm:mb-10">
          <div className="lg:col-span-5 order-2 lg:order-1">
            <RevealOnScroll delay={0.1} yOffset={14}>
              <p className="text-xs text-[#777773] leading-[1.6] max-w-[300px]">
                Every detail at City Boutique Hotel is thoughtfully curated to
                make your stay in Sarajevo&apos;s historic center effortless and
                memorable.
              </p>
            </RevealOnScroll>
          </div>
          <div className="lg:col-span-7 order-1 lg:order-2 lg:flex lg:justify-end">
            <TextReveal
              lines={["Thoughtful Comfort.", "Exceptional Hospitality."]}
              className="font-editorial text-[28px] sm:text-[36px] lg:text-[42px] font-normal text-[#171715] leading-[1.12] tracking-[-0.03em] lg:w-full lg:max-w-[470px]"
            />
          </div>
        </div>

        {/* Staggered 5-Card Asymmetric Assembly driven by Scroll Progress */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-11 gap-3 sm:gap-4 items-start">
          {FACILITIES_DATA.map((facility, idx) => (
            <FacilityCard
              key={facility.id}
              facility={facility}
              idx={idx}
              scrollYProgress={scrollYProgress}
              shouldReduceMotion={!!shouldReduceMotion}
            />
          ))}
        </div>

        {/* Centered Minimalist "Explore Facilities" Pill CTA with Microinteraction */}
        <RevealOnScroll delay={0.2} yOffset={14}>
          <div className="mt-7 sm:mt-8 flex justify-center">
            <Link
              href="/facilities"
              className="px-6 py-2 rounded-full border border-[#171715]/30 bg-white text-xs font-medium text-[#171715] hover:border-[#171715] hover:bg-[#171715] hover:text-white hover:scale-105 active:scale-95 transition-all duration-300"
            >
              Explore Facilities
            </Link>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
