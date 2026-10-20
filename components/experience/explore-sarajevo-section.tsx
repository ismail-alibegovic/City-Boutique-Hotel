"use client";

import { useRef } from "react";
import Link from "next/link";
import { MapPin } from "lucide-react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { SARAJEVO_DESTINATIONS, DestinationItem } from "@/lib/hotel-data";
import { PillButton } from "@/components/ui/pill-button";
import { TextReveal } from "@/components/motion/text-reveal";
import { RevealOnScroll } from "@/components/motion/reveal-on-scroll";

function DestinationCard({
  item,
  scrollYProgress,
  startOffset,
  scaleRange = [0.96, 1],
  shouldReduceMotion,
  className,
  imageHeightClass = "h-full",
  distance = 14,
}: {
  item: DestinationItem;
  scrollYProgress: any;
  startOffset: number;
  scaleRange?: [number, number];
  shouldReduceMotion: boolean;
  className?: string;
  imageHeightClass?: string;
  distance?: number;
}) {
  const rawY = useTransform(scrollYProgress, [0, 1], [startOffset, 0]);
  const rawOpacity = useTransform(scrollYProgress, [0, 0.45], [0.35, 1]);
  const rawScale = useTransform(scrollYProgress, [0, 1], scaleRange);
  const rawInnerY = useTransform(
    scrollYProgress,
    [0, 1],
    [-distance, distance]
  );

  const y = shouldReduceMotion ? 0 : rawY;
  const opacity = shouldReduceMotion ? 1 : rawOpacity;
  const scale = shouldReduceMotion ? 1 : rawScale;
  const innerY = shouldReduceMotion ? 0 : rawInnerY;

  return (
    <motion.div
      style={{ y, opacity, scale }}
      className={`will-change-transform ${className || ""}`}
    >
      <Link
        href={`/experience#${item.id}`}
        className={`group relative ${imageHeightClass} rounded-[18px] sm:rounded-[20px] overflow-hidden bg-[#111512] block shadow-[0_8px_30px_rgba(0,0,0,0.06)]`}
      >
        <div className="relative w-full h-full overflow-hidden">
          <motion.div
            style={{ y: innerY }}
            className="w-full h-full scale-[1.08] will-change-transform"
          >
            <img
              src={item.image}
              alt={`${item.title} — ${item.walkingTime} from City Boutique Hotel Sarajevo`}
              width={480}
              height={680}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-106 brightness-[0.88] contrast-[1.04]"
            />
          </motion.div>
        </div>

        {/* Cinematic dark overlay */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300 group-hover:opacity-90"
          style={{
            background:
              "linear-gradient(180deg, rgba(17,21,18,0.14) 0%, rgba(17,21,18,0.08) 52%, rgba(17,21,18,0.78) 100%)",
          }}
        />

        {/* Top-Left Walking Distance Badge */}
        <div className="absolute top-3.5 left-3.5 z-10">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-[10px] text-white transition-transform duration-300 group-hover:scale-105">
            <MapPin className="w-3 h-3 text-[#D3F0DC]" />
            {item.walkingTime}
          </span>
        </div>

        {/* Bottom Destination Details with Hover Lift */}
        <div className="absolute bottom-4 left-4 right-4 z-10 transition-transform duration-300 group-hover:-translate-y-1">
          <p className="text-[10px] uppercase tracking-[0.14em] text-white/75 mb-0.5">
            {item.subtitle}
          </p>
          <h3 className="text-base sm:text-[18px] font-normal text-white tracking-[-0.02em]">
            {item.title}
          </h3>
        </div>
      </Link>
    </motion.div>
  );
}

export function ExploreSarajevoSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "center center"],
  });

  const leftCard = SARAJEVO_DESTINATIONS.find(
    (d) => d.gridPosition === "left-tall"
  )!;
  const centerTopCard = SARAJEVO_DESTINATIONS.find(
    (d) => d.gridPosition === "center-top"
  )!;
  const centerBottomCard = SARAJEVO_DESTINATIONS.find(
    (d) => d.gridPosition === "center-bottom"
  )!;
  const rightCard = SARAJEVO_DESTINATIONS.find(
    (d) => d.gridPosition === "right-tall"
  )!;

  return (
    <section
      ref={sectionRef}
      aria-labelledby="explore-sarajevo-heading"
      className="w-full max-w-[1840px] mx-auto px-5 sm:px-8 lg:px-12 xl:px-16 py-8 sm:py-10 lg:py-12"
    >
      <div>
        {/* Top Editorial Header Row matching Dribbble screenshot */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-10 items-start mb-8 sm:mb-9">
          <div className="lg:col-span-7">
            <TextReveal
              lines={["Discover the Soul", "of Sarajevo."]}
              className="font-editorial text-[28px] sm:text-[36px] lg:text-[42px] font-normal text-[#171715] leading-[1.12] tracking-[-0.03em]"
            />
          </div>

          <div className="lg:col-span-5 flex flex-col items-start">
            <RevealOnScroll delay={0.1} yOffset={14}>
              <p className="text-xs text-[#777773] leading-[1.6] max-w-[350px] mb-3.5">
                Step outside and discover centuries of architecture, culture,
                cafés, and unforgettable local experiences.
              </p>
            </RevealOnScroll>
            <RevealOnScroll delay={0.18} yOffset={14}>
              <PillButton href="/experience" variant="dark-outline">
                More Info
              </PillButton>
            </RevealOnScroll>
          </div>
        </div>

        {/* 3-Column Bento Image Grid with Scroll-Driven Asymmetric Assembly */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4 md:h-[520px] lg:h-[560px]">
          {/* Left Column: Landmark Photograph of Baščaršija & Sebilj */}
          <DestinationCard
            item={leftCard}
            scrollYProgress={scrollYProgress}
            startOffset={45}
            scaleRange={[0.93, 1]}
            distance={18}
            shouldReduceMotion={!!shouldReduceMotion}
            className="h-[340px] sm:h-[400px] md:h-full"
            imageHeightClass="h-full"
          />

          {/* Center Column: Two Stacked Photographs */}
          <div className="flex flex-col gap-3.5 sm:gap-4 h-full md:h-full">
            <DestinationCard
              item={centerTopCard}
              scrollYProgress={scrollYProgress}
              startOffset={-25}
              scaleRange={[0.96, 1]}
              distance={12}
              shouldReduceMotion={!!shouldReduceMotion}
              className="h-[210px] sm:h-[230px] md:h-[195px] lg:h-[210px] shrink-0"
              imageHeightClass="h-full"
            />
            <DestinationCard
              item={centerBottomCard}
              scrollYProgress={scrollYProgress}
              startOffset={35}
              scaleRange={[0.96, 1]}
              distance={15}
              shouldReduceMotion={!!shouldReduceMotion}
              className="h-[260px] sm:h-[280px] md:flex-1 min-h-0"
              imageHeightClass="h-full"
            />
          </div>

          {/* Right Column: Tall Photograph of Gazi Husrev-beg Mosque */}
          <DestinationCard
            item={rightCard}
            scrollYProgress={scrollYProgress}
            startOffset={55}
            scaleRange={[0.95, 1]}
            distance={16}
            shouldReduceMotion={!!shouldReduceMotion}
            className="h-[340px] sm:h-[400px] md:h-full"
            imageHeightClass="h-full"
          />
        </div>
      </div>
    </section>
  );
}