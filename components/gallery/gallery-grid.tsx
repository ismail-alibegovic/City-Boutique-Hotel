"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Expand, ChevronLeft, ChevronRight, X } from "lucide-react";
import { GALLERY_IMAGES } from "@/lib/hotel-data";
import { MOTION_EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

const CATEGORIES = [
  "All",
  "Rooms & Suites",
  "Terrace & Views",
  "Turkish Breakfast",
  "Lobby & Lounge",
  "Sarajevo",
];

export function GalleryGrid() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [lightboxIdx, setLightboxIdx] = useState<number>(0);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const filteredImages =
    selectedCategory === "All"
      ? GALLERY_IMAGES
      : GALLERY_IMAGES.filter((img) => img.category === selectedCategory);

  // Light-dismiss fallback for browsers without native <dialog closedby="any"> support
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

  const openModal = (idx: number) => {
    setLightboxIdx(idx);
    dialogRef.current?.showModal();
  };

  const closeModal = () => {
    dialogRef.current?.close();
  };

  const handlePrev = () => {
    setLightboxIdx((prev) =>
      prev === 0 ? filteredImages.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setLightboxIdx((prev) => (prev + 1) % filteredImages.length);
  };

  const activePhoto = filteredImages[lightboxIdx] || filteredImages[0];

  return (
    <>
      {/* Category Filter Pills with Smooth Active Indicator */}
      <div className="flex flex-wrap items-center gap-2 mb-10">
        {CATEGORIES.map((category) => {
          const active = selectedCategory === category;
          return (
            <button
              key={category}
              type="button"
              onClick={() => {
                setSelectedCategory(category);
                setLightboxIdx(0);
              }}
              className={cn(
                "relative px-4 sm:px-5 py-2 rounded-full text-xs sm:text-[13px] transition-colors cursor-pointer border select-none",
                active
                  ? "text-white border-[#171715] font-medium"
                  : "bg-[#F7F7F5] text-[#777773] border-[#E7E7E3] hover:text-[#171715] hover:border-[#171715]/40"
              )}
            >
              {active && (
                <motion.span
                  layoutId="gallery-active-pill"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  className="absolute inset-0 rounded-full bg-[#171715] -z-10 shadow-2xs"
                />
              )}
              {category}
            </button>
          );
        })}
      </div>

      {/* Editorial Photo Grid with Smooth Motion Layout */}
      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5"
      >
        <AnimatePresence>
          {filteredImages.map((img, idx) => (
            <motion.div
              layout
              key={img.id}
              initial={
                shouldReduceMotion
                  ? false
                  : { opacity: 0, scale: 0.96 }
              }
              animate={{ opacity: 1, scale: 1 }}
              exit={
                shouldReduceMotion
                  ? undefined
                  : { opacity: 0, scale: 0.96 }
              }
              transition={{
                duration: 0.35,
                ease: MOTION_EASE.editorial,
              }}
              onClick={() => openModal(idx)}
              className="group relative h-[280px] sm:h-[320px] rounded-[24px] overflow-hidden bg-[#111512] cursor-pointer shadow-[0_4px_20px_rgba(0,0,0,0.04)]"
            >
              <img
                src={img.src}
                alt={img.title}
                loading="lazy"
                width={480}
                height={360}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-106"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent opacity-85 group-hover:opacity-95 transition-opacity" />

              <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/35 backdrop-blur-md border border-white/20 text-[10px] uppercase tracking-[0.12em] text-white">
                {img.category}
              </span>

              <span className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/15 backdrop-blur-md border border-white/25 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-105">
                <Expand className="w-3.5 h-3.5" />
              </span>

              <div className="absolute bottom-4 left-5 right-5 transition-transform duration-300 group-hover:-translate-y-1">
                <h3 className="text-base font-normal text-white tracking-[-0.015em]">
                  {img.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Native Modal Lightbox with closedby="any" */}
      <dialog
        ref={dialogRef}
        {...({ closedby: "any" } as React.DialogHTMLAttributes<HTMLDialogElement>)}
        aria-label="Hotel Photo Lightbox"
        className="m-auto w-[calc(100%-2rem)] max-w-[1080px] rounded-[24px] bg-[#111512] text-white p-4 sm:p-6 border border-white/15 shadow-2xl outline-none"
      >
        {activePhoto && (
          <>
            <div className="flex items-center justify-between pb-4 border-b border-white/15">
              <div>
                <p className="text-[10px] uppercase tracking-[0.16em] text-white/60">
                  {activePhoto.category} &bull; {lightboxIdx + 1} /{" "}
                  {filteredImages.length}
                </p>
                <p className="text-sm font-normal text-white mt-0.5">
                  {activePhoto.title}
                </p>
              </div>
              <button
                type="button"
                onClick={closeModal}
                aria-label="Close lightbox"
                className="w-9 h-9 rounded-full border border-white/25 flex items-center justify-center text-white hover:bg-white hover:text-[#171715] transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="relative my-4 h-[320px] sm:h-[520px] rounded-[18px] overflow-hidden bg-black flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activePhoto.id}
                  src={activePhoto.src}
                  alt={activePhoto.title}
                  initial={
                    shouldReduceMotion
                      ? false
                      : { opacity: 0.8, scale: 0.98 }
                  }
                  animate={{ opacity: 1, scale: 1 }}
                  exit={
                    shouldReduceMotion ? undefined : { opacity: 0.8 }
                  }
                  transition={{
                    duration: 0.25,
                    ease: MOTION_EASE.editorial,
                  }}
                  className="max-w-full max-h-full object-contain"
                />
              </AnimatePresence>
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous image"
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 backdrop-blur-md border border-white/25 flex items-center justify-center text-white hover:bg-white hover:text-[#171715] active:scale-95 transition-all cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next image"
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 backdrop-blur-md border border-white/25 flex items-center justify-center text-white hover:bg-white hover:text-[#171715] active:scale-95 transition-all cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </>
        )}
      </dialog>
    </>
  );
}
