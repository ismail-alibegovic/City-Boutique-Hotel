"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, CheckCircle2 } from "lucide-react";
import { TESTIMONIALS_DATA, HOTEL_INFO } from "@/lib/hotel-data";
import { TextReveal } from "@/components/motion/text-reveal";
import { RevealOnScroll } from "@/components/motion/reveal-on-scroll";
import { StaggeredReveal, StaggerItem } from "@/components/motion/staggered-reveal";
import { MOTION_EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(2); // Center card active by default ("Caner Ç.")
  const shouldReduceMotion = useReducedMotion();

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) =>
      prev === 0 ? TESTIMONIALS_DATA.length - 1 : prev - 1
    );
  }, []);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % TESTIMONIALS_DATA.length);
  }, []);

  // Keyboard navigation for accessible card browsing
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handlePrev, handleNext]);

  return (
    <section
      aria-labelledby="testimonials-heading"
      className="w-full py-8 sm:py-10 lg:py-12 overflow-hidden"
    >
      <div className="max-w-[1840px] mx-auto px-5 sm:px-8 lg:px-12 xl:px-16">
        {/* Centered Heading & Supporting Subtext */}
        <div className="text-center max-w-[540px] mx-auto mb-8 sm:mb-10">
          <TextReveal
            lines={["Words From Our Guests."]}
            className="font-editorial text-[28px] sm:text-[36px] lg:text-[42px] font-normal text-[#171715] leading-[1.12] tracking-[-0.03em]"
          />
          <RevealOnScroll delay={0.12} yOffset={14}>
            <p className="mt-2.5 text-xs text-[#777773] leading-[1.6] max-w-[430px] mx-auto">
              Rated {HOTEL_INFO.ratingSummary.score}/{HOTEL_INFO.ratingSummary.outOf}{" "}
              across {HOTEL_INFO.ratingSummary.reviewCount} verified Google guest
              reviews for our city-center location, rooftop Turkish breakfast, and
              warm hospitality.
            </p>
          </RevealOnScroll>
        </div>
      </div>

      {/* Horizontally Arranged Soft-Grey Testimonial Cards */}
      <div className="max-w-[1840px] mx-auto px-5 sm:px-8 lg:px-12 xl:px-16">
        <StaggeredReveal
          stagger={0.07}
          className="flex lg:grid lg:grid-cols-5 gap-3.5 lg:gap-4 items-stretch overflow-x-auto lg:overflow-visible snap-x snap-mandatory py-2 -mx-5 px-5 sm:mx-0 sm:px-0"
        >
          {TESTIMONIALS_DATA.map((item, idx) => {
            const isSelected = idx === activeIndex;
            return (
              <StaggerItem
                key={item.id}
                yOffset={18}
                className="w-[280px] sm:w-[300px] lg:w-auto shrink-0 snap-center"
              >
                <motion.article
                  onClick={() => setActiveIndex(idx)}
                  whileHover={shouldReduceMotion ? undefined : { y: -2 }}
                  transition={{ duration: 0.25, ease: MOTION_EASE.micro }}
                  tabIndex={0}
                  role="button"
                  aria-pressed={isSelected}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      setActiveIndex(idx);
                    }
                  }}
                  className={cn(
                    "w-full h-full rounded-[20px] p-5 sm:p-6 flex flex-col justify-between min-h-[235px] sm:min-h-[252px] transition-all duration-300 cursor-pointer border select-none focus:outline-none focus:ring-2 focus:ring-[#171715]",
                    item.rotationClass,
                    isSelected
                      ? "bg-[#F3F3F0] border-[#D8D8D2] shadow-[0_12px_32px_rgba(23,23,21,0.08)] z-10 scale-[1.02]"
                      : "bg-[#F7F7F5] border-[#EBEBE7] opacity-85 hover:opacity-100"
                  )}
                >
                  {/* Top Metadata Line */}
                  <div>
                    <div className="flex items-center gap-1.5 mb-3.5">
                      <span className="text-[11px] font-medium text-[#171715] tracking-[-0.01em] truncate">
                        {item.origin}
                      </span>
                      <span className="text-[11px] shrink-0" aria-hidden="true">
                        🇧🇦
                      </span>
                    </div>

                    {/* Review Quote Text */}
                    <p className="text-[11.5px] sm:text-xs text-[#171715]/80 leading-[1.6] font-normal">
                      {item.quote}
                    </p>
                  </div>

                  {/* Bottom Attribution Row */}
                  <div className="mt-5 flex items-center gap-2.5">
                    <div
                      className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-semibold shrink-0 transition-transform duration-200",
                        item.isPrimaryVerified
                          ? "bg-[#171715] text-white"
                          : "bg-white border border-[#E7E7E3] text-[#171715]"
                      )}
                      aria-hidden="true"
                    >
                      {item.isPrimaryVerified
                        ? "CÇ"
                        : item.badge.slice(0, 2).toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1">
                        <p className="text-xs font-medium text-[#171715] truncate">
                          {item.guestName}
                        </p>
                        <CheckCircle2
                          className="w-3 h-3 text-[#5E6B5B] shrink-0"
                          aria-label="Verified hotel source"
                        />
                      </div>
                      <p className="text-[10px] text-[#777773] truncate">
                        {item.source}
                      </p>
                    </div>
                  </div>
                </motion.article>
              </StaggerItem>
            );
          })}
        </StaggeredReveal>

        {/* Centered Circular Navigation Arrows with Microinteraction Hover */}
        <div className="mt-8 sm:mt-9 flex items-center justify-center gap-2">
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous testimonial"
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-[#171715]/30 text-[#171715] hover:bg-[#171715] hover:text-white hover:scale-105 active:scale-95 flex items-center justify-center transition-all duration-200 cursor-pointer"
          >
            <ChevronLeft className="w-3.5 h-3.5 stroke-[1.75]" />
          </button>
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next testimonial"
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-[#171715]/30 text-[#171715] hover:bg-[#171715] hover:text-white hover:scale-105 active:scale-95 flex items-center justify-center transition-all duration-200 cursor-pointer"
          >
            <ChevronRight className="w-3.5 h-3.5 stroke-[1.75]" />
          </button>
        </div>
      </div>
    </section>
  );
}
