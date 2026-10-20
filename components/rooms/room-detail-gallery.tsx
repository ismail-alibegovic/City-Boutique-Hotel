"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Expand, ChevronLeft, ChevronRight, X } from "lucide-react";
import { MOTION_EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface RoomDetailGalleryProps {
  roomName: string;
  images: string[];
}

export function RoomDetailGallery({
  roomName,
  images,
}: RoomDetailGalleryProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Fallback for browsers without native <dialog closedby="any"> support per modern-web-guidance
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (!("closedBy" in HTMLDialogElement.prototype)) {
      const handleBackdropClick = (event: MouseEvent) => {
        if (event.target !== dialog) return;
        const rect = dialog.getBoundingClientRect();
        const isDialogContent =
          rect.top <= event.clientY &&
          event.clientY <= rect.top + rect.height &&
          rect.left <= event.clientX &&
          event.clientX <= rect.left + rect.width;
        if (isDialogContent) return;
        dialog.close();
      };
      dialog.addEventListener("click", handleBackdropClick);
      return () => dialog.removeEventListener("click", handleBackdropClick);
    }
  }, []);

  const openLightbox = (index: number) => {
    setActiveIdx(index);
    dialogRef.current?.showModal();
  };

  const closeLightbox = () => {
    dialogRef.current?.close();
  };

  const prevSlide = () => {
    setActiveIdx((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setActiveIdx((prev) => (prev + 1) % images.length);
  };

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Main Feature Image with Crossfade */}
        <div
          onClick={() => openLightbox(activeIdx)}
          className="lg:col-span-8 group relative h-[320px] sm:h-[440px] lg:h-[500px] rounded-[24px] overflow-hidden bg-[#111512] cursor-pointer shadow-[0_8px_30px_rgba(0,0,0,0.06)]"
        >
          <AnimatePresence mode="wait">
            <motion.img
              key={images[activeIdx]}
              src={images[activeIdx]}
              alt={`${roomName} — Photo ${activeIdx + 1}`}
              fetchPriority="high"
              width={920}
              height={600}
              initial={shouldReduceMotion ? false : { opacity: 0.8, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={shouldReduceMotion ? undefined : { opacity: 0.85 }}
              transition={{ duration: 0.35, ease: MOTION_EASE.editorial }}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-104"
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent pointer-events-none" />
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              openLightbox(activeIdx);
            }}
            className="absolute top-4 right-4 px-3.5 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/25 text-xs text-white inline-flex items-center gap-2 hover:bg-white hover:text-[#171715] transition-all duration-200 cursor-pointer group-hover:scale-105"
          >
            <Expand className="w-3.5 h-3.5" />
            <span>View Fullscreen ({images.length})</span>
          </button>
        </div>

        {/* Side Thumbnail Grid */}
        <div className="lg:col-span-4 grid grid-cols-4 lg:grid-cols-2 gap-3 sm:gap-4 h-auto lg:h-[500px]">
          {images.slice(0, 4).map((img, idx) => {
            const isCurrent = idx === activeIdx;
            return (
              <button
                key={`${img}-${idx}`}
                type="button"
                onClick={() => setActiveIdx(idx)}
                className={cn(
                  "group relative h-[85px] sm:h-[120px] lg:h-full rounded-[18px] overflow-hidden bg-[#111512] transition-all duration-200 cursor-pointer",
                  isCurrent
                    ? "ring-2 ring-[#171715] ring-offset-2 scale-[0.98]"
                    : "opacity-85 hover:opacity-100 hover:scale-[1.02]"
                )}
              >
                <img
                  src={img}
                  alt={`${roomName} preview ${idx + 1}`}
                  loading="lazy"
                  width={360}
                  height={240}
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-106"
                />
                <div
                  className={cn(
                    "absolute inset-0 transition-opacity",
                    isCurrent ? "bg-black/10" : "bg-black/25 group-hover:bg-transparent"
                  )}
                />
                {idx === 3 && images.length > 4 && (
                  <div className="absolute inset-0 bg-black/45 flex items-center justify-center">
                    <span className="text-xs font-medium text-white px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30">
                      +{images.length - 4} More
                    </span>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Native Lightbox Modal */}
      <dialog
        ref={dialogRef}
        {...({ closedby: "any" } as React.DialogHTMLAttributes<HTMLDialogElement>)}
        aria-label="Room Photo Lightbox"
        className="m-auto w-[calc(100%-2rem)] max-w-[1080px] rounded-[24px] bg-[#111512] text-white p-4 sm:p-6 border border-white/15 shadow-2xl outline-none"
      >
        <div className="flex items-center justify-between pb-4 border-b border-white/15">
          <p className="text-sm font-normal text-white">
            {roomName} &bull; Photo {activeIdx + 1} of {images.length}
          </p>
          <button
            type="button"
            onClick={closeLightbox}
            aria-label="Close lightbox"
            className="w-9 h-9 rounded-full border border-white/25 flex items-center justify-center text-white hover:bg-white hover:text-[#171715] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="relative my-4 h-[320px] sm:h-[520px] rounded-[18px] overflow-hidden bg-black flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.img
              key={images[activeIdx]}
              src={images[activeIdx]}
              alt={`${roomName} full view`}
              initial={shouldReduceMotion ? false : { opacity: 0.8, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={shouldReduceMotion ? undefined : { opacity: 0.8 }}
              transition={{ duration: 0.25, ease: MOTION_EASE.editorial }}
              className="max-w-full max-h-full object-contain"
            />
          </AnimatePresence>
          <button
            type="button"
            onClick={prevSlide}
            aria-label="Previous photo"
            className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 backdrop-blur-md border border-white/25 flex items-center justify-center text-white hover:bg-white hover:text-[#171715] active:scale-95 transition-all cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={nextSlide}
            aria-label="Next photo"
            className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 backdrop-blur-md border border-white/25 flex items-center justify-center text-white hover:bg-white hover:text-[#171715] active:scale-95 transition-all cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </dialog>
    </>
  );
}
