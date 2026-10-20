import Link from "next/link";
import { FACILITIES_DATA } from "@/lib/hotel-data";
import { cn } from "@/lib/utils";

export function FacilitiesSection() {
  return (
    <section
      aria-labelledby="facilities-heading"
      className="w-full max-w-[1840px] mx-auto px-5 sm:px-8 lg:px-12 xl:px-16 py-8 sm:py-10 lg:py-12"
    >
      <div>
        {/* Top Editorial Header Row matching Dribbble screenshot */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-10 items-center mb-8 sm:mb-10">
          <div className="lg:col-span-5 order-2 lg:order-1">
            <p className="text-xs text-[#777773] leading-[1.6] max-w-[300px]">
              Every detail at City Boutique Hotel is thoughtfully curated to
              make your stay in Sarajevo&apos;s historic center effortless and
              memorable.
            </p>
          </div>
          <div className="lg:col-span-7 order-1 lg:order-2 lg:flex lg:justify-end">
            <h2
              id="facilities-heading"
              className="font-editorial text-[28px] sm:text-[36px] lg:text-[42px] font-normal text-[#171715] leading-[1.12] tracking-[-0.03em] lg:w-full lg:max-w-[470px]"
            >
              Thoughtful Comfort.
              <br />
              Exceptional Hospitality.
            </h2>
          </div>
        </div>

        {/* Staggered 5-Card Vertical Composition matching Dribbble reference */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-11 gap-3 sm:gap-4 items-start">
          {FACILITIES_DATA.map((facility, idx) => {
            const isCenterpiece = idx === 2;
            return (
              <Link
                key={facility.id}
                href={`/facilities#${facility.id}`}
                className={cn(
                  "group relative rounded-[20px] sm:rounded-[22px] overflow-hidden bg-[#171715] block transition-all duration-500 ease-out hover:-translate-y-1.5 focus:outline-none focus:ring-2 focus:ring-[#171715]",
                  isCenterpiece
                    ? "col-span-2 lg:col-span-3"
                    : "col-span-1 lg:col-span-2",
                  facility.heightClass,
                  facility.offsetClass
                )}
              >
                <img
                  src={facility.image}
                  alt={`${facility.title} at City Boutique Hotel Sarajevo`}
                  width={400}
                  height={500}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 brightness-[0.9]"
                />
                {/* Cinematic dark gradient overlay */}
                <div
                  className="absolute inset-0 transition-opacity duration-300"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(17,21,18,0.08) 0%, rgba(17,21,18,0.16) 55%, rgba(17,21,18,0.8) 100%)",
                  }}
                />

                {/* Subtle top category pill on hover */}
                <span className="absolute top-3 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-black/30 backdrop-blur-md border border-white/20 text-[10px] text-white/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                  {facility.hours}
                </span>

                {/* Bottom Centered Label matching Dribbble screenshot */}
                <div className="absolute bottom-4 left-3 right-3 text-center">
                  <h3 className="text-sm sm:text-[16px] lg:text-[17px] font-normal text-white tracking-[-0.015em]">
                    {facility.shortLabel}
                  </h3>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Centered Minimalist "Explore Facilities" Pill CTA */}
        <div className="mt-7 sm:mt-8 flex justify-center">
          <Link
            href="/facilities"
            className="px-6 py-1.5 rounded-full border border-[#171715]/30 bg-white text-xs font-medium text-[#171715] hover:border-[#171715] hover:bg-[#171715] hover:text-white transition-all duration-300"
          >
            Explore Facilities
          </Link>
        </div>
      </div>
    </section>
  );
}
