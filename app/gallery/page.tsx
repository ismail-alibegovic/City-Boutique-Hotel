import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { GalleryGrid } from "@/components/gallery/gallery-grid";

export const metadata: Metadata = {
  title: "Photo Gallery | Rooms, Rooftop Terrace & Sarajevo",
  description:
    "Browse authentic photography of City Boutique Hotel Sarajevo: our 24 soundproof rooms and suites, panoramic rooftop terrace, Royal Turkish Breakfast, and historic Sarajevo.",
};

export default function GalleryPage() {
  return (
    <main className="min-h-screen bg-[#FFFFFF] text-[#171715]">
      <Navbar variant="page-header" />

      <section className="max-w-[1380px] mx-auto px-5 sm:px-9 lg:px-[52px] pt-10 sm:pt-12 pb-14">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-12">
          <div>
            <p className="text-[11px] uppercase tracking-[0.16em] text-[#777773] mb-2">
              Visual Archive &bull; City Boutique Hotel Sarajevo
            </p>
            <h1 className="font-editorial text-[36px] sm:text-[50px] lg:text-[58px] font-normal text-[#171715] leading-[1.06] tracking-[-0.03em]">
              Inside Our Sanctuary.
            </h1>
          </div>
          <p className="text-xs sm:text-[13px] text-[#777773] max-w-[360px] leading-[1.65]">
            Authentic photography of our rooms, penthouse apartments, rooftop
            breakfast terrace, and our historic Sarajevo neighborhood.
          </p>
        </div>

        <GalleryGrid />
      </section>

      <Footer />
    </main>
  );
}
