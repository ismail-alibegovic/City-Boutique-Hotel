"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, CheckCircle2 } from "lucide-react";
import { TESTIMONIALS_DATA, HOTEL_INFO } from "@/lib/hotel-data";
import { cn } from "@/lib/utils";

export function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(2); // Center card active by default ("Caner Ç.")

  const handlePrev = () => {
    setActiveIndex((prev) =>
      prev === 0 ? TESTIMONIALS_DATA.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % TESTIMONIALS_DATA.length);
  };

  return (
    <section
      aria-labelledby="testimonials-heading"
      className="w-full py-8 sm:py-10 lg:py-12 overflow-hidden"
    >
      <div className="max-w-[1840px] mx-auto px-5 sm:px-8 lg:px-12 xl:px-16">
        {/* Centered Heading & Supporting Subtext matching Dribbble reference */}
        <div className="text-center max-w-[540px] mx-auto mb-8 sm:mb-10">
          <h2
            id="testimonials-heading"
            className="font-editorial text-[28px] sm:text-[36px] lg:text-[42px] font-normal text-[#171715] leading-[1.12] tracking-[-0.03em]"
          >
            Words From Our Guests.
          </h2>
          <p className="mt-2.5 text-xs text-[#777773] leading-[1.6] max-w-[430px] mx-auto">
            Rated {HOTEL_INFO.ratingSummary.score}/{HOTEL_INFO.ratingSummary.outOf}{" "}
            across {HOTEL_INFO.ratingSummary.reviewCount} verified Google guest
            reviews for our city-center location, rooftop Turkish breakfast, and
            warm hospitality.
          </p>
        </div>
      </div>

      {/* Horizontally Arranged Soft-Grey Testimonial Cards in a Subtle Arc matching Dribbble shot */}
      <div className="max-w-[1840px] mx-auto px-5 sm:px-8 lg:px-12 xl:px-16">
        <div className="flex lg:grid lg:grid-cols-5 gap-3.5 lg:gap-4 items-stretch overflow-x-auto lg:overflow-visible snap-x snap-mandatory py-2 -mx-5 px-5 sm:mx-0 sm:px-0">
          {TESTIMONIALS_DATA.map((item, idx) => {
            const isSelected = idx === activeIndex;
            return (
              <article
                key={item.id}
                onClick={() => setActiveIndex(idx)}
                className={cn(
                  "w-[280px] sm:w-[300px] lg:w-auto snap-center rounded-[20px] p-5 sm:p-6 flex flex-col justify-between min-h-[235px] sm:min-h-[252px] transition-all duration-500 cursor-pointer border shrink-0",
                  item.rotationClass,
                  isSelected
                    ? "bg-[#F3F3F0] border-[#D8D8D2] shadow-[0_10px_28px_rgba(23,23,21,0.05)] z-10"
                    : "bg-[#F7F7F5] border-[#EBEBE7] opacity-95 hover:opacity-100"
                )}
              >
                {/* Top Metadata Line (Origin + Flag inline matching Dribbble shot) */}
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
                      "w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-semibold shrink-0",
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
              </article>
            );
          })}
        </div>

        {/* Centered Circular Navigation Arrows Below matching Dribbble screenshot */}
        <div className="mt-8 sm:mt-9 flex items-center justify-center gap-2">
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous testimonial"
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-[#171715]/30 text-[#171715] hover:bg-[#171715] hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-3.5 h-3.5 stroke-[1.75]" />
          </button>
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next testimonial"
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-[#171715]/30 text-[#171715] hover:bg-[#171715] hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <ChevronRight className="w-3.5 h-3.5 stroke-[1.75]" />
          </button>
        </div>
      </div>
    </section>
  );
}
