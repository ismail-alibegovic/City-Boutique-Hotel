"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  format,
  isSameDay,
  isBefore,
  isAfter,
  startOfDay,
  getDay,
  addDays,
} from "date-fns";
import { ChevronLeft, ChevronRight, Users, Calendar as CalendarIcon } from "lucide-react";
import { ROOM_CATEGORIES } from "@/lib/hotel-data";
import { PillButton } from "@/components/ui/pill-button";
import { cn } from "@/lib/utils";

const WEEKDAYS = ["M", "T", "W", "T", "F", "S", "S"];

export function RoomsAvailabilitySection() {
  const router = useRouter();

  // Room cards carousel index (shows 3 cards at a time on desktop, cycles through all 4 categories)
  const [startIndex, setStartIndex] = useState(0);

  // Deterministic initial date for Next.js 16 prerendering, updated on mount
  const [today, setToday] = useState<Date>(() => new Date(2026, 9, 20));
  const [currentMonth, setCurrentMonth] = useState<Date>(() =>
    new Date(2026, 9, 1)
  );
  const [checkIn, setCheckIn] = useState<Date | null>(() =>
    new Date(2026, 9, 22)
  );
  const [checkOut, setCheckOut] = useState<Date | null>(() =>
    new Date(2026, 9, 23)
  );
  const [guests, setGuests] = useState<number>(2);

  useEffect(() => {
    const now = startOfDay(new Date());
    setToday(now);
    setCurrentMonth(startOfMonth(now));
    setCheckIn(addDays(now, 2));
    setCheckOut(addDays(now, 3));
  }, []);

  const visibleRooms = useMemo(() => {
    const list = [];
    for (let i = 0; i < 3; i++) {
      list.push(ROOM_CATEGORIES[(startIndex + i) % ROOM_CATEGORIES.length]);
    }
    return list;
  }, [startIndex]);

  const handlePrevRooms = () => {
    setStartIndex((prev) =>
      prev === 0 ? ROOM_CATEGORIES.length - 1 : prev - 1
    );
  };

  const handleNextRooms = () => {
    setStartIndex((prev) => (prev + 1) % ROOM_CATEGORIES.length);
  };

  // Calendar days calculation (Monday-first grid matching M T W T F S S in screenshot)
  const daysInMonth = useMemo(() => {
    const start = startOfMonth(currentMonth);
    const end = endOfMonth(currentMonth);
    return eachDayOfInterval({ start, end });
  }, [currentMonth]);

  const leadingEmptySlots = useMemo(() => {
    const dayOfWeek = getDay(startOfMonth(currentMonth)); // 0 = Sun, 1 = Mon...
    return dayOfWeek === 0 ? 6 : dayOfWeek - 1;
  }, [currentMonth]);

  const handleDateClick = (day: Date) => {
    if (isBefore(day, today)) return;

    if (!checkIn || (checkIn && checkOut)) {
      setCheckIn(day);
      setCheckOut(null);
    } else if (isBefore(day, checkIn)) {
      setCheckIn(day);
      setCheckOut(null);
    } else if (isSameDay(day, checkIn)) {
      setCheckOut(addDays(day, 1));
    } else {
      setCheckOut(day);
    }
  };

  const isDateInRange = (day: Date) => {
    if (!checkIn || !checkOut) return false;
    return (
      (isAfter(day, checkIn) && isBefore(day, checkOut)) ||
      isSameDay(day, checkIn) ||
      isSameDay(day, checkOut)
    );
  };

  const bookingHref = useMemo(() => {
    const params = new URLSearchParams();
    if (checkIn) params.set("checkIn", format(checkIn, "yyyy-MM-dd"));
    if (checkOut) params.set("checkOut", format(checkOut, "yyyy-MM-dd"));
    params.set("guests", String(guests));
    return `/booking?${params.toString()}`;
  }, [checkIn, checkOut, guests]);

  return (
    <section
      aria-labelledby="rooms-availability-heading"
      className="w-full max-w-[1840px] mx-auto px-5 sm:px-8 lg:px-12 xl:px-16 pt-7 sm:pt-9 lg:pt-10 pb-8 sm:pb-10 lg:pb-12"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-9 xl:gap-12 items-start">
        {/* Left Column (~65% / 7-8 cols): 3 Room Cards + Editorial Headline & Controls */}
        <div className="lg:col-span-7 xl:col-span-8 flex flex-col min-w-0">
          {/* 3 Rounded Room Cards Row (Horizontal swipeable row on mobile, 3-col grid on sm+) */}
          <div className="flex sm:grid sm:grid-cols-3 gap-3 sm:gap-4 overflow-x-auto sm:overflow-visible snap-x snap-mandatory pb-1 sm:pb-0 -mx-5 px-5 sm:mx-0 sm:px-0">
            {visibleRooms.map((room, idx) => (
              <Link
                key={`${room.id}-${idx}`}
                href={`/rooms/${room.slug}`}
                className="group relative w-[235px] sm:w-auto snap-start h-[180px] sm:h-[190px] lg:h-[202px] xl:h-[224px] rounded-[18px] overflow-hidden bg-[#171715] block shrink-0 focus:outline-none focus:ring-2 focus:ring-[#171715]"
              >
                <img
                  src={room.image}
                  alt={`${room.name} at City Boutique Hotel Sarajevo`}
                  loading="lazy"
                  width={400}
                  height={260}
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
                {/* Subtle Dark Gradient Overlay */}
                <div
                  className="absolute inset-0 transition-opacity duration-300"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(17,21,18,0.22) 0%, rgba(17,21,18,0.06) 45%, rgba(17,21,18,0.78) 100%)",
                  }}
                />

                {/* Top-Left Frosted "Details" Pill Badge matching Dribbble screenshot */}
                <span className="absolute top-3 left-3 px-3 py-0.5 rounded-full bg-white/15 backdrop-blur-md border border-white/35 text-[11px] font-normal text-white tracking-[-0.01em] transition-colors group-hover:bg-white group-hover:text-[#171715]">
                  Details
                </span>

                {/* Bottom-Left Room Category Name */}
                <div className="absolute bottom-3 left-3.5 right-3.5 flex items-baseline justify-between gap-2">
                  <h3 className="text-[16px] sm:text-[17px] font-normal text-white tracking-[-0.02em] leading-snug">
                    {room.shortName}
                  </h3>
                  <span className="text-[10px] text-white/75 opacity-0 group-hover:opacity-100 transition-opacity">
                    {room.size}
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* Below the Cards: Editorial Heading + Circular Prev/Next Buttons */}
          <div className="mt-6 sm:mt-7 flex items-start justify-between gap-4">
            <h2
              id="rooms-availability-heading"
              className="font-editorial text-[28px] sm:text-[36px] lg:text-[40px] font-normal text-[#171715] leading-[1.12] tracking-[-0.03em]"
            >
              Find Your Perfect
              <br />
              Stay in Sarajevo.
            </h2>

            {/* Circular Prev / Next Navigation Buttons */}
            <div className="flex items-center gap-2 pt-1 shrink-0">
              <button
                type="button"
                onClick={handlePrevRooms}
                aria-label="Previous room category"
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-[#E7E7E3] text-[#777773] hover:border-[#171715] hover:text-[#171715] flex items-center justify-center transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-3.5 h-3.5 stroke-[1.75]" />
              </button>
              <button
                type="button"
                onClick={handleNextRooms}
                aria-label="Next room category"
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-[#171715] text-[#171715] hover:bg-[#171715] hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <ChevronRight className="w-3.5 h-3.5 stroke-[1.75]" />
              </button>
            </div>
          </div>

          {/* Supporting Description */}
          <p className="mt-2.5 text-xs text-[#777773] leading-[1.6] max-w-[320px]">
            From intimate double rooms to spacious suites, discover comfort
            designed around your stay.
          </p>

          {/* Compact Booking Pill CTA */}
          <div className="mt-5 flex flex-wrap items-center gap-4">
            <PillButton href={bookingHref} variant="dark-outline">
              Booking
            </PillButton>
          </div>
        </div>

        {/* Right Column (~35% / 5-4 cols): Minimalist Availability Calendar */}
        <div className="lg:col-span-5 xl:col-span-4 flex flex-col lg:items-end w-full">
          <div className="w-full">
            <h3 className="font-editorial text-[22px] sm:text-[25px] lg:text-[26px] font-normal text-[#171715] leading-[1.2] tracking-[-0.025em] text-left lg:text-right mb-3.5">
              Check Room Availability
              <br />
              <span className="text-[#171715]">On This Calendar</span>
            </h3>

            {/* Minimalist Soft-Surface Calendar Module matching Dribbble reference */}
            <div className="rounded-[20px] border border-[#E7E7E3]/90 bg-[#F7F7F5] p-4 sm:p-5">
              {/* Month Navigation Header */}
              <div className="flex items-center justify-between mb-3.5 px-1">
                <button
                  type="button"
                  onClick={() => setCurrentMonth((m) => subMonths(m, 1))}
                  aria-label="Previous month"
                  className="w-6 h-6 rounded-full flex items-center justify-center text-[#777773] hover:text-[#171715] hover:bg-white transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                <span className="text-xs font-semibold text-[#171715] tracking-[-0.01em]">
                  {format(currentMonth, "MMMM yyyy")}
                </span>
                <button
                  type="button"
                  onClick={() => setCurrentMonth((m) => addMonths(m, 1))}
                  aria-label="Next month"
                  className="w-6 h-6 rounded-full flex items-center justify-center text-[#777773] hover:text-[#171715] hover:bg-white transition-colors cursor-pointer"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Weekday Labels Row */}
              <div className="grid grid-cols-7 gap-1 text-center mb-2">
                {WEEKDAYS.map((day, idx) => (
                  <span
                    key={`${day}-${idx}`}
                    className="text-[10px] font-medium text-[#777773] uppercase tracking-wider"
                  >
                    {day}
                  </span>
                ))}
              </div>

              {/* Calendar Date Pills Grid */}
              <div className="grid grid-cols-7 gap-1 sm:gap-1.5 place-items-center">
                {Array.from({ length: leadingEmptySlots }).map((_, idx) => (
                  <div key={`empty-${idx}`} className="w-8 h-8 sm:w-[34px] sm:h-[34px]" />
                ))}

                {daysInMonth.map((day) => {
                  const isPast = isBefore(day, today);
                  const isSelectedStart = checkIn && isSameDay(day, checkIn);
                  const isSelectedEnd = checkOut && isSameDay(day, checkOut);
                  const inRange = isDateInRange(day);
                  const isTodayDate = isSameDay(day, today);

                  return (
                    <button
                      key={day.toISOString()}
                      type="button"
                      disabled={isPast}
                      onClick={() => handleDateClick(day)}
                      aria-label={format(day, "MMMM d, yyyy")}
                      aria-pressed={Boolean(isSelectedStart || isSelectedEnd || inRange)}
                      className={cn(
                        "w-8 h-8 sm:w-[34px] sm:h-[34px] rounded-full text-[11px] flex items-center justify-center transition-all duration-150 select-none",
                        isPast &&
                          "bg-[#EFEFEC]/70 text-[#777773]/40 cursor-not-allowed",
                        !isPast &&
                          !inRange &&
                          !isSelectedStart &&
                          !isSelectedEnd &&
                          "bg-white text-[#171715] font-medium hover:bg-[#E7E7E3]/70 cursor-pointer",
                        (inRange || isSelectedStart || isSelectedEnd) &&
                          "bg-[#CBEFD6] text-[#1E4629] font-semibold cursor-pointer",
                        (isSelectedStart || isSelectedEnd) &&
                          "ring-1 ring-[#1E4629]/30",
                        isTodayDate &&
                          !inRange &&
                          !isSelectedStart &&
                          "bg-[#F7D7D4] text-[#78281F] font-semibold"
                      )}
                    >
                      {format(day, "d")}
                    </button>
                  );
                })}
              </div>

              {/* Single-Line Compact Interactive Selection Bar */}
              <div className="mt-3.5 pt-3 border-t border-[#E7E7E3] flex flex-wrap items-center justify-between gap-2 text-[11px]">
                <span className="inline-flex items-center gap-1 text-[#777773]">
                  <CalendarIcon className="w-3 h-3 text-[#171715]" />
                  {checkIn ? format(checkIn, "MMM d") : "Check-in"}
                  {" – "}
                  {checkOut ? format(checkOut, "MMM d") : "Check-out"}
                </span>

                <div className="inline-flex items-center gap-1.5">
                  <label htmlFor="calendar-guests" className="sr-only">
                    Guests
                  </label>
                  <select
                    id="calendar-guests"
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    className="bg-white border border-[#E7E7E3] rounded-full px-2 py-0.5 text-[11px] font-medium text-[#171715] focus:outline-none cursor-pointer"
                  >
                    {[1, 2, 3, 4, 5].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? "Guest" : "Guests"}
                      </option>
                    ))}
                  </select>

                  <button
                    type="button"
                    onClick={() => router.push(bookingHref)}
                    className="px-3 py-1 rounded-full bg-[#171715] text-white text-[11px] font-medium hover:bg-[#2B2B28] transition-colors cursor-pointer"
                  >
                    Check &rarr;
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
