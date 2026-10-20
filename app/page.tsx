import { HeroSection } from "@/components/hero/hero-section";
import { RoomsAvailabilitySection } from "@/components/rooms/rooms-availability-section";
import { FacilitiesSection } from "@/components/facilities/facilities-section";
import { ExploreSarajevoSection } from "@/components/experience/explore-sarajevo-section";
import { TestimonialsSection } from "@/components/testimonials/testimonials-section";
import { Footer } from "@/components/layout/footer";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#FFFFFF] text-[#171715]">
      {/* SECTION 01 — IMMERSIVE HERO */}
      <HeroSection />

      {/* SECTION 02 — ROOMS & AVAILABILITY */}
      <RoomsAvailabilitySection />

      {/* SECTION 03 — HOTEL FACILITIES */}
      <FacilitiesSection />

      {/* SECTION 04 — EXPLORE SARAJEVO */}
      <ExploreSarajevoSection />

      {/* SECTION 05 — GUEST TESTIMONIALS */}
      <TestimonialsSection />

      {/* SECTION 06 — REFINED FOOTER */}
      <Footer />
    </main>
  );
}
