"use client";

import { useState, useRef, useEffect } from "react";
import { Expand, ChevronLeft, ChevronRight, X } from "lucide-react";
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
        {/* Main Feature Image */}
        <div
          onClick={() => openLightbox(activeIdx)}
          className="lg:col-span-8 group relative h-[320px] sm:h-[440px] lg:h-[500px] rounded-[24px] overflow-hidden bg-[#111512] cursor-pointer"
        >
          <img
            src={images[activeIdx]}
            alt={`${roomName} — Photo ${activeIdx + 1}`}
            fetchPriority="high"
            width={920}
            height={600}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-104"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              openLightbox(activeIdx);
            }}
            className="absolute top-4 right-4 px-3.5 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/25 text-xs text-white inline-flex items-center gap-2 hover:bg-white hover:text-[#171715] transition-colors cursor-pointer"
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
                  "group relative h-[85px] sm:h-[120px] lg:h-full rounded-[18px] overflow-hidden bg-[#111512] transition-all cursor-pointer",
                  isCurrent
                    ? "ring-2 ring-[#171715] ring-offset-2"
                    : "opacity-80 hover:opacity-100"
                )}
              >
                <img
                  src={img}
                  alt={`${roomName} thumbnail ${idx + 1}`}
                  loading="lazy"
                  width={320}
                  height={220}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* Native Modal Lightbox Dialog with closedby="any" per modern-web-guidance */}
      <dialog
        ref={dialogRef}
        {...({ closedby: "any" } as React.DialogHTMLAttributes<HTMLDialogElement>)}
        aria-label={`${roomName} Photo Gallery`}
        className="m-auto w-[calc(100%-2rem)] max-w-[1080px] rounded-[24px] bg-[#111512] text-white p-4 sm:p-6 border border-white/15 shadow-2xl outline-none"
      >
        <div className="flex items-center justify-between pb-4 border-b border-white/15">
          <div>
            <p className="text-xs uppercase tracking-[0.14em] text-white/60">
              {roomName}
            </p>
            <p className="text-xs text-white/90 mt-0.5">
              Photograph {activeIdx + 1} of {images.length}
            </p>
          </div>
          <button
            type="button"
            onClick={closeLightbox}
            aria-label="Close gallery"
            className="w-9 h-9 rounded-full border border-white/25 flex items-center justify-center text-white hover:bg-white hover:text-[#171715] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="relative my-4 h-[320px] sm:h-[520px] rounded-[18px] overflow-hidden bg-black flex items-center justify-center">
          <img
            src={images[activeIdx]}
            alt={`${roomName} — Fullscreen ${activeIdx + 1}`}
            className="max-w-full max-h-full object-contain"
          />

          <button
            type="button"
            onClick={prevSlide}
            aria-label="Previous photo"
            className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 backdrop-blur-md border border-white/25 flex items-center justify-center text-white hover:bg-white hover:text-[#171715] transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={nextSlide}
            aria-label="Next photo"
            className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 backdrop-blur-md border border-white/25 flex items-center justify-center text-white hover:bg-white hover:text-[#171715] transition-colors cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {images.map((img, idx) => (
            <button
              key={`lb-thumb-${idx}`}
              type="button"
              onClick={() => setActiveIdx(idx)}
              className={cn(
                "w-16 h-12 rounded-[10px] overflow-hidden shrink-0 border transition-all cursor-pointer",
                idx === activeIdx
                  ? "border-white scale-105"
                  : "border-transparent opacity-55 hover:opacity-90"
              )}
            >
              <img
                src={img}
                alt={`Thumbnail ${idx + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </dialog>
    </>
  );
}
