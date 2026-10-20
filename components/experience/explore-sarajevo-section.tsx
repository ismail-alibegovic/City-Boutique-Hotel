"use client";

import Link from "next/link";
import { MapPin } from "lucide-react";
import { SARAJEVO_DESTINATIONS } from "@/lib/hotel-data";
import { PillButton } from "@/components/ui/pill-button";
import { TextReveal } from "@/components/motion/text-reveal";
import { RevealOnScroll } from "@/components/motion/reveal-on-scroll";
import { StaggeredReveal, StaggerItem } from "@/components/motion/staggered-reveal";
import { ParallaxImage } from "@/components/motion/parallax-image";

export function ExploreSarajevoSection() {
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

        {/* 3-Column Bento Image Grid with Controlled Parallax and Staggered Reveal */}
        <StaggeredReveal
          stagger={0.1}
          className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4 md:h-[520px] lg:h-[560px]"
        >
          {/* Left Column: Tall Photograph of Baščaršija & Sebilj with Parallax */}
          <StaggerItem yOffset={24} className="h-[340px] sm:h-[400px] md:h-full">
            <Link
              href={`/experience#${leftCard.id}`}
              className="group relative h-full rounded-[18px] sm:rounded-[20px] overflow-hidden bg-[#111512] block shadow-[0_8px_30px_rgba(0,0,0,0.06)]"
            >
              <ParallaxImage distance={18} className="w-full h-full">
                <img
                  src={leftCard.image}
                  alt={`${leftCard.title} — ${leftCard.walkingTime} from City Boutique Hotel Sarajevo`}
                  width={480}
                  height={680}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-106 brightness-[0.88] contrast-[1.04]"
                />
              </ParallaxImage>
              <div
                className="absolute inset-0 pointer-events-none transition-opacity duration-300 group-hover:opacity-90"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(17,21,18,0.14) 0%, rgba(17,21,18,0.08) 52%, rgba(17,21,18,0.78) 100%)",
                }}
              />
              <div className="absolute top-3.5 left-3.5 z-10">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-[10px] text-white transition-transform duration-300 group-hover:scale-105">
                  <MapPin className="w-3 h-3 text-[#D3F0DC]" />
                  {leftCard.walkingTime}
                </span>
              </div>
              <div className="absolute bottom-4 left-4 right-4 z-10 transition-transform duration-300 group-hover:-translate-y-1">
                <p className="text-[10px] uppercase tracking-[0.14em] text-white/75 mb-0.5">
                  {leftCard.subtitle}
                </p>
                <h3 className="text-base sm:text-[18px] font-normal text-white tracking-[-0.02em]">
                  {leftCard.title}
                </h3>
              </div>
            </Link>
          </StaggerItem>

          {/* Center Column: Two Stacked Photographs */}
          <StaggerItem yOffset={24} className="md:h-full">
            <div className="flex flex-col gap-3.5 sm:gap-4 h-full">
              {/* Top Stacked Image (~38% height on desktop) */}
              <Link
                href={`/experience#${centerTopCard.id}`}
                className="group relative h-[210px] sm:h-[230px] md:h-[195px] lg:h-[210px] shrink-0 rounded-[18px] sm:rounded-[20px] overflow-hidden bg-[#111512] block shadow-[0_6px_20px_rgba(0,0,0,0.05)]"
              >
                <ParallaxImage distance={12} className="w-full h-full">
                  <img
                    src={centerTopCard.image}
                    alt={`${centerTopCard.title} — ${centerTopCard.walkingTime} from City Boutique Hotel Sarajevo`}
                    width={480}
                    height={260}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-106 brightness-[0.88] contrast-[1.04]"
                  />
                </ParallaxImage>
                <div
                  className="absolute inset-0 pointer-events-none transition-opacity duration-300 group-hover:opacity-90"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(17,21,18,0.14) 0%, rgba(17,21,18,0.08) 50%, rgba(17,21,18,0.78) 100%)",
                  }}
                />
                <div className="absolute top-3.5 left-3.5 z-10">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-[10px] text-white transition-transform duration-300 group-hover:scale-105">
                    <MapPin className="w-3 h-3 text-[#D3F0DC]" />
                    {centerTopCard.walkingTime}
                  </span>
                </div>
                <div className="absolute bottom-3.5 left-4 right-4 z-10 transition-transform duration-300 group-hover:-translate-y-1">
                  <p className="text-[10px] uppercase tracking-[0.14em] text-white/75 mb-0.5">
                    {centerTopCard.subtitle}
                  </p>
                  <h3 className="text-sm sm:text-base font-normal text-white tracking-[-0.02em]">
                    {centerTopCard.title}
                  </h3>
                </div>
              </Link>

              {/* Bottom Stacked Image (~62% height on desktop) */}
              <Link
                href={`/experience#${centerBottomCard.id}`}
                className="group relative h-[260px] sm:h-[300px] md:h-auto md:flex-1 rounded-[18px] sm:rounded-[20px] overflow-hidden bg-[#111512] block shadow-[0_6px_20px_rgba(0,0,0,0.05)]"
              >
                <ParallaxImage distance={14} className="w-full h-full">
                  <img
                    src={centerBottomCard.image}
                    alt={`${centerBottomCard.title} — ${centerBottomCard.walkingTime} from City Boutique Hotel Sarajevo`}
                    width={480}
                    height={360}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-106 brightness-[0.88] contrast-[1.04]"
                  />
                </ParallaxImage>
                <div
                  className="absolute inset-0 pointer-events-none transition-opacity duration-300 group-hover:opacity-90"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(17,21,18,0.14) 0%, rgba(17,21,18,0.08) 50%, rgba(17,21,18,0.78) 100%)",
                  }}
                />
                <div className="absolute top-3.5 left-3.5 z-10">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-[10px] text-white transition-transform duration-300 group-hover:scale-105">
                    <MapPin className="w-3 h-3 text-[#D3F0DC]" />
                    {centerBottomCard.walkingTime}
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 right-4 z-10 transition-transform duration-300 group-hover:-translate-y-1">
                  <p className="text-[10px] uppercase tracking-[0.14em] text-white/75 mb-0.5">
                    {centerBottomCard.subtitle}
                  </p>
                  <h3 className="text-base sm:text-[17px] font-normal text-white tracking-[-0.02em]">
                    {centerBottomCard.title}
                  </h3>
                </div>
              </Link>
            </div>
          </StaggerItem>

          {/* Right Column: Tall Photograph of Gazi Husrev-beg Mosque */}
          <StaggerItem yOffset={24} className="h-[340px] sm:h-[400px] md:h-full">
            <Link
              href={`/experience#${rightCard.id}`}
              className="group relative h-full rounded-[18px] sm:rounded-[20px] overflow-hidden bg-[#111512] block shadow-[0_8px_30px_rgba(0,0,0,0.06)]"
            >
              <ParallaxImage distance={18} className="w-full h-full">
                <img
                  src={rightCard.image}
                  alt={`${rightCard.title} — ${rightCard.walkingTime} from City Boutique Hotel Sarajevo`}
                  width={480}
                  height={680}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-106 brightness-[0.88] contrast-[1.04]"
                />
              </ParallaxImage>
              <div
                className="absolute inset-0 pointer-events-none transition-opacity duration-300 group-hover:opacity-90"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(17,21,18,0.14) 0%, rgba(17,21,18,0.08) 52%, rgba(17,21,18,0.78) 100%)",
                }}
              />
              <div className="absolute top-3.5 left-3.5 z-10">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-[10px] text-white transition-transform duration-300 group-hover:scale-105">
                  <MapPin className="w-3 h-3 text-[#D3F0DC]" />
                  {rightCard.walkingTime}
                </span>
              </div>
              <div className="absolute bottom-4 left-4 right-4 z-10 transition-transform duration-300 group-hover:-translate-y-1">
                <p className="text-[10px] uppercase tracking-[0.14em] text-white/75 mb-0.5">
                  {rightCard.subtitle}
                </p>
                <h3 className="text-base sm:text-[18px] font-normal text-white tracking-[-0.02em]">
                  {rightCard.title}
                </h3>
              </div>
            </Link>
          </StaggerItem>
        </StaggeredReveal>
      </div>
    </section>
  );
}
