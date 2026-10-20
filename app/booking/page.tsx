import type { Metadata } from "next";
import { Suspense } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { BookingExperience } from "@/components/booking/booking-experience";
import { TextReveal } from "@/components/motion/text-reveal";
import { PageTransition } from "@/components/motion/page-transition";

export const metadata: Metadata = {
  title: "Book Your Stay | Direct Reservation Inquiry",
  description:
    "Check room availability and request direct seasonal rates at City Boutique Hotel Sarajevo. Choose from Standard Double Rooms, Deluxe Rooms, Junior Suites, and Penthouse Apartments.",
};

export default function BookingPage() {
  return (
    <PageTransition className="min-h-screen bg-[#FFFFFF] text-[#171715]">
      <Navbar variant="page-header" />

      <section className="max-w-[1840px] mx-auto px-5 sm:px-8 lg:px-12 xl:px-16 pt-10 sm:pt-12 pb-14">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 sm:mb-10">
          <div>
            <p className="text-[11px] uppercase tracking-[0.16em] text-[#777773] mb-2">
              Direct Hotel Reservations &bull; Mula Mustafe Bašeskije 2
            </p>
            <TextReveal
              lines={["Reserve Your Stay", "in Sarajevo."]}
              as="h1"
              className="font-editorial text-[36px] sm:text-[50px] lg:text-[58px] font-normal text-[#171715] leading-[1.06] tracking-[-0.03em]"
            />
          </div>
          <p className="text-xs sm:text-[13px] text-[#777773] max-w-[360px] leading-[1.65]">
            Select your preferred check-in and check-out dates below to request
            direct room availability and seasonal rates from our 24/7 reception
            desk, including our daily Rooftop Royal Turkish Breakfast.
          </p>
        </div>

        <Suspense
          fallback={
            <div className="h-[520px] rounded-[24px] bg-[#F7F7F5] border border-[#E7E7E3] animate-pulse p-8" />
          }
        >
          <BookingExperience />
        </Suspense>
      </section>

      <Footer />
    </PageTransition>
  );
}
