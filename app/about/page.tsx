import type { Metadata } from "next";
import { ShieldCheck, Award, MapPin, HeartHandshake } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { PillButton } from "@/components/ui/pill-button";
import { HOTEL_INFO } from "@/lib/hotel-data";
import { TextReveal } from "@/components/motion/text-reveal";
import { RevealOnScroll } from "@/components/motion/reveal-on-scroll";
import { StaggeredReveal, StaggerItem } from "@/components/motion/staggered-reveal";
import { PageTransition } from "@/components/motion/page-transition";

export const metadata: Metadata = {
  title: "About Us | Our Story & Heritage",
  description:
    "Learn about City Boutique Hotel Sarajevo — over 20 years of warm Bosnian and Turkish hospitality in a carefully restored building at Mula Mustafe Bašeskije 2.",
};

export default function AboutPage() {
  return (
    <PageTransition className="min-h-screen bg-[#FFFFFF] text-[#171715]">
      {/* Framed Editorial Hero */}
      <section className="w-full max-w-[1840px] mx-auto px-3 sm:px-4 pt-3 sm:pt-4">
        <div className="relative w-full min-h-[400px] sm:min-h-[450px] rounded-[22px] sm:rounded-[26px] overflow-hidden flex flex-col justify-between bg-[#111512] shadow-[0_14px_40px_rgba(17,21,18,0.08)]">
          <div className="absolute inset-0 z-0">
            <img
              src="/images/hotel/lobby-lounge.jpg"
              alt="City Boutique Hotel Sarajevo ground-floor salon and reception"
              fetchPriority="high"
              width={1400}
              height={700}
              className="w-full h-full object-cover object-center brightness-[0.68]"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, rgba(17,21,18,0.6) 0%, rgba(17,21,18,0.3) 45%, rgba(17,21,18,0.84) 100%)",
              }}
            />
          </div>

          <Navbar variant="hero-overlay" />

          <div className="relative z-10 px-5 sm:px-8 lg:px-12 xl:px-16 pb-8 sm:pb-10 pt-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <p className="text-[11px] uppercase tracking-[0.18em] text-white/75 mb-2.5">
                Over 20 Years in Sarajevo &bull; 4-Star Boutique Hotel
              </p>
              <TextReveal
                lines={["Where Heritage Meets", "Thoughtful Comfort."]}
                as="h1"
                className="font-editorial text-[36px] sm:text-[50px] lg:text-[60px] font-light text-white leading-[1.05] tracking-[-0.035em]"
              />
            </div>
            <p className="text-xs sm:text-[13.5px] text-white/85 max-w-[330px] leading-[1.6]">
              Nestled in Sarajevo&apos;s captivating old quarter, our 24-room
              boutique hotel has welcomed international travelers as a second
              home for over two decades.
            </p>
          </div>
        </div>
      </section>

      {/* Editorial Story & Manager's Note */}
      <section className="max-w-[1840px] mx-auto px-5 sm:px-8 lg:px-12 xl:px-16 py-12 sm:py-16">
        <RevealOnScroll yOffset={20}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <p className="text-[11px] uppercase tracking-[0.16em] text-[#5E6B5B] font-medium">
                Our Story &bull; Mula Mustafe Bašeskije 2
              </p>
              <h2 className="font-editorial text-[30px] sm:text-[42px] font-normal text-[#171715] leading-[1.1] tracking-[-0.03em]">
                An Intimate Sanctuary in Sarajevo&apos;s Historic Heart.
              </h2>

              <div className="space-y-4 text-xs sm:text-[14px] text-[#777773] leading-[1.8]">
                <p>
                  Nestled in Sarajevo&apos;s captivating old quarter, City
                  Boutique Hotel offers an intimate retreat where Ottoman heritage
                  meets contemporary comfort. Present in the heart of our city for
                  over 20 years, our carefully restored building honors
                  Sarajevo&apos;s rich architectural legacy while providing modern
                  travelers with all the amenities they expect from a four-star
                  boutique experience.
                </p>
                <p>
                  Just five minutes on foot from Baščaršija and steps from the
                  National Theater, our 24 elegant rooms and suites feature
                  acoustic soundproof windows, premium bedding, walk-in rain
                  showers, and smart keyless entry.
                </p>
                <p>
                  Each morning begins on our glass-framed rooftop terrace with our
                  famous Halal-certified Royal Turkish Breakfast overlooking the
                  terracotta rooftops and minarets of Sarajevo.
                </p>
              </div>

              {/* Official Signature from Hotel Manager Yaşar Tufan */}
              <div className="pt-6 border-t border-[#E7E7E3] flex items-center justify-between">
                <div>
                  <p className="font-serif text-xl text-[#171715] font-medium tracking-wide">
                    {HOTEL_INFO.manager}
                  </p>
                  <p className="text-[11px] uppercase tracking-[0.16em] text-[#777773] mt-0.5">
                    {HOTEL_INFO.managerTitle} &bull; City Boutique Hotel Sarajevo
                  </p>
                </div>
                <PillButton href="/booking" variant="dark-outline">
                  Book Your Stay
                </PillButton>
              </div>
            </div>

            <div className="lg:col-span-6 grid grid-cols-12 gap-4">
              <div className="col-span-7 h-[360px] sm:h-[440px] rounded-[24px] overflow-hidden bg-[#111512] shadow-[0_8px_30px_rgba(0,0,0,0.06)] group">
                <img
                  src="/images/hotel/terrace-view.png"
                  alt="Rooftop terrace overlooking Sarajevo at City Boutique Hotel"
                  loading="lazy"
                  width={540}
                  height={480}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-106"
                />
              </div>
              <div className="col-span-5 flex flex-col gap-4 h-[360px] sm:h-[440px]">
                <div className="flex-1 rounded-[22px] overflow-hidden bg-[#111512] shadow-[0_4px_20px_rgba(0,0,0,0.05)] group">
                  <img
                    src="/images/hotel/breakfast-main.jpg"
                    alt="Royal Turkish Breakfast at City Boutique Hotel Sarajevo"
                    loading="lazy"
                    width={360}
                    height={240}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-106"
                  />
                </div>
                <div className="flex-1 rounded-[22px] overflow-hidden bg-[#111512] shadow-[0_4px_20px_rgba(0,0,0,0.05)] group">
                  <img
                    src="/images/hotel/room-apartment-main.jpg"
                    alt="Boutique Penthouse Apartment interior"
                    loading="lazy"
                    width={360}
                    height={240}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-106"
                  />
                </div>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </section>

      {/* Four Pillars of City Boutique Hotel */}
      <section className="bg-[#F7F7F5] border-y border-[#E7E7E3] py-12 sm:py-16">
        <div className="max-w-[1840px] mx-auto px-5 sm:px-8 lg:px-12 xl:px-16">
          <StaggeredReveal
            stagger={0.08}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5"
          >
            <StaggerItem yOffset={20}>
              <div className="rounded-[24px] bg-white border border-[#E7E7E3] p-6 sm:p-7 h-full shadow-[0_2px_12px_rgba(0,0,0,0.02)] transition-transform duration-300 hover:-translate-y-1">
                <MapPin className="w-5 h-5 text-[#5E6B5B] mb-4" />
                <h3 className="font-editorial text-xl font-normal text-[#171715] mb-2">
                  Unmatched Address
                </h3>
                <p className="text-xs sm:text-[13px] text-[#777773] leading-[1.65]">
                  Located at Mula Mustafe Bašeskije 2 — 5 minutes to Baščaršija,
                  Gazi Husrev-beg Mosque, and Sacred Heart Cathedral.
                </p>
              </div>
            </StaggerItem>

            <StaggerItem yOffset={20}>
              <div className="rounded-[24px] bg-white border border-[#E7E7E3] p-6 sm:p-7 h-full shadow-[0_2px_12px_rgba(0,0,0,0.02)] transition-transform duration-300 hover:-translate-y-1">
                <ShieldCheck className="w-5 h-5 text-[#5E6B5B] mb-4" />
                <h3 className="font-editorial text-xl font-normal text-[#171715] mb-2">
                  Halal &amp; Smoke-Free
                </h3>
                <p className="text-xs sm:text-[13px] text-[#777773] leading-[1.65]">
                  100% smoke-free rooms and Halal-certified hospitality, featuring
                  our daily Royal Turkish Breakfast on the rooftop terrace.
                </p>
              </div>
            </StaggerItem>

            <StaggerItem yOffset={20}>
              <div className="rounded-[24px] bg-white border border-[#E7E7E3] p-6 sm:p-7 h-full shadow-[0_2px_12px_rgba(0,0,0,0.02)] transition-transform duration-300 hover:-translate-y-1">
                <Award className="w-5 h-5 text-[#5E6B5B] mb-4" />
                <h3 className="font-editorial text-xl font-normal text-[#171715] mb-2">
                  4.7 / 5 Guest Rating
                </h3>
                <p className="text-xs sm:text-[13px] text-[#777773] leading-[1.65]">
                  Recognized across 490+ verified Google reviews for spotless
                  cleanliness, central walkability, and personal care.
                </p>
              </div>
            </StaggerItem>

            <StaggerItem yOffset={20}>
              <div className="rounded-[24px] bg-white border border-[#E7E7E3] p-6 sm:p-7 h-full shadow-[0_2px_12px_rgba(0,0,0,0.02)] transition-transform duration-300 hover:-translate-y-1">
                <HeartHandshake className="w-5 h-5 text-[#5E6B5B] mb-4" />
                <h3 className="font-editorial text-xl font-normal text-[#171715] mb-2">
                  24/7 Personal Care
                </h3>
                <p className="text-xs sm:text-[13px] text-[#777773] leading-[1.65]">
                  Round-the-clock multilingual reception and instant WhatsApp
                  concierge for airport transfers and Bosnia sightseeing.
                </p>
              </div>
            </StaggerItem>
          </StaggeredReveal>
        </div>
      </section>

      <Footer />
    </PageTransition>
  );
}
