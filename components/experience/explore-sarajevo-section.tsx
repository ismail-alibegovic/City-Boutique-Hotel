import Link from "next/link";
import { MapPin } from "lucide-react";
import { SARAJEVO_DESTINATIONS } from "@/lib/hotel-data";
import { PillButton } from "@/components/ui/pill-button";

export function ExploreSarajevoSection() {
  const leftCard = SARAJEVO_DESTINATIONS.find(
    (d) => d.gridPosition === "left-tall"
  )!;
  const centerTopCard = SARAJEVO_DESTINATIONS.find(
    (d) => d.gridPosition === "center-top"
  )!;
  const centerBottomCard = SARAJEVO_DESTINATIONS.find(
    (d) => d.gridPosition === "center-bottom"
  )!;
  const rightCard = SARAJEVO_DESTINATIONS.find(
    (d) => d.gridPosition === "right-tall"
  )!;

  return (
    <section
      aria-labelledby="explore-sarajevo-heading"
      className="w-full max-w-[1840px] mx-auto px-5 sm:px-8 lg:px-12 xl:px-16 py-8 sm:py-10 lg:py-12"
    >
      <div>
        {/* Top Editorial Header Row matching Dribbble screenshot */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-10 items-start mb-8 sm:mb-9">
          <div className="lg:col-span-7">
            <h2
              id="explore-sarajevo-heading"
              className="font-editorial text-[28px] sm:text-[36px] lg:text-[42px] font-normal text-[#171715] leading-[1.12] tracking-[-0.03em]"
            >
              Discover the Soul
              <br />
              of Sarajevo.
            </h2>
          </div>

          <div className="lg:col-span-5 flex flex-col items-start">
            <p className="text-xs text-[#777773] leading-[1.6] max-w-[350px] mb-3.5">
              Step outside and discover centuries of architecture, culture,
              cafés, and unforgettable local experiences.
            </p>
            <PillButton href="/experience" variant="dark-outline">
              More Info
            </PillButton>
          </div>
        </div>

        {/* 3-Column Bento Image Grid matching Dribbble reference (Left Tall, Center 38%/62% Stacked, Right Tall) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4 md:h-[520px] lg:h-[560px]">
          {/* Left Column: Tall Photograph of Baščaršija & Sebilj */}
          <Link
            href={`/experience#${leftCard.id}`}
            className="group relative h-[340px] sm:h-[400px] md:h-full rounded-[18px] sm:rounded-[20px] overflow-hidden bg-[#111512] block"
          >
            <img
              src={leftCard.image}
              alt={`${leftCard.title} — ${leftCard.walkingTime} from City Boutique Hotel Sarajevo`}
              width={480}
              height={680}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 brightness-[0.88] contrast-[1.04]"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, rgba(17,21,18,0.14) 0%, rgba(17,21,18,0.08) 52%, rgba(17,21,18,0.78) 100%)",
              }}
            />
            <div className="absolute top-3.5 left-3.5">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-black/35 backdrop-blur-md border border-white/20 text-[10px] text-white">
                <MapPin className="w-3 h-3 text-[#D3F0DC]" />
                {leftCard.walkingTime}
              </span>
            </div>
            <div className="absolute bottom-4 left-4 right-4">
              <p className="text-[10px] uppercase tracking-[0.14em] text-white/75 mb-0.5">
                {leftCard.subtitle}
              </p>
              <h3 className="text-base sm:text-[18px] font-normal text-white tracking-[-0.02em]">
                {leftCard.title}
              </h3>
            </div>
          </Link>

          {/* Center Column: Two Stacked Photographs (Top ~38% + Bottom ~62% matching Dribbble reference) */}
          <div className="flex flex-col gap-3.5 sm:gap-4 md:h-full">
            {/* Top Stacked Image (~38% height on desktop) */}
            <Link
              href={`/experience#${centerTopCard.id}`}
              className="group relative h-[210px] sm:h-[230px] md:h-[195px] lg:h-[210px] shrink-0 rounded-[18px] sm:rounded-[20px] overflow-hidden bg-[#111512] block"
            >
              <img
                src={centerTopCard.image}
                alt={`${centerTopCard.title} — ${centerTopCard.walkingTime} from City Boutique Hotel Sarajevo`}
                width={480}
                height={260}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 brightness-[0.88] contrast-[1.04]"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(17,21,18,0.14) 0%, rgba(17,21,18,0.08) 50%, rgba(17,21,18,0.78) 100%)",
                }}
              />
              <div className="absolute top-3.5 left-3.5">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-black/35 backdrop-blur-md border border-white/20 text-[10px] text-white">
                  <MapPin className="w-3 h-3 text-[#D3F0DC]" />
                  {centerTopCard.walkingTime}
                </span>
              </div>
              <div className="absolute bottom-3.5 left-4 right-4">
                <p className="text-[10px] uppercase tracking-[0.14em] text-white/75 mb-0.5">
                  {centerTopCard.subtitle}
                </p>
                <h3 className="text-sm sm:text-base font-normal text-white tracking-[-0.02em]">
                  {centerTopCard.title}
                </h3>
              </div>
            </Link>

            {/* Bottom Stacked Image (~62% height on desktop) */}
            <Link
              href={`/experience#${centerBottomCard.id}`}
              className="group relative h-[260px] sm:h-[300px] md:h-auto md:flex-1 rounded-[18px] sm:rounded-[20px] overflow-hidden bg-[#111512] block"
            >
              <img
                src={centerBottomCard.image}
                alt={`${centerBottomCard.title} — ${centerBottomCard.walkingTime} from City Boutique Hotel Sarajevo`}
                width={480}
                height={360}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 brightness-[0.88] contrast-[1.04]"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(17,21,18,0.14) 0%, rgba(17,21,18,0.08) 50%, rgba(17,21,18,0.78) 100%)",
                }}
              />
              <div className="absolute top-3.5 left-3.5">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-black/35 backdrop-blur-md border border-white/20 text-[10px] text-white">
                  <MapPin className="w-3 h-3 text-[#D3F0DC]" />
                  {centerBottomCard.walkingTime}
                </span>
              </div>
              <div className="absolute bottom-4 left-4 right-4">
                <p className="text-[10px] uppercase tracking-[0.14em] text-white/75 mb-0.5">
                  {centerBottomCard.subtitle}
                </p>
                <h3 className="text-base sm:text-[17px] font-normal text-white tracking-[-0.02em]">
                  {centerBottomCard.title}
                </h3>
              </div>
            </Link>
          </div>

          {/* Right Column: Tall Photograph of Gazi Husrev-beg Mosque */}
          <Link
            href={`/experience#${rightCard.id}`}
            className="group relative h-[340px] sm:h-[400px] md:h-full rounded-[18px] sm:rounded-[20px] overflow-hidden bg-[#111512] block"
          >
            <img
              src={rightCard.image}
              alt={`${rightCard.title} — ${rightCard.walkingTime} from City Boutique Hotel Sarajevo`}
              width={480}
              height={680}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 brightness-[0.88] contrast-[1.04]"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, rgba(17,21,18,0.14) 0%, rgba(17,21,18,0.08) 52%, rgba(17,21,18,0.78) 100%)",
              }}
            />
            <div className="absolute top-3.5 left-3.5">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-black/35 backdrop-blur-md border border-white/20 text-[10px] text-white">
                <MapPin className="w-3 h-3 text-[#D3F0DC]" />
                {rightCard.walkingTime}
              </span>
            </div>
            <div className="absolute bottom-4 left-4 right-4">
              <p className="text-[10px] uppercase tracking-[0.14em] text-white/75 mb-0.5">
                {rightCard.subtitle}
              </p>
              <h3 className="text-base sm:text-[18px] font-normal text-white tracking-[-0.02em]">
                {rightCard.title}
              </h3>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
