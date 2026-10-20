import Link from "next/link";
import Image from "next/image";
import { HOTEL_INFO } from "@/lib/hotel-data";

export function Footer() {
  return (
    <footer className="bg-[#FFFFFF] pt-8 sm:pt-12 pb-8 sm:pb-10">
      <div className="max-w-[1840px] mx-auto px-5 sm:px-8 lg:px-12 xl:px-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-9 lg:gap-8 pb-10 sm:pb-12">
          {/* Left Column (~42% width): Official Brand Logo + summary + Go to Details link */}
          <div className="md:col-span-5 lg:col-span-5 flex flex-col justify-between">
            <div>
              <Link
                href="/"
                className="inline-flex items-center mb-4 focus:outline-none group"
                aria-label="City Boutique Hotel Sarajevo — Home"
              >
                <Image
                  src="/images/logo-dark.png"
                  alt="City Boutique Hotel Sarajevo"
                  width={600}
                  height={221}
                  unoptimized
                  className="h-[38px] sm:h-[44px] w-auto object-contain transition-opacity group-hover:opacity-85"
                />
              </Link>
              <p className="text-xs text-[#777773] leading-[1.65] max-w-[320px]">
                City Boutique Hotel Sarajevo is a refined four-star hotel located
                at {HOTEL_INFO.address.street}, steps from historic Baščaršija.
                Known for its rooftop Turkish breakfast, soundproof rooms, and
                warm Bosnian hospitality.
              </p>
            </div>

            <div className="mt-5">
              <Link
                href="/about"
                className="inline-block text-xs font-medium text-[#171715] hover:opacity-70 transition-opacity"
              >
                Go to Details
              </Link>
            </div>
          </div>

          {/* Right Columns: Explore, Accommodation, Information, Contact */}
          <div className="md:col-span-7 lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8">
            {/* Column 1: Explore */}
            <div>
              <h3 className="text-xs font-medium text-[#171715] mb-3.5 tracking-[-0.01em]">
                Explore
              </h3>
              <ul className="space-y-2 text-xs text-[#777773]">
                <li>
                  <Link
                    href="/about"
                    className="hover:text-[#171715] transition-colors"
                  >
                    Our Story
                  </Link>
                </li>
                <li>
                  <Link
                    href="/experience"
                    className="hover:text-[#171715] transition-colors"
                  >
                    Experience
                  </Link>
                </li>
                <li>
                  <Link
                    href="/facilities"
                    className="hover:text-[#171715] transition-colors"
                  >
                    Facilities
                  </Link>
                </li>
                <li>
                  <Link
                    href="/gallery"
                    className="hover:text-[#171715] transition-colors"
                  >
                    Gallery
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 2: Accommodation */}
            <div>
              <h3 className="text-xs font-medium text-[#171715] mb-3.5 tracking-[-0.01em]">
                Accommodation
              </h3>
              <ul className="space-y-2 text-xs text-[#777773]">
                <li>
                  <Link
                    href="/rooms/standard-double-room"
                    className="hover:text-[#171715] transition-colors"
                  >
                    Standard Room
                  </Link>
                </li>
                <li>
                  <Link
                    href="/rooms/deluxe-double-room"
                    className="hover:text-[#171715] transition-colors"
                  >
                    Deluxe Room
                  </Link>
                </li>
                <li>
                  <Link
                    href="/rooms/junior-suite"
                    className="hover:text-[#171715] transition-colors"
                  >
                    Junior Suite
                  </Link>
                </li>
                <li>
                  <Link
                    href="/rooms/apartment"
                    className="hover:text-[#171715] transition-colors"
                  >
                    Apartment
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Information */}
            <div>
              <h3 className="text-xs font-medium text-[#171715] mb-3.5 tracking-[-0.01em]">
                Information
              </h3>
              <ul className="space-y-2 text-xs text-[#777773]">
                <li>
                  <Link
                    href="/booking"
                    className="hover:text-[#171715] transition-colors"
                  >
                    Reservations
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="hover:text-[#171715] transition-colors"
                  >
                    Direction &amp; Map
                  </Link>
                </li>
                <li>
                  <Link
                    href="/facilities#tours"
                    className="hover:text-[#171715] transition-colors"
                  >
                    Bosnia Tours
                  </Link>
                </li>
                <li>
                  <Link
                    href="/facilities#turkish-breakfast"
                    className="hover:text-[#171715] transition-colors"
                  >
                    Turkish Breakfast
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 4: Contact & Keep in Touch */}
            <div>
              <h3 className="text-xs font-medium text-[#171715] mb-3.5 tracking-[-0.01em]">
                Keep in Touch
              </h3>
              <ul className="space-y-2 text-xs text-[#777773]">
                <li>
                  <a
                    href={`tel:${HOTEL_INFO.contact.phoneClean}`}
                    className="hover:text-[#171715] transition-colors block"
                  >
                    {HOTEL_INFO.contact.phone}
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${HOTEL_INFO.contact.email}`}
                    className="hover:text-[#171715] transition-colors block break-all"
                  >
                    {HOTEL_INFO.contact.email}
                  </a>
                </li>
                <li>
                  <a
                    href={HOTEL_INFO.socials.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#171715] transition-colors block"
                  >
                    Instagram
                  </a>
                </li>
                <li>
                  <a
                    href={HOTEL_INFO.socials.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#171715] transition-colors block"
                  >
                    Facebook
                  </a>
                </li>
                <li>
                  <a
                    href={HOTEL_INFO.contact.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#171715] transition-colors block"
                  >
                    WhatsApp 24/7
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Bar matching Dribbble reference */}
        <div className="pt-5 border-t border-[#E7E7E3]/70 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-[#777773]">
          <p>Copyright &copy; City Boutique Hotel Sarajevo 2026</p>
          <p className="text-[#171715]/80">
            The Best Companion for Your Rest.
          </p>
        </div>
      </div>
    </footer>
  );
}
