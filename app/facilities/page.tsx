import type { Metadata } from "next";
import { Check, Clock, Compass } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { PillButton } from "@/components/ui/pill-button";
import {
  FACILITIES_DATA,
  ADDITIONAL_SERVICES,
  HOTEL_INFO,
} from "@/lib/hotel-data";
import { TextReveal } from "@/components/motion/text-reveal";
import { RevealOnScroll } from "@/components/motion/reveal-on-scroll";
import { StaggeredReveal, StaggerItem } from "@/components/motion/staggered-reveal";
import { PageTransition } from "@/components/motion/page-transition";

export const metadata: Metadata = {
  title: "Hotel Facilities & Guest Services",
  description:
    "Discover the verified facilities at City Boutique Hotel Sarajevo: Panoramic Rooftop Terrace, Halal-certified Royal Turkish Breakfast, 24/7 multilingual reception, smart keyless entry, airport transfers, and private Bosnia tours.",
};

const BOSNIA_TOURS = [
  {
    title: "Sarajevo Historic City Tour",
    route: "Baščaršija • Latin Bridge • Tunnel of Hope • Trebević & Vrelo Bosne",
    description:
      "A comprehensive private exploration of Sarajevo's Ottoman, Austro-Hungarian, and modern heritage led by a knowledgeable local guide.",
  },
  {
    title: "Herzegovina & Mostar Day Tour",
    route: "Konjic • Jablanica • Mostar Old Bridge • Blagaj Tekke • Počitelj & Kravice",
    description:
      "Journey south along the emerald Neretva River to the UNESCO-listed Stari Most in Mostar, the Dervish monastery at Blagaj spring, and medieval Počitelj.",
  },
  {
    title: "Vizier Towns: Travnik & Jajce Tour",
    route: "Ahmići • Travnik Fortress & Plava Voda • Jajce Waterfall & Pliva Lakes",
    description:
      "Explore the historic Ottoman Vizier capital of Travnik and the royal walled city of Jajce, famous for its dramatic waterfall and medieval wooden watermills.",
  },
];

export default function FacilitiesPage() {
  return (
    <PageTransition className="min-h-screen bg-[#FFFFFF] text-[#171715]">
      {/* Framed Editorial Hero matching Homepage DNA */}
      <section className="w-full max-w-[1840px] mx-auto px-3 sm:px-4 pt-3 sm:pt-4">
        <div className="relative w-full min-h-[400px] sm:min-h-[450px] rounded-[22px] sm:rounded-[26px] overflow-hidden flex flex-col justify-between bg-[#111512] shadow-[0_14px_40px_rgba(17,21,18,0.08)]">
          <div className="absolute inset-0 z-0">
            <img
              src="/images/hotel/hero-terrace.jpg"
              alt="Panoramic Rooftop Terrace at City Boutique Hotel Sarajevo"
              fetchPriority="high"
              width={1400}
              height={700}
              className="w-full h-full object-cover object-center brightness-[0.75]"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, rgba(17,21,18,0.58) 0%, rgba(17,21,18,0.28) 45%, rgba(17,21,18,0.82) 100%)",
              }}
            />
          </div>

          <Navbar variant="hero-overlay" />

          <div className="relative z-10 px-5 sm:px-8 lg:px-12 xl:px-16 pb-8 sm:pb-10 pt-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <p className="text-[11px] uppercase tracking-[0.18em] text-white/75 mb-2.5">
                Verified Amenities &bull; 4-Star Hospitality
              </p>
              <TextReveal
                lines={["Thoughtful Comfort.", "Exceptional Hospitality."]}
                as="h1"
                className="font-editorial text-[36px] sm:text-[50px] lg:text-[60px] font-light text-white leading-[1.05] tracking-[-0.035em]"
              />
            </div>
            <p className="text-xs sm:text-[13.5px] text-white/85 max-w-[330px] leading-[1.6]">
              From our signature rooftop Turkish breakfast overlooking Old Town
              to 24/7 multilingual concierge care, every facility is designed
              around your stay.
            </p>
          </div>
        </div>
      </section>

      {/* Main Signature Facilities Editorial Showcases */}
      <section className="max-w-[1840px] mx-auto px-5 sm:px-8 lg:px-12 xl:px-16 py-12 sm:py-16 space-y-14 sm:space-y-20">
        {FACILITIES_DATA.map((facility, idx) => {
          const isReversed = idx % 2 === 1;
          return (
            <RevealOnScroll key={facility.id} yOffset={24}>
              <article
                id={facility.id}
                className="scroll-mt-24 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
              >
                {/* Dual Image Composition */}
                <div
                  className={`lg:col-span-7 grid grid-cols-12 gap-4 items-center ${
                    isReversed ? "lg:order-2" : "lg:order-1"
                  }`}
                >
                  <div className="col-span-12 sm:col-span-7 h-[280px] sm:h-[380px] rounded-[24px] overflow-hidden bg-[#111512] shadow-[0_8px_30px_rgba(0,0,0,0.06)] group">
                    <img
                      src={facility.image}
                      alt={facility.title}
                      loading="lazy"
                      width={560}
                      height={420}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-106"
                    />
                  </div>
                  <div className="col-span-12 sm:col-span-5 h-[220px] sm:h-[320px] rounded-[24px] overflow-hidden bg-[#111512] shadow-[0_6px_24px_rgba(0,0,0,0.05)] group">
                    <img
                      src={facility.secondaryImage || facility.image}
                      alt={`${facility.title} detail`}
                      loading="lazy"
                      width={420}
                      height={360}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-106"
                    />
                  </div>
                </div>

                {/* Editorial Copy */}
                <div
                  className={`lg:col-span-5 ${
                    isReversed ? "lg:order-1" : "lg:order-2"
                  }`}
                >
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F7F7F5] border border-[#E7E7E3] text-[11px] text-[#777773] mb-4">
                    <span>{facility.category}</span>
                    {facility.hours && (
                      <>
                        <span>&bull;</span>
                        <span className="inline-flex items-center gap-1 text-[#171715]">
                          <Clock className="w-3 h-3" />
                          {facility.hours}
                        </span>
                      </>
                    )}
                  </div>

                  <h2 className="font-editorial text-[28px] sm:text-[38px] font-normal text-[#171715] leading-[1.12] tracking-[-0.025em]">
                    {facility.title}
                  </h2>

                  <p className="mt-4 text-xs sm:text-[14px] text-[#777773] leading-[1.75]">
                    {facility.description}
                  </p>

                  <ul className="mt-6 pt-6 border-t border-[#E7E7E3] space-y-3">
                    {facility.details.map((detail) => (
                      <li
                        key={detail}
                        className="flex items-start gap-2.5 text-xs sm:text-[13px] text-[#171715]"
                      >
                        <span className="w-5 h-5 rounded-full bg-[#D3F0DC] text-[#1E4629] flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-3 h-3" />
                        </span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </RevealOnScroll>
          );
        })}
      </section>

      {/* Additional Verified Guest Services Grid */}
      <section className="bg-[#F7F7F5] border-y border-[#E7E7E3] py-12 sm:py-16">
        <div className="max-w-[1840px] mx-auto px-5 sm:px-8 lg:px-12 xl:px-16">
          <RevealOnScroll yOffset={16}>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-12">
              <div>
                <p className="text-[11px] uppercase tracking-[0.16em] text-[#777773] mb-2">
                  Seamless Stay
                </p>
                <h2 className="font-editorial text-[30px] sm:text-[42px] font-normal text-[#171715] leading-[1.1] tracking-[-0.03em]">
                  Every Essential,
                  <br />
                  Thoughtfully Provided.
                </h2>
              </div>
              <p className="text-xs sm:text-[13px] text-[#777773] max-w-[360px] leading-[1.65]">
                All guest services are verified directly from City Boutique Hotel
                Sarajevo&apos;s official property offerings.
              </p>
            </div>
          </RevealOnScroll>

          <StaggeredReveal
            stagger={0.08}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {ADDITIONAL_SERVICES.map((service, idx) => (
              <StaggerItem key={service.title} yOffset={20}>
                <div className="rounded-[24px] bg-white border border-[#E7E7E3] p-6 sm:p-8 flex flex-col justify-between h-full shadow-[0_4px_20px_rgba(0,0,0,0.02)] transition-transform duration-300 hover:-translate-y-1">
                  <div>
                    <span className="text-[11px] font-mono text-[#777773]">
                      0{idx + 1}
                    </span>
                    <h3 className="font-editorial text-xl font-normal text-[#171715] mt-3 mb-2.5 tracking-[-0.015em]">
                      {service.title}
                    </h3>
                    <p className="text-xs sm:text-[13px] text-[#777773] leading-[1.65]">
                      {service.description}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggeredReveal>
        </div>
      </section>

      {/* Private Bosnia Tours & Airport Mobility Section */}
      <section
        id="tours"
        className="scroll-mt-24 max-w-[1840px] mx-auto px-5 sm:px-8 lg:px-12 xl:px-16 py-12 sm:py-16"
      >
        <RevealOnScroll yOffset={20}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F7F7F5] border border-[#E7E7E3] text-[11px] text-[#171715] mb-4">
                <Compass className="w-3.5 h-3.5 text-[#5E6B5B]" />
                <span>Official Hotel Concierge Excursions</span>
              </div>
              <h2 className="font-editorial text-[30px] sm:text-[40px] font-normal text-[#171715] leading-[1.1] tracking-[-0.03em]">
                Private Tours, Rent-a-Car &amp; Airport Transfers.
              </h2>
              <p className="mt-4 text-xs sm:text-[14px] text-[#777773] leading-[1.7] mb-6">
                Our reception desk organizes private door-to-door transfers from
                Sarajevo International Airport (SJJ), reliable vehicle rentals,
                and custom sightseeing excursions across Bosnia and Herzegovina.
              </p>
              <div className="flex flex-wrap gap-3">
                <PillButton
                  href={HOTEL_INFO.contact.whatsappUrl}
                  external
                  variant="solid-dark"
                >
                  Inquire via WhatsApp
                </PillButton>
                <PillButton href="/contact" variant="dark-outline">
                  Contact Reception
                </PillButton>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-4">
              {BOSNIA_TOURS.map((tour) => (
                <div
                  key={tour.title}
                  className="rounded-[24px] bg-[#F7F7F5] border border-[#E7E7E3] p-6 sm:p-7 shadow-[0_4px_20px_rgba(0,0,0,0.02)] transition-transform duration-300 hover:-translate-y-1"
                >
                  <p className="text-[11px] uppercase tracking-[0.14em] text-[#5E6B5B] font-medium mb-1">
                    {tour.route}
                  </p>
                  <h3 className="font-editorial text-xl sm:text-2xl font-normal text-[#171715] tracking-[-0.015em]">
                    {tour.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-[13px] text-[#777773] leading-[1.65]">
                    {tour.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </RevealOnScroll>
      </section>

      <Footer />
    </PageTransition>
  );
}
