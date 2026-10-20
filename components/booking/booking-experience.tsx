"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
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
  differenceInCalendarDays,
  parseISO,
  isValid,
} from "date-fns";
import {
  ChevronLeft,
  ChevronRight,
  Check,
  AlertCircle,
  ArrowUpRight,
  Calendar as CalendarIcon,
  Users,
  BedDouble,
  Phone,
  Mail,
  ShieldCheck,
} from "lucide-react";
import { ROOM_CATEGORIES, HOTEL_INFO } from "@/lib/hotel-data";
import { cn } from "@/lib/utils";

const WEEKDAYS = ["M", "T", "W", "T", "F", "S", "S"];

interface BookingInquiryResponse {
  inquiryCode: string;
  roomName: string;
  summaryText: string;
  whatsappDirectUrl: string;
  mailtoUrl: string;
  receivedAt: string;
}

export function BookingExperience() {
  const searchParams = useSearchParams();

  const [today, setToday] = useState<Date>(() => new Date(2026, 9, 20));

  useEffect(() => {
    setToday(startOfDay(new Date()));
  }, []);

  const initialCheckIn = useMemo(() => {
    const param = searchParams.get("checkIn");
    if (param) {
      const parsed = parseISO(param);
      if (isValid(parsed) && !isBefore(parsed, today)) return parsed;
    }
    return addDays(today, 2);
  }, [searchParams, today]);

  const initialCheckOut = useMemo(() => {
    const param = searchParams.get("checkOut");
    if (param) {
      const parsed = parseISO(param);
      if (isValid(parsed) && isAfter(parsed, initialCheckIn)) return parsed;
    }
    return addDays(initialCheckIn, 2);
  }, [searchParams, initialCheckIn]);

  const initialRoom = useMemo(() => {
    const param = searchParams.get("room");
    if (param && ROOM_CATEGORIES.some((r) => r.slug === param)) {
      return param;
    }
    return ROOM_CATEGORIES[1].slug; // Deluxe Double Room default
  }, [searchParams]);

  const initialGuests = useMemo(() => {
    const param = Number(searchParams.get("guests"));
    if (param >= 1 && param <= 5) return param;
    return 2;
  }, [searchParams]);

  const [currentMonth, setCurrentMonth] = useState(() =>
    startOfMonth(initialCheckIn)
  );
  const [checkIn, setCheckIn] = useState<Date | null>(initialCheckIn);
  const [checkOut, setCheckOut] = useState<Date | null>(initialCheckOut);
  const [guests, setGuests] = useState<number>(initialGuests);
  const [selectedRoomSlug, setSelectedRoomSlug] = useState<string>(initialRoom);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [bedPreference, setBedPreference] = useState("Queen / Double Bed");
  const [airportTransfer, setAirportTransfer] = useState(false);
  const [notes, setNotes] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [inquiryResult, setInquiryResult] =
    useState<BookingInquiryResponse | null>(null);

  const selectedRoom = useMemo(
    () =>
      ROOM_CATEGORIES.find((r) => r.slug === selectedRoomSlug) ||
      ROOM_CATEGORIES[0],
    [selectedRoomSlug]
  );

  const nightsCount = useMemo(() => {
    if (!checkIn || !checkOut) return 0;
    return Math.max(1, differenceInCalendarDays(checkOut, checkIn));
  }, [checkIn, checkOut]);

  const daysInMonth = useMemo(() => {
    const start = startOfMonth(currentMonth);
    const end = endOfMonth(currentMonth);
    return eachDayOfInterval({ start, end });
  }, [currentMonth]);

  const leadingEmptySlots = useMemo(() => {
    const dayOfWeek = getDay(startOfMonth(currentMonth));
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!checkIn || !checkOut) {
      setError("Please select both a check-in and check-out date on the calendar.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          roomSlug: selectedRoomSlug,
          checkIn: format(checkIn, "yyyy-MM-dd"),
          checkOut: format(checkOut, "yyyy-MM-dd"),
          guests,
          fullName,
          email,
          phone,
          airportTransfer,
          bedPreference,
          notes,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setError(data.error || "Please verify all required fields.");
      } else {
        setInquiryResult(data);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } catch {
      setError(
        "Unable to submit reservation inquiry. Please try again or contact +387 33 566 850."
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (inquiryResult) {
    return (
      <div className="max-w-[820px] mx-auto rounded-[28px] bg-[#F7F7F5] border border-[#E7E7E3] p-6 sm:p-10 lg:p-12 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D3F0DC] text-[#1E4629] text-xs font-semibold">
            <Check className="w-4 h-4" />
            Reservation Inquiry Prepared &bull; {inquiryResult.inquiryCode}
          </span>
          <span className="text-xs text-[#777773]">
            Status: Awaiting Hotel Reception Confirmation
          </span>
        </div>

        <div>
          <h2 className="font-editorial text-2xl sm:text-4xl font-normal text-[#171715] leading-[1.12] tracking-[-0.025em]">
            Complete Your Direct Reservation Request
          </h2>
          <p className="mt-3 text-xs sm:text-[14px] text-[#777773] leading-[1.7]">
            Important: Your dates and room selection have been logged as a{" "}
            <strong className="text-[#171715] font-medium">
              Reservation Inquiry ({inquiryResult.inquiryCode})
            </strong>
            . Because City Boutique Hotel Sarajevo confirms live room inventory
            and seasonal direct rates personally through our 24/7 reservations
            desk, your stay is confirmed once our team replies via WhatsApp,
            email, or telephone.
          </p>
        </div>

        {/* Summary Box */}
        <div className="rounded-[20px] bg-white border border-[#E7E7E3] p-5 sm:p-6">
          <p className="text-[11px] uppercase tracking-[0.14em] text-[#777773] mb-3">
            Stay Inquiry Summary
          </p>
          <pre className="text-xs sm:text-[13px] font-sans text-[#171715] whitespace-pre-wrap leading-[1.75]">
            {inquiryResult.summaryText}
          </pre>
        </div>

        {/* Direct Dispatch Actions */}
        <div className="space-y-3 pt-2">
          <p className="text-xs font-medium text-[#171715]">
            Choose your preferred channel for immediate confirmation from our
            24/7 Sarajevo front desk:
          </p>
          <div className="flex flex-wrap items-center gap-3.5">
            <a
              href={inquiryResult.whatsappDirectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 rounded-full bg-[#171715] text-white pl-6 pr-2 py-2 text-xs sm:text-[13px] font-medium hover:bg-[#2B2B28] transition-colors"
            >
              <span>Confirm Instantly via WhatsApp (+90 506 745 81 20)</span>
              <span className="w-8 h-8 rounded-full bg-white text-[#171715] flex items-center justify-center">
                <ArrowUpRight className="w-4 h-4" />
              </span>
            </a>

            <a
              href={inquiryResult.mailtoUrl}
              className="inline-flex items-center gap-2 rounded-full border border-[#171715]/25 bg-white px-5 py-2.5 text-xs sm:text-[13px] font-medium text-[#171715] hover:border-[#171715] transition-colors"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Send via Email ({HOTEL_INFO.contact.email})</span>
            </a>

            <a
              href={`tel:${HOTEL_INFO.contact.phoneClean}`}
              className="inline-flex items-center gap-2 rounded-full border border-[#E7E7E3] bg-white px-5 py-2.5 text-xs sm:text-[13px] font-medium text-[#171715] hover:border-[#171715] transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call {HOTEL_INFO.contact.phone}</span>
            </a>
          </div>
        </div>

        <div className="pt-4 border-t border-[#E7E7E3] flex items-center justify-between text-xs text-[#777773]">
          <button
            type="button"
            onClick={() => setInquiryResult(null)}
            className="underline underline-offset-4 hover:text-[#171715] cursor-pointer"
          >
            Modify dates or room selection
          </button>
          <Link href="/rooms" className="hover:text-[#171715]">
            Return to Rooms &rarr;
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
      {/* Left 5 Columns: Minimalist Calendar & Selected Room Summary */}
      <div className="lg:col-span-5 space-y-6">
        {/* Calendar Card matching Dribbble reference */}
        <div className="rounded-[24px] border border-[#E7E7E3] bg-white p-6 sm:p-7 shadow-[0_6px_28px_rgba(23,23,21,0.03)]">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[11px] uppercase tracking-[0.14em] text-[#777773]">
              Step 1 &bull; Select Stay Dates
            </span>
            {nightsCount > 0 && (
              <span className="px-2.5 py-0.5 rounded-full bg-[#D3F0DC] text-[#1E4629] text-[11px] font-medium">
                {nightsCount} {nightsCount === 1 ? "Night" : "Nights"}
              </span>
            )}
          </div>

          <div className="flex items-center justify-between mb-5 px-1">
            <button
              type="button"
              onClick={() => setCurrentMonth((m) => subMonths(m, 1))}
              aria-label="Previous month"
              className="w-7 h-7 rounded-full flex items-center justify-center text-[#777773] hover:text-[#171715] hover:bg-[#F7F7F5] transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <span className="text-xs sm:text-[13px] font-semibold text-[#171715]">
              {format(currentMonth, "MMMM yyyy")}
            </span>
            <button
              type="button"
              onClick={() => setCurrentMonth((m) => addMonths(m, 1))}
              aria-label="Next month"
              className="w-7 h-7 rounded-full flex items-center justify-center text-[#777773] hover:text-[#171715] hover:bg-[#F7F7F5] transition-colors cursor-pointer"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1.5 text-center mb-3">
            {WEEKDAYS.map((day, idx) => (
              <span
                key={`${day}-${idx}`}
                className="text-[10px] font-medium text-[#777773] uppercase"
              >
                {day}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1.5 sm:gap-2 place-items-center">
            {Array.from({ length: leadingEmptySlots }).map((_, idx) => (
              <div key={`empty-${idx}`} className="w-9 h-9" />
            ))}

            {daysInMonth.map((day) => {
              const isPast = isBefore(day, today);
              const isSelectedStart = checkIn && isSameDay(day, checkIn);
              const isSelectedEnd = checkOut && isSameDay(day, checkOut);
              const inRange = isDateInRange(day);

              return (
                <button
                  key={day.toISOString()}
                  type="button"
                  disabled={isPast}
                  onClick={() => handleDateClick(day)}
                  className={cn(
                    "w-9 h-9 sm:w-[38px] sm:h-[38px] rounded-full text-[11px] sm:text-xs flex items-center justify-center transition-all select-none",
                    isPast &&
                      "bg-[#F7F7F5]/60 text-[#777773]/35 cursor-not-allowed",
                    !isPast &&
                      !inRange &&
                      !isSelectedStart &&
                      !isSelectedEnd &&
                      "bg-[#F7F7F5] text-[#171715] font-medium hover:bg-[#E7E7E3] cursor-pointer",
                    (inRange || isSelectedStart || isSelectedEnd) &&
                      "bg-[#D3F0DC] text-[#1E4629] font-semibold cursor-pointer",
                    (isSelectedStart || isSelectedEnd) &&
                      "ring-1.5 ring-[#1E4629]/35 scale-105"
                  )}
                >
                  {format(day, "d")}
                </button>
              );
            })}
          </div>

          <div className="mt-5 pt-4 border-t border-[#E7E7E3] grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-[14px] bg-[#F7F7F5]">
              <p className="text-[10px] uppercase tracking-wider text-[#777773]">
                Check-In (From 14:00)
              </p>
              <p className="font-medium text-[#171715] mt-0.5">
                {checkIn ? format(checkIn, "EEE, MMM d, yyyy") : "Select date"}
              </p>
            </div>
            <div className="p-3 rounded-[14px] bg-[#F7F7F5]">
              <p className="text-[10px] uppercase tracking-wider text-[#777773]">
                Check-Out (Until 11:00)
              </p>
              <p className="font-medium text-[#171715] mt-0.5">
                {checkOut
                  ? format(checkOut, "EEE, MMM d, yyyy")
                  : "Select date"}
              </p>
            </div>
          </div>
        </div>

        {/* Selected Room Preview Card */}
        <div className="rounded-[24px] bg-[#F7F7F5] border border-[#E7E7E3] overflow-hidden">
          <div className="relative h-[200px] bg-[#111512]">
            <img
              src={selectedRoom.image}
              alt={selectedRoom.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
            <span className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full bg-black/35 backdrop-blur-md border border-white/25 text-[11px] text-white">
              {selectedRoom.size} &bull; {selectedRoom.capacity}
            </span>
            <div className="absolute bottom-3.5 left-4 right-4">
              <h3 className="text-lg font-normal text-white">
                {selectedRoom.name}
              </h3>
            </div>
          </div>
          <div className="p-5 space-y-3 text-xs text-[#777773]">
            <p className="leading-relaxed">{selectedRoom.description}</p>
            <div className="pt-2 border-t border-[#E7E7E3] flex items-center justify-between text-[#171715]">
              <span className="inline-flex items-center gap-1.5">
                <BedDouble className="w-3.5 h-3.5 text-[#5E6B5B]" />
                {selectedRoom.bedConfiguration}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Right 7 Columns: Room Category Selection & Guest Reservation Form */}
      <form
        onSubmit={handleSubmit}
        className="lg:col-span-7 rounded-[24px] bg-[#F7F7F5] border border-[#E7E7E3] p-6 sm:p-8 lg:p-10 space-y-8"
      >
        {error && (
          <div
            role="alert"
            className="flex items-start gap-2.5 p-4 rounded-[16px] bg-[#FADBD8]/70 border border-[#78281F]/20 text-xs text-[#78281F]"
          >
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Step 2: Room Category Selection */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] uppercase tracking-[0.14em] text-[#777773]">
              Step 2 &bull; Choose Accommodation Category
            </span>
            <span className="text-xs text-[#777773]">24 Total Rooms</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {ROOM_CATEGORIES.map((room) => {
              const active = room.slug === selectedRoomSlug;
              return (
                <button
                  key={room.id}
                  type="button"
                  onClick={() => setSelectedRoomSlug(room.slug)}
                  className={cn(
                    "p-4 rounded-[18px] border text-left transition-all cursor-pointer flex flex-col justify-between",
                    active
                      ? "bg-white border-[#171715] ring-1 ring-[#171715] shadow-xs"
                      : "bg-white/60 border-[#E7E7E3] hover:bg-white hover:border-[#171715]/40"
                  )}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-xs sm:text-sm font-medium text-[#171715]">
                      {room.name}
                    </span>
                    <span
                      className={cn(
                        "w-4 h-4 rounded-full border flex items-center justify-center shrink-0 mt-0.5",
                        active
                          ? "border-[#171715] bg-[#171715] text-white"
                          : "border-[#777773]/40"
                      )}
                    >
                      {active && <Check className="w-2.5 h-2.5" />}
                    </span>
                  </div>
                  <div className="mt-3 flex items-center justify-between text-[11px] text-[#777773]">
                    <span>{room.size}</span>
                    <span>{room.capacity}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 3: Guests & Preferences */}
        <div className="pt-6 border-t border-[#E7E7E3]">
          <span className="block text-[11px] uppercase tracking-[0.14em] text-[#777773] mb-4">
            Step 3 &bull; Guest Count &amp; Stay Preferences
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="booking-guests"
                className="block text-xs font-medium text-[#171715] mb-1.5"
              >
                Number of Guests *
              </label>
              <div className="relative">
                <Users className="w-3.5 h-3.5 text-[#777773] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <select
                  id="booking-guests"
                  value={guests}
                  onChange={(e) => setGuests(Number(e.target.value))}
                  className="w-full rounded-[14px] bg-white border border-[#E7E7E3] pl-9 pr-4 py-2.5 text-xs sm:text-[13px] text-[#171715] focus:outline-none focus:border-[#171715]"
                >
                  {[1, 2, 3, 4, 5].map((n) => (
                    <option key={n} value={n}>
                      {n} {n === 1 ? "Guest" : "Guests"}
                    </option>
                  ))}
                </select>
              </div>
              {guests > selectedRoom.maxGuests && (
                <p className="mt-1.5 text-[11px] text-[#78281F]">
                  Note: {selectedRoom.name} is rated for up to{" "}
                  {selectedRoom.maxGuests} guests. For {guests} guests, we
                  recommend our Junior Suite (up to 5 guests) or multiple rooms.
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="booking-bed"
                className="block text-xs font-medium text-[#171715] mb-1.5"
              >
                Bed Configuration Preference
              </label>
              <select
                id="booking-bed"
                value={bedPreference}
                onChange={(e) => setBedPreference(e.target.value)}
                className="w-full rounded-[14px] bg-white border border-[#E7E7E3] px-4 py-2.5 text-xs sm:text-[13px] text-[#171715] focus:outline-none focus:border-[#171715]"
              >
                <option value="Queen / Double Bed">Queen / Double Bed</option>
                <option value="Twin Beds (2 Separate Beds)">
                  Twin Beds (2 Separate Beds)
                </option>
                <option value="Suite Family Setup (Queen + Twin + Sofa)">
                  Suite Family Setup (Queen + Twin + Sofa)
                </option>
              </select>
            </div>
          </div>
        </div>

        {/* Step 4: Guest Contact Details */}
        <div className="pt-6 border-t border-[#E7E7E3] space-y-4">
          <span className="block text-[11px] uppercase tracking-[0.14em] text-[#777773]">
            Step 4 &bull; Guest Contact Information
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="booking-name"
                className="block text-xs font-medium text-[#171715] mb-1.5"
              >
                Full Name *
              </label>
              <input
                id="booking-name"
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="First & Last Name"
                className="w-full rounded-[14px] bg-white border border-[#E7E7E3] px-4 py-2.5 text-xs sm:text-[13px] text-[#171715] focus:outline-none focus:border-[#171715]"
              />
            </div>

            <div>
              <label
                htmlFor="booking-email"
                className="block text-xs font-medium text-[#171715] mb-1.5"
              >
                Email Address *
              </label>
              <input
                id="booking-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-[14px] bg-white border border-[#E7E7E3] px-4 py-2.5 text-xs sm:text-[13px] text-[#171715] focus:outline-none focus:border-[#171715]"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="booking-phone"
              className="block text-xs font-medium text-[#171715] mb-1.5"
            >
              Telephone / WhatsApp Number (with Country Code) *
            </label>
            <input
              id="booking-phone"
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+387 / +90 / +49 ..."
              className="w-full rounded-[14px] bg-white border border-[#E7E7E3] px-4 py-2.5 text-xs sm:text-[13px] text-[#171715] focus:outline-none focus:border-[#171715]"
            />
          </div>

          <label className="flex items-start gap-3 p-3.5 rounded-[14px] bg-white border border-[#E7E7E3] cursor-pointer">
            <input
              type="checkbox"
              checked={airportTransfer}
              onChange={(e) => setAirportTransfer(e.target.checked)}
              className="mt-0.5 rounded border-[#E7E7E3] text-[#171715] focus:ring-[#171715]"
            />
            <span className="text-xs text-[#171715]">
              <strong>Request Private Airport Transfer (SJJ)</strong> — Please
              include Sarajevo International Airport pickup details with my
              reservation quote.
            </span>
          </label>

          <div>
            <label
              htmlFor="booking-notes"
              className="block text-xs font-medium text-[#171715] mb-1.5"
            >
              Special Requests or Arrival Time (Optional)
            </label>
            <textarea
              id="booking-notes"
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Estimated arrival time, quiet floor preference, Bosnia day tour interest..."
              className="w-full rounded-[14px] bg-white border border-[#E7E7E3] p-3.5 text-xs sm:text-[13px] text-[#171715] focus:outline-none focus:border-[#171715]"
            />
          </div>
        </div>

        {/* Transparent Policy Note & Submit CTA */}
        <div className="pt-4 border-t border-[#E7E7E3] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-2 text-[11px] text-[#777773] max-w-[360px]">
            <ShieldCheck className="w-4 h-4 text-[#5E6B5B] shrink-0 mt-0.5" />
            <span>
              No upfront credit card charge. Our 24/7 reservations desk confirms
              live availability and direct rates directly with you.
            </span>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center justify-between gap-3 rounded-full bg-[#171715] text-white pl-6 pr-2 py-2 text-xs sm:text-[13px] font-medium hover:bg-[#2B2B28] transition-colors cursor-pointer shrink-0 disabled:opacity-50"
          >
            <span>
              {submitting
                ? "Preparing Inquiry..."
                : "Request Availability & Rates"}
            </span>
            <span className="w-8 h-8 rounded-full bg-white text-[#171715] flex items-center justify-center">
              <ArrowUpRight className="w-4 h-4" />
            </span>
          </button>
        </div>
      </form>
    </div>
  );
}
