import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Maximize2, Users, BedDouble, ShieldCheck, Check } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { PillButton } from "@/components/ui/pill-button";
import { ROOM_CATEGORIES, HOTEL_INFO } from "@/lib/hotel-data";
import { TextReveal } from "@/components/motion/text-reveal";
import { RevealOnScroll } from "@/components/motion/reveal-on-scroll";
import { PageTransition } from "@/components/motion/page-transition";

export const metadata: Metadata = {
  title: "Rooms & Suites",
  description:
    "Explore the 24 soundproof boutique rooms and suites at City Boutique Hotel Sarajevo: Standard Double Rooms, Deluxe Double Rooms, 70 m² Junior Suites, and 50 m² Penthouse Apartments.",
};

export default function RoomsPage() {
  return (
    <PageTransition className="min-h-screen bg-[#FFFFFF] text-[#171715]">
      {/* Framed Editorial Hero matching Homepage DNA */}
      <section className="w-full max-w-[1840px] mx-auto px-3 sm:px-4 pt-3 sm:pt-4">
        <div className="relative w-full min-h-[400px] sm:min-h-[450px] rounded-[22px] sm:rounded-[26px] overflow-hidden flex flex-col justify-between bg-[#111512] shadow-[0_14px_40px_rgba(17,21,18,0.08)]">
          <div className="absolute inset-0 z-0">
            <img
              src="/images/hotel/sarajevo-oldtown.png"
              alt="Deluxe Double Room overlooking Sarajevo Old Town at City Boutique Hotel"
              fetchPriority="high"
              width={1400}
              height={700}
              className="w-full h-full object-cover object-center brightness-[0.72]"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, rgba(17,21,18,0.6) 0%, rgba(17,21,18,0.28) 45%, rgba(17,21,18,0.82) 100%)",
              }}
            />
          </div>

          <Navbar variant="hero-overlay" />

          <div className="relative z-10 px-5 sm:px-8 lg:px-12 xl:px-16 pb-8 sm:pb-10 pt-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <p className="text-[11px] uppercase tracking-[0.18em] text-white/75 mb-2.5">
                24 Soundproof Rooms &amp; Suites &bull; 100% Smoke-Free
              </p>
              <TextReveal
                lines={["Accommodations", "Crafted for Rest."]}
                as="h1"
                className="font-editorial text-[36px] sm:text-[50px] lg:text-[60px] font-light text-white leading-[1.05] tracking-[-0.035em]"
              />
            </div>
            <p className="text-xs sm:text-[13.5px] text-white/85 max-w-[330px] leading-[1.6]">
              Every room and suite features acoustic soundproofing, smart
              keyless entry, walk-in rain showers, and our signature rooftop
              Turkish breakfast.
            </p>
          </div>
        </div>
      </section>

      {/* Inventory Overview Strip */}
      <section className="max-w-[1840px] mx-auto px-5 sm:px-8 lg:px-12 xl:px-16 pt-8 sm:pt-10">
        <RevealOnScroll yOffset={16}>
          <div className="rounded-[20px] bg-[#F7F7F5] border border-[#E7E7E3] p-5 sm:p-6 grid grid-cols-2 md:grid-cols-4 gap-5 shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
            <div>
              <p className="text-[11px] uppercase tracking-[0.14em] text-[#777773]">
                Standard Double
              </p>
              <p className="font-editorial text-2xl sm:text-3xl font-normal text-[#171715] mt-1">
                10 Rooms <span className="text-xs text-[#777773] font-sans">/ 15 m²</span>
              </p>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-[0.14em] text-[#777773]">
                Deluxe / Superior
              </p>
              <p className="font-editorial text-2xl sm:text-3xl font-normal text-[#171715] mt-1">
                8 Rooms <span className="text-xs text-[#777773] font-sans">/ 24 m²</span>
              </p>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-[0.14em] text-[#777773]">
                Junior Suite
              </p>
              <p className="font-editorial text-2xl sm:text-3xl font-normal text-[#171715] mt-1">
                4 Suites <span className="text-xs text-[#777773] font-sans">/ 70 m²</span>
              </p>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-[0.14em] text-[#777773]">
                Penthouse Apartment
              </p>
              <p className="font-editorial text-2xl sm:text-3xl font-normal text-[#171715] mt-1">
                2 Residences <span className="text-xs text-[#777773] font-sans">/ 50 m²</span>
              </p>
            </div>
          </div>
        </RevealOnScroll>
      </section>

      {/* Detailed Room Category Cards */}
      <section className="max-w-[1840px] mx-auto px-5 sm:px-8 lg:px-12 xl:px-16 py-10 sm:py-14 space-y-12 sm:space-y-16">
        {ROOM_CATEGORIES.map((room, idx) => {
          const isReversed = idx % 2 === 1;
          return (
            <RevealOnScroll key={room.id} yOffset={24}>
              <article className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                {/* Image Gallery Preview Column */}
                <div
                  className={`lg:col-span-7 ${
                    isReversed ? "lg:order-2" : "lg:order-1"
                  }`}
                >
                  <div className="grid grid-cols-12 gap-3.5 sm:gap-4">
                    <Link
                      href={`/rooms/${room.slug}`}
                      className="col-span-12 sm:col-span-8 group relative h-[280px] sm:h-[380px] rounded-[24px] overflow-hidden bg-[#111512] block shadow-[0_8px_30px_rgba(0,0,0,0.06)]"
                    >
                      <img
                        src={room.image}
                        alt={room.name}
                        loading="lazy"
                        width={720}
                        height={480}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                      <span className="absolute top-4 left-4 px-3.5 py-1 rounded-full bg-black/30 backdrop-blur-md border border-white/25 text-[11px] text-white transition-transform group-hover:scale-105">
                        Explore Room
                      </span>
                      <span className="absolute bottom-4 left-5 text-xs text-white/90">
                        {room.view}
                      </span>
                    </Link>

                    <div className="col-span-12 sm:col-span-4 grid grid-cols-2 sm:grid-cols-1 gap-3.5 sm:gap-4 h-auto sm:h-[380px]">
                      <Link
                        href={`/rooms/${room.slug}`}
                        className="group relative h-[140px] sm:h-full rounded-[20px] overflow-hidden bg-[#111512] block shadow-[0_4px_20px_rgba(0,0,0,0.04)]"
                      >
                        <img
                          src={room.gallery[1] || room.image}
                          alt={`${room.name} interior view`}
                          loading="lazy"
                          width={360}
                          height={240}
                          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-106"
                        />
                      </Link>
                      <Link
                        href={`/rooms/${room.slug}`}
                        className="group relative h-[140px] sm:h-full rounded-[20px] overflow-hidden bg-[#111512] block shadow-[0_4px_20px_rgba(0,0,0,0.04)]"
                      >
                        <img
                          src={room.gallery[4] || room.gallery[2] || room.image}
                          alt={`${room.name} bathroom and details`}
                          loading="lazy"
                          width={360}
                          height={240}
                          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-106"
                        />
                        <div className="absolute inset-0 bg-black/35 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <span className="px-3 py-1 rounded-full bg-white text-[#171715] text-[11px] font-medium">
                            +{room.gallery.length} Photos
                          </span>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Editorial Room Details Column */}
                <div
                  className={`lg:col-span-5 flex flex-col justify-between ${
                    isReversed ? "lg:order-1" : "lg:order-2"
                  }`}
                >
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F7F7F5] border border-[#E7E7E3] text-[11px] text-[#777773] mb-4">
                      <span>0{idx + 1}</span>
                      <span>&bull;</span>
                      <span>{room.inventoryCount} Rooms in Category</span>
                    </div>

                    <h2 className="font-editorial text-[28px] sm:text-[36px] font-normal text-[#171715] leading-[1.12] tracking-[-0.025em]">
                      <Link
                        href={`/rooms/${room.slug}`}
                        className="hover:opacity-75 transition-opacity"
                      >
                        {room.name}
                      </Link>
                    </h2>

                    <p className="mt-3 text-xs sm:text-[13px] text-[#777773] leading-[1.7]">
                      {room.longDescription}
                    </p>

                    {/* Specifications Chips */}
                    <div className="mt-6 pt-6 border-t border-[#E7E7E3] grid grid-cols-2 gap-4">
                      <div className="flex items-center gap-2.5">
                        <span className="w-8 h-8 rounded-full bg-[#F7F7F5] border border-[#E7E7E3] flex items-center justify-center text-[#171715]">
                          <Maximize2 className="w-3.5 h-3.5" />
                        </span>
                        <div>
                          <p className="text-[10px] uppercase tracking-wider text-[#777773]">
                            Room Size
                          </p>
                          <p className="text-xs font-medium text-[#171715]">
                            {room.size}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2.5">
                        <span className="w-8 h-8 rounded-full bg-[#F7F7F5] border border-[#E7E7E3] flex items-center justify-center text-[#171715]">
                          <Users className="w-3.5 h-3.5" />
                        </span>
                        <div>
                          <p className="text-[10px] uppercase tracking-wider text-[#777773]">
                            Occupancy
                          </p>
                          <p className="text-xs font-medium text-[#171715]">
                            {room.capacity}
                          </p>
                        </div>
                      </div>

                      <div className="col-span-2 flex items-center gap-2.5">
                        <span className="w-8 h-8 rounded-full bg-[#F7F7F5] border border-[#E7E7E3] flex items-center justify-center text-[#171715] shrink-0">
                          <BedDouble className="w-3.5 h-3.5" />
                        </span>
                        <div>
                          <p className="text-[10px] uppercase tracking-wider text-[#777773]">
                            Bedding &amp; Layout
                          </p>
                          <p className="text-xs font-medium text-[#171715]">
                            {room.bedConfiguration}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Key Amenities Preview */}
                    <div className="mt-6 grid grid-cols-2 gap-y-2 gap-x-3">
                      {room.amenities.slice(0, 6).map((amenity) => (
                        <div
                          key={amenity}
                          className="flex items-center gap-2 text-xs text-[#777773]"
                        >
                          <Check className="w-3.5 h-3.5 text-[#5E6B5B] shrink-0" />
                          <span className="truncate">{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-8 pt-6 border-t border-[#E7E7E3] flex flex-wrap items-center gap-3.5">
                    <PillButton
                      href={`/booking?room=${room.slug}`}
                      variant="solid-dark"
                    >
                      Inquire &amp; Book Room
                    </PillButton>
                    <Link
                      href={`/rooms/${room.slug}`}
                      className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-[#E7E7E3] text-xs font-medium text-[#171715] hover:border-[#171715] hover:bg-[#F7F7F5] transition-colors"
                    >
                      <span>Room Details</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </article>
            </RevealOnScroll>
          );
        })}
      </section>

      {/* Hotel Policies & Direct Reservation Guarantee Banner */}
      <section className="max-w-[1840px] mx-auto px-5 sm:px-8 lg:px-12 xl:px-16 pb-12">
        <RevealOnScroll yOffset={16}>
          <div className="rounded-[24px] bg-[#F7F7F5] border border-[#E7E7E3] p-8 sm:p-12 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
            <div className="max-w-[600px]">
              <div className="inline-flex items-center gap-2 text-xs font-medium text-[#5E6B5B] mb-2">
                <ShieldCheck className="w-4 h-4" />
                <span>Direct Hotel Reservation Desk</span>
              </div>
              <h2 className="font-editorial text-2xl sm:text-3xl font-normal text-[#171715] tracking-[-0.02em]">
                Need assistance choosing the right room or suite?
              </h2>
              <p className="mt-2 text-xs sm:text-[13px] text-[#777773] leading-[1.65]">
                {HOTEL_INFO.policies.pricingNote} Check-in from 14:00 (24/7
                reception for late flights) &bull; Check-out until 11:00.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <PillButton href="/booking" variant="dark-outline">
                Check Availability
              </PillButton>
              <PillButton
                href={HOTEL_INFO.contact.whatsappUrl}
                external
                variant="simple-pill"
              >
                WhatsApp +90 506 745 81 20
              </PillButton>
            </div>
          </div>
        </RevealOnScroll>
      </section>

      <Footer />
    </PageTransition>
  );
}
