import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Maximize2,
  Users,
  BedDouble,
  Eye,
  Check,
  Clock,
  Phone,
  Sparkles,
} from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { PillButton } from "@/components/ui/pill-button";
import { RoomDetailGallery } from "@/components/rooms/room-detail-gallery";
import { ROOM_CATEGORIES, HOTEL_INFO } from "@/lib/hotel-data";

export function generateStaticParams() {
  return ROOM_CATEGORIES.map((room) => ({
    slug: room.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const room = ROOM_CATEGORIES.find((r) => r.slug === slug);
  if (!room) {
    return { title: "Room Not Found" };
  }
  return {
    title: `${room.name} (${room.size})`,
    description: room.longDescription,
  };
}

export default async function RoomDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const room = ROOM_CATEGORIES.find((r) => r.slug === slug);

  if (!room) {
    notFound();
  }

  const relatedRooms = ROOM_CATEGORIES.filter((r) => r.slug !== room.slug);

  return (
    <main className="min-h-screen bg-[#FFFFFF] text-[#171715]">
      <Navbar variant="page-header" />

      <div className="max-w-[1380px] mx-auto px-5 sm:px-9 lg:px-[52px] pt-8 sm:pt-10 pb-14">
        {/* Breadcrumb & Back Link */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <Link
            href="/rooms"
            className="inline-flex items-center gap-2 text-xs font-medium text-[#777773] hover:text-[#171715] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Rooms &amp; Suites</span>
          </Link>

          <div className="flex items-center gap-2 text-xs text-[#777773]">
            <span>{room.inventoryCount} Rooms Available in Category</span>
            <span>&bull;</span>
            <span>100% Smoke-Free</span>
          </div>
        </div>

        {/* Title & Header Action Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 sm:mb-10">
          <div>
            <p className="text-[11px] uppercase tracking-[0.16em] text-[#777773] mb-2">
              City Boutique Hotel Sarajevo &bull; {room.size}
            </p>
            <h1 className="font-editorial text-[34px] sm:text-[48px] lg:text-[56px] font-normal text-[#171715] leading-[1.08] tracking-[-0.03em]">
              {room.name}
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <PillButton
              href={`/booking?room=${room.slug}`}
              variant="solid-dark"
            >
              Reserve This Room
            </PillButton>
            <PillButton
              href={HOTEL_INFO.contact.whatsappUrl}
              external
              variant="dark-outline"
            >
              WhatsApp Inquiry
            </PillButton>
          </div>
        </div>

        {/* Interactive Gallery with Lightbox */}
        <RoomDetailGallery roomName={room.name} images={room.gallery} />

        {/* Room Specifications & Description Layout */}
        <div className="mt-14 sm:mt-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left 7 Columns: Editorial Description & Verified Amenities */}
          <div className="lg:col-span-7 space-y-12">
            {/* Key Specs Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 rounded-[24px] bg-[#F7F7F5] border border-[#E7E7E3]">
              <div>
                <div className="flex items-center gap-1.5 text-[11px] text-[#777773] mb-1">
                  <Maximize2 className="w-3.5 h-3.5 text-[#171715]" />
                  <span>Area</span>
                </div>
                <p className="text-sm sm:text-base font-medium text-[#171715]">
                  {room.size}
                </p>
              </div>

              <div>
                <div className="flex items-center gap-1.5 text-[11px] text-[#777773] mb-1">
                  <Users className="w-3.5 h-3.5 text-[#171715]" />
                  <span>Capacity</span>
                </div>
                <p className="text-sm sm:text-base font-medium text-[#171715]">
                  {room.capacity}
                </p>
              </div>

              <div>
                <div className="flex items-center gap-1.5 text-[11px] text-[#777773] mb-1">
                  <BedDouble className="w-3.5 h-3.5 text-[#171715]" />
                  <span>Bedding</span>
                </div>
                <p className="text-xs sm:text-sm font-medium text-[#171715]">
                  {room.bedConfiguration}
                </p>
              </div>

              <div>
                <div className="flex items-center gap-1.5 text-[11px] text-[#777773] mb-1">
                  <Eye className="w-3.5 h-3.5 text-[#171715]" />
                  <span>Outlook</span>
                </div>
                <p className="text-xs sm:text-sm font-medium text-[#171715]">
                  {room.view}
                </p>
              </div>
            </div>

            {/* Room Story & Architecture */}
            <div>
              <h2 className="font-editorial text-2xl sm:text-[28px] font-normal text-[#171715] tracking-[-0.02em] mb-4">
                Thoughtful Design &amp; Acoustic Serenity
              </h2>
              <p className="text-xs sm:text-[14px] text-[#777773] leading-[1.75]">
                {room.longDescription}
              </p>
              <p className="mt-4 text-xs sm:text-[14px] text-[#777773] leading-[1.75]">
                Every stay at City Boutique Hotel includes our signature
                Halal-certified Royal Turkish Breakfast served each morning on
                the panoramic rooftop terrace overlooking Sarajevo&apos;s
                historic quarter, alongside 24-hour multilingual reception
                assistance.
              </p>
            </div>

            {/* Verified Room Amenities Grid */}
            <div className="pt-8 border-t border-[#E7E7E3]">
              <h2 className="font-editorial text-2xl sm:text-[28px] font-normal text-[#171715] tracking-[-0.02em] mb-6">
                Verified Room Amenities
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {room.amenities.map((amenity) => (
                  <div
                    key={amenity}
                    className="flex items-center gap-3 p-3.5 rounded-[16px] bg-[#F7F7F5] border border-[#E7E7E3]/80"
                  >
                    <span className="w-6 h-6 rounded-full bg-[#D3F0DC] text-[#1E4629] flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5" />
                    </span>
                    <span className="text-xs sm:text-[13px] font-medium text-[#171715]">
                      {amenity}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Hotel Stay Policies */}
            <div className="pt-8 border-t border-[#E7E7E3]">
              <h2 className="font-editorial text-2xl sm:text-[28px] font-normal text-[#171715] tracking-[-0.02em] mb-5">
                House Rules &amp; Stay Information
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-[13px]">
                <div className="p-5 rounded-[20px] border border-[#E7E7E3]">
                  <div className="flex items-center gap-2 font-medium text-[#171715] mb-1.5">
                    <Clock className="w-4 h-4 text-[#5E6B5B]" />
                    <span>Check-In &amp; Check-Out</span>
                  </div>
                  <p className="text-[#777773] leading-relaxed">
                    Check-in from 14:00 (24/7 front desk for late arrivals).
                    Check-out until 11:00 with complimentary luggage storage.
                  </p>
                </div>

                <div className="p-5 rounded-[20px] border border-[#E7E7E3]">
                  <div className="flex items-center gap-2 font-medium text-[#171715] mb-1.5">
                    <Sparkles className="w-4 h-4 text-[#5E6B5B]" />
                    <span>Breakfast &amp; Property Standards</span>
                  </div>
                  <p className="text-[#777773] leading-relaxed">
                    100% smoke-free rooms. Halal-certified Turkish breakfast
                    served daily on the rooftop terrace.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right 5 Columns: Sticky Reservation Card */}
          <div className="lg:col-span-5 lg:sticky lg:top-24">
            <div className="rounded-[24px] border border-[#E7E7E3] bg-[#F7F7F5] p-6 sm:p-8 shadow-[0_12px_36px_rgba(23,23,21,0.04)]">
              <div className="flex items-center justify-between pb-5 border-b border-[#E7E7E3]">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.14em] text-[#777773]">
                    Direct Reservation Inquiry
                  </p>
                  <h3 className="font-editorial text-2xl font-normal text-[#171715] mt-1">
                    {room.name}
                  </h3>
                </div>
                <span className="px-3 py-1 rounded-full bg-[#D3F0DC] text-[#1E4629] text-[11px] font-medium">
                  {room.size}
                </span>
              </div>

              <div className="py-6 space-y-4 text-xs sm:text-[13px] text-[#777773]">
                <p className="leading-[1.65]">
                  Reserve directly with our 24/7 Sarajevo reception desk for
                  verified seasonal rates, personalized bed configuration (
                  {room.bedConfiguration}), and private airport transfer
                  arrangements.
                </p>

                <ul className="space-y-2.5 text-[#171715]">
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#5E6B5B]" />
                    <span>Rooftop Royal Turkish Breakfast included</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#5E6B5B]" />
                    <span>No hidden booking portal fees</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#5E6B5B]" />
                    <span>24/7 reception &amp; complimentary luggage room</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-3 pt-2">
                <PillButton
                  href={`/booking?room=${room.slug}`}
                  variant="solid-dark"
                  className="w-full"
                >
                  Check Dates &amp; Request Booking
                </PillButton>

                <a
                  href={`https://wa.me/${HOTEL_INFO.contact.whatsappClean}?text=${encodeURIComponent(
                    `Hello City Boutique Hotel Sarajevo, I would like to check availability and rates for the ${room.name} (${room.size}).`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-5 rounded-full border border-[#171715]/25 bg-white text-xs sm:text-[13px] font-medium text-[#171715] hover:border-[#171715] flex items-center justify-center gap-2 transition-colors"
                >
                  <span>Instant WhatsApp Concierge</span>
                </a>
              </div>

              <div className="mt-6 pt-5 border-t border-[#E7E7E3] flex items-center justify-between text-xs text-[#777773]">
                <span>24/7 Front Desk</span>
                <a
                  href={`tel:${HOTEL_INFO.contact.phoneClean}`}
                  className="inline-flex items-center gap-1.5 font-medium text-[#171715] hover:underline"
                >
                  <Phone className="w-3.5 h-3.5" />
                  {HOTEL_INFO.contact.phone}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Related Accommodation Categories */}
        <section className="mt-24 pt-16 border-t border-[#E7E7E3]">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-[11px] uppercase tracking-[0.16em] text-[#777773] mb-2">
                Explore More
              </p>
              <h2 className="font-editorial text-[28px] sm:text-[36px] font-normal text-[#171715] tracking-[-0.025em]">
                Other Room Categories
              </h2>
            </div>
            <Link
              href="/rooms"
              className="text-xs font-medium text-[#171715] underline underline-offset-4"
            >
              View All Rooms
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {relatedRooms.map((rel) => (
              <Link
                key={rel.id}
                href={`/rooms/${rel.slug}`}
                className="group relative h-[250px] rounded-[22px] overflow-hidden bg-[#111512] block"
              >
                <img
                  src={rel.image}
                  alt={rel.name}
                  loading="lazy"
                  width={420}
                  height={280}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <span className="absolute top-4 left-4 px-3.5 py-1 rounded-full bg-black/30 backdrop-blur-md border border-white/25 text-[11px] text-white">
                  Details
                </span>
                <span className="absolute top-4 right-4 px-2.5 py-0.5 rounded-full bg-black/30 backdrop-blur-sm text-[10px] text-white/85">
                  {rel.size} &bull; {rel.capacity}
                </span>
                <div className="absolute bottom-4 left-5 right-5">
                  <h3 className="text-lg font-normal text-white tracking-[-0.015em]">
                    {rel.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}
