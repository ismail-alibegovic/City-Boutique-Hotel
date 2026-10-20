"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/navbar";
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

export function HeroSection() {
  const [activeNode, setActiveNode] = useState(ORBIT_NODES[0]);

  return (
    <section
      aria-label="Hero — City Boutique Hotel Sarajevo"
      className="w-full max-w-[1840px] mx-auto px-3 sm:px-4 pt-3 sm:pt-4"
    >
      <div className="relative w-full min-h-[500px] sm:min-h-[560px] lg:h-[calc(82dvh-16px)] lg:min-h-[560px] lg:max-h-[680px] rounded-[22px] sm:rounded-[26px] overflow-hidden flex flex-col justify-between bg-[#111512] shadow-[0_14px_40px_rgba(17,21,18,0.08)]">
        {/* Background Atmospheric Hotel Photograph — LCP candidate with fetchPriority="high" */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/hotel/reception-main.jpg"
            alt="City Boutique Hotel Sarajevo warm interior salon and entrance lounge"
            fetchPriority="high"
            width={1400}
            height={850}
            className="w-full h-full object-cover object-center scale-[1.01] brightness-[0.82] contrast-[1.04]"
          />
          {/* Cinematic dark #111512 multi-stop overlay for crisp editorial typography contrast */}
          <div
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

        {/* Overlaid Top Navigation */}
        <Navbar variant="hero-overlay" />

        {/* Main Hero Editorial Content Grid */}
        <div className="relative z-10 w-full px-5 sm:px-8 lg:px-10 xl:px-12 pb-6 sm:pb-8 lg:pb-9 pt-6 flex flex-col lg:flex-row lg:items-end justify-between gap-6 lg:gap-8">
          {/* Bottom-Left: Oversized Lightweight Contemporary Headline matching Dribbble reference */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-[640px]"
          >
            <h1 className="font-editorial text-[clamp(2.4rem,1.25rem+3.8vw,4.75rem)] font-light text-white leading-[1.03] tracking-[-0.035em]">
              Your Stay in
              <br />
              the Heart of
              <br />
              Sarajevo.
            </h1>
          </motion.div>

          {/* Right Column: Supporting Paragraph + Floating Circular Image Composition */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-end gap-4 sm:gap-6"
          >
            {/* Right-aligned supporting paragraph matching Dribbble reference */}
            <p className="text-white/90 text-xs sm:text-[13.5px] leading-[1.55] max-w-[290px] text-left sm:text-right font-normal self-start sm:self-end">
              Discover authentic Bosnian hospitality, thoughtful comfort, and
              the charm of Sarajevo&apos;s historic center.
            </p>

            {/* Floating Circular Visual with Mathematically Concentric Orbital Ring & 3 Nodes */}
            <div className="relative pl-[82px] sm:pl-[96px] pr-1 py-2.5 select-none self-end">
              {/* Concentric Circle Wrapper */}
              <div className="relative w-[166px] h-[166px] sm:w-[204px] sm:h-[204px] lg:w-[222px] lg:h-[222px]">
                {/* Outer Concentric Orbital Ring */}
                <div
                  className="
                    absolute -inset-[13px] sm:-inset-[16px] rounded-full
                    border border-white/40 pointer-events-none
                  "
                >
                  {/* 3 Interactive Nodes Placed on the Exact Circumference of the Orbital Ring */}
                  {ORBIT_NODES.map((node) => {
                    const isActive = activeNode.id === node.id;
                    return (
                      <button
                        key={node.id}
                        type="button"
                        onClick={() => setActiveNode(node)}
                        onMouseEnter={() => setActiveNode(node)}
                        style={{
                          top: node.topPercent,
                          left: node.leftPercent,
                        }}
                        className="pointer-events-auto group absolute -translate-x-1/2 -translate-y-1/2 flex items-center focus:outline-none cursor-pointer"
                      >
                        {/* Label positioned to the left of the dot */}
                        <span
                          className={cn(
                            "absolute right-full mr-2.5 sm:mr-3 text-[11px] sm:text-xs tracking-[-0.01em] whitespace-nowrap transition-colors",
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
                              ? "ring-4 ring-white/35 scale-110"
                              : "ring-2 ring-white/25 opacity-90 group-hover:opacity-100"
                          )}
                        />
                      </button>
                    );
                  })}
                </div>

                {/* Inner Circular Hotel Room Photograph */}
                <Link
                  href="/rooms"
                  aria-label={`Explore ${activeNode.caption}`}
                  className="group relative w-full h-full rounded-full overflow-hidden border-[6px] border-[#171715]/45 ring-1 ring-white/20 shadow-[0_16px_40px_rgba(0,0,0,0.45)] block bg-[#171715]"
                >
                  <img
                    src={activeNode.previewImage}
                    alt={activeNode.caption}
                    width={240}
                    height={240}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-50 group-hover:opacity-20 transition-opacity" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
