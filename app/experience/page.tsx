import type { Metadata } from "next";
import { MapPin, Clock, Footprints } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { PillButton } from "@/components/ui/pill-button";
import {
  SARAJEVO_DESTINATIONS,
  BOSNIAN_DELICACIES,
  HOTEL_INFO,
} from "@/lib/hotel-data";

export const metadata: Metadata = {
  title: "Experience Sarajevo | Neighborhood & Destination Guide",
  description:
    "Step outside City Boutique Hotel at Mula Mustafe Bašeskije 2 and explore Baščaršija, Gazi Husrev-beg Mosque, Latin Bridge, National Theater, and Trebević Mountain.",
};

const WALKING_DISTANCES = [
  {
    place: "National Theater Sarajevo",
    time: "Steps away",
    category: "Culture & Performing Arts",
  },
  {
    place: "Željo Ćevabdžinica",
    time: "3 min walk",
    category: "Authentic Sarajevo Cuisine",
  },
  {
    place: "Gazi Husrev-beg Mosque & Clock Tower",
    time: "5 min walk",
    category: "16th-Century Ottoman Heritage",
  },
  {
    place: "Baščaršija & Sebilj Wooden Fountain",
    time: "5 min walk",
    category: "Historic Old Bazaar",
  },
  {
    place: "Sacred Heart Cathedral & Ferhadija",
    time: "3 min walk",
    category: "Austro-Hungarian Promenade",
  },
  {
    place: "Latin Bridge & Miljacka River",
    time: "8 min walk",
    category: "World History Landmark",
  },
  {
    place: "Vijećnica (Sarajevo City Hall)",
    time: "9 min walk",
    category: "Architectural Monument",
  },
  {
    place: "Trebević Mountain Cable Car",
    time: "15 min",
    category: "Alpine Panorama & Olympic Track",
  },
];

export default function ExperiencePage() {
  return (
    <main className="min-h-screen bg-[#FFFFFF] text-[#171715]">
      {/* Framed Editorial Hero */}
      <section className="w-full max-w-[1380px] mx-auto px-3 sm:px-4 pt-3 sm:pt-4">
        <div className="relative w-full min-h-[400px] sm:min-h-[450px] rounded-[22px] sm:rounded-[26px] overflow-hidden flex flex-col justify-between bg-[#111512]">
          <div className="absolute inset-0 z-0">
            <img
              src="/images/hotel/landmark-latin-bridge.jpg"
              alt="Historic Latin Bridge over the Miljacka River in Sarajevo"
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

          <div className="relative z-10 px-5 sm:px-8 lg:px-9 pb-8 sm:pb-10 pt-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <p className="text-[11px] uppercase tracking-[0.18em] text-white/75 mb-2.5">
                Mula Mustafe Bašeskije 2 &bull; Where East Meets West
              </p>
              <h1 className="font-editorial text-[36px] sm:text-[50px] lg:text-[60px] font-light text-white leading-[1.05] tracking-[-0.035em]">
                Discover the Soul
                <br />
                of Sarajevo.
              </h1>
            </div>
            <p className="text-xs sm:text-[13.5px] text-white/85 max-w-[330px] leading-[1.6]">
              Positioned right at the meeting point of Austro-Hungarian
              boulevards and the 15th-century Ottoman bazaar, all of Sarajevo is
              at your doorstep.
            </p>
          </div>
        </div>
      </section>

      {/* Walking Distance Directory Strip */}
      <section className="max-w-[1380px] mx-auto px-5 sm:px-9 lg:px-[52px] pt-12 sm:pt-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <p className="text-[11px] uppercase tracking-[0.16em] text-[#777773] mb-2">
              Walkability from Our Front Door
            </p>
            <h2 className="font-editorial text-[28px] sm:text-[38px] font-normal text-[#171715] leading-[1.1] tracking-[-0.025em]">
              Everything Within Walking Distance.
            </h2>
          </div>
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F7F7F5] border border-[#E7E7E3] text-xs text-[#171715]">
            <Footprints className="w-3.5 h-3.5 text-[#5E6B5B]" />
            {HOTEL_INFO.address.street}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {WALKING_DISTANCES.map((item) => (
            <div
              key={item.place}
              className="rounded-[20px] bg-[#F7F7F5] border border-[#E7E7E3] p-5 flex flex-col justify-between"
            >
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-[11px] text-[#777773]">
                  {item.category}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-[#D3F0DC] text-[#1E4629] text-[11px] font-medium shrink-0">
                  {item.time}
                </span>
              </div>
              <h3 className="text-sm sm:text-[15px] font-medium text-[#171715] tracking-[-0.01em]">
                {item.place}
              </h3>
            </div>
          ))}
        </div>
      </section>

      {/* Editorial Landmarks Deep-Dive */}
      <section className="max-w-[1380px] mx-auto px-5 sm:px-9 lg:px-[52px] py-12 sm:py-16 space-y-12 sm:space-y-16">
        {SARAJEVO_DESTINATIONS.map((dest, idx) => {
          const isReversed = idx % 2 === 1;
          return (
            <article
              key={dest.id}
              id={dest.id}
              className="scroll-mt-24 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
            >
              <div
                className={`lg:col-span-7 h-[340px] sm:h-[440px] rounded-[24px] overflow-hidden bg-[#111512] relative ${
                  isReversed ? "lg:order-2" : "lg:order-1"
                }`}
              >
                <img
                  src={dest.image}
                  alt={dest.title}
                  loading="lazy"
                  width={760}
                  height={500}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-black/45 backdrop-blur-md border border-white/25 text-xs text-white">
                    <MapPin className="w-3.5 h-3.5 text-[#D3F0DC]" />
                    {dest.walkingTime} &bull; {dest.distance}
                  </span>
                </div>
              </div>

              <div
                className={`lg:col-span-5 ${
                  isReversed ? "lg:order-1" : "lg:order-2"
                }`}
              >
                <p className="text-[11px] uppercase tracking-[0.16em] text-[#5E6B5B] font-medium mb-2">
                  {dest.subtitle}
                </p>
                <h2 className="font-editorial text-[28px] sm:text-[38px] font-normal text-[#171715] leading-[1.12] tracking-[-0.025em]">
                  {dest.title}
                </h2>
                <p className="mt-4 text-xs sm:text-[14px] text-[#777773] leading-[1.75]">
                  {dest.description}
                </p>
                <div className="mt-6 pt-6 border-t border-[#E7E7E3] flex items-center gap-4 text-xs text-[#171715]">
                  <Clock className="w-4 h-4 text-[#5E6B5B]" />
                  <span>Walking distance from hotel: {dest.walkingTime}</span>
                </div>
              </div>
            </article>
          );
        })}
      </section>

      {/* Authentic Culinary Heritage of Sarajevo */}
      <section className="bg-[#F7F7F5] border-y border-[#E7E7E3] py-12 sm:py-16">
        <div className="max-w-[1380px] mx-auto px-5 sm:px-9 lg:px-[52px]">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <p className="text-[11px] uppercase tracking-[0.16em] text-[#777773] mb-2">
                Taste of Sarajevo
              </p>
              <h2 className="font-editorial text-[30px] sm:text-[42px] font-normal text-[#171715] leading-[1.1] tracking-[-0.03em]">
                Local Flavors &amp; Morning Rituals.
              </h2>
            </div>
            <PillButton href="/booking" variant="dark-outline">
              Book Your Stay
            </PillButton>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {BOSNIAN_DELICACIES.map((item) => (
              <div
                key={item.title}
                className="rounded-[24px] bg-white border border-[#E7E7E3] overflow-hidden flex flex-col"
              >
                <div className="h-[220px] overflow-hidden bg-[#111512]">
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    width={420}
                    height={260}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.14em] text-[#777773] mb-1">
                      {item.subtitle}
                    </p>
                    <h3 className="font-editorial text-xl font-normal text-[#171715]">
                      {item.title}
                    </h3>
                    <p className="mt-2.5 text-xs sm:text-[13px] text-[#777773] leading-[1.65]">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
