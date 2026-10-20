"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, X, Phone, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { HOTEL_INFO } from "@/lib/hotel-data";

const PRIMARY_NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Rooms", href: "/rooms" },
  { label: "Facilities", href: "/facilities" },
  { label: "Experience", href: "/experience" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const MOBILE_NAV_ITEMS = [
  ...PRIMARY_NAV_ITEMS.slice(0, 5),
  { label: "Gallery", href: "/gallery" },
  PRIMARY_NAV_ITEMS[5],
];

interface NavbarProps {
  variant?: "hero-overlay" | "page-header";
}

export function Navbar({ variant = "page-header" }: NavbarProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 680);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const isHeroOverlay = variant === "hero-overlay";

  return (
    <>
      <header
        className={cn(
          "w-full z-40 transition-all duration-300",
          isHeroOverlay
            ? "relative px-5 sm:px-8 lg:px-10 xl:px-12 pt-4 sm:pt-5"
            : "sticky top-0 bg-white/92 backdrop-blur-md border-b border-[#E7E7E3]/80 px-5 sm:px-8 lg:px-12 xl:px-16 py-3.5"
        )}
      >
        <div
          className={cn(
            "mx-auto flex items-center justify-between gap-4",
            !isHeroOverlay && "max-w-[1720px]"
          )}
        >
          {/* Left: Official City Boutique Hotel Sarajevo Brand Logo */}
          <Link
            href="/"
            className="group inline-flex items-center focus:outline-none shrink-0"
            aria-label="City Boutique Hotel Sarajevo — Home"
          >
            <Image
              src={isHeroOverlay ? "/images/logo-light.png" : "/images/logo-dark.png"}
              alt="City Boutique Hotel Sarajevo"
              width={600}
              height={221}
              priority
              unoptimized
              className={cn(
                "w-auto object-contain transition-transform duration-300 group-hover:opacity-95",
                isHeroOverlay
                  ? "h-[36px] sm:h-[42px] lg:h-[46px] drop-shadow-[0_2px_10px_rgba(0,0,0,0.28)]"
                  : "h-[34px] sm:h-[38px] lg:h-[42px]"
              )}
            />
          </Link>

          {/* Center: Minimalist Pill Navigation matching Dribbble reference */}
          <nav
            aria-label="Primary Navigation"
            className={cn(
              "hidden lg:flex items-center rounded-full p-1 transition-all",
              isHeroOverlay
                ? "bg-white/10 backdrop-blur-md border border-white/25"
                : "bg-[#F7F7F5] border border-[#E7E7E3]"
            )}
          >
            {PRIMARY_NAV_ITEMS.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "px-4 xl:px-[18px] py-1.5 rounded-full text-xs transition-all duration-200 whitespace-nowrap",
                    active
                      ? isHeroOverlay
                        ? "bg-white text-[#171715] font-medium shadow-2xs"
                        : "bg-[#171715] text-white font-medium shadow-2xs"
                      : isHeroOverlay
                        ? "text-white/90 hover:text-white font-normal"
                        : "text-[#777773] hover:text-[#171715] font-normal"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Right: Booking Pill Button & Mobile Menu Trigger */}
          <div className="flex items-center gap-2 shrink-0">
            <Link
              href="/booking"
              className={cn(
                "group inline-flex items-center gap-2.5 rounded-full pl-3.5 sm:pl-4 pr-1 py-1 text-xs font-medium whitespace-nowrap transition-all duration-300",
                isHeroOverlay
                  ? "border border-white/35 bg-white/10 backdrop-blur-md text-white hover:bg-white/20 hover:border-white/60"
                  : "border border-[#171715]/25 bg-white text-[#171715] hover:border-[#171715] hover:bg-[#F7F7F5]"
              )}
            >
              <span>Book Your Stay</span>
              <span
                className={cn(
                  "w-7 h-7 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-105 group-hover:rotate-12",
                  isHeroOverlay
                    ? "bg-white text-[#171715]"
                    : "bg-[#171715] text-white"
                )}
              >
                <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.2]" />
              </span>
            </Link>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={mobileMenuOpen}
              className={cn(
                "lg:hidden w-9 h-9 rounded-full flex items-center justify-center border transition-colors cursor-pointer",
                isHeroOverlay
                  ? "border-white/30 bg-white/10 text-white backdrop-blur-md hover:bg-white/20"
                  : "border-[#E7E7E3] bg-[#F7F7F5] text-[#171715] hover:border-[#171715]"
              )}
            >
              <Menu className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Floating Compact Sticky Bar when scrolled past Hero on Homepage */}
      {isHeroOverlay && isScrolled && (
        <div className="fixed top-3 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-1.5rem)] max-w-[1120px] rounded-full bg-white/95 backdrop-blur-xl border border-[#E7E7E3] shadow-[0_8px_30px_rgb(0,0,0,0.06)] px-4 sm:px-5 py-2 flex items-center justify-between transition-all duration-300">
          <Link
            href="/"
            className="inline-flex items-center shrink-0"
            aria-label="City Boutique Hotel Sarajevo — Home"
          >
            <Image
              src="/images/logo-dark.png"
              alt="City Boutique Hotel Sarajevo"
              width={600}
              height={221}
              priority
              unoptimized
              className="h-[26px] sm:h-[30px] w-auto object-contain"
            />
          </Link>

          <nav
            aria-label="Sticky Navigation"
            className="hidden lg:flex items-center gap-1"
          >
            {PRIMARY_NAV_ITEMS.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "px-3.5 py-1 rounded-full text-xs transition-colors",
                    active
                      ? "bg-[#171715] text-white font-medium"
                      : "text-[#777773] hover:text-[#171715]"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/booking"
              className="group inline-flex items-center gap-2 rounded-full border border-[#171715]/25 bg-white pl-3.5 pr-1 py-1 text-xs font-medium text-[#171715] hover:border-[#171715]"
            >
              <span>Book Your Stay</span>
              <span className="w-6 h-6 rounded-full bg-[#171715] text-white flex items-center justify-center">
                <ArrowUpRight className="w-3 h-3" />
              </span>
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
              className="lg:hidden w-8 h-8 rounded-full border border-[#E7E7E3] bg-[#F7F7F5] text-[#171715] flex items-center justify-center"
            >
              <Menu className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Mobile Fullscreen Editorial Drawer */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 bg-[#111512]/95 backdrop-blur-xl text-white flex flex-col justify-between p-6 sm:p-10 animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
        >
          <div className="flex items-center justify-between">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="inline-flex items-center"
              aria-label="City Boutique Hotel Sarajevo — Home"
            >
              <Image
                src="/images/logo-light.png"
                alt="City Boutique Hotel Sarajevo"
                width={600}
                height={221}
                priority
                unoptimized
                className="h-[36px] sm:h-[42px] w-auto object-contain"
              />
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close navigation menu"
              className="w-10 h-10 rounded-full border border-white/25 flex items-center justify-center text-white hover:bg-white/10 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <nav className="my-auto py-8 flex flex-col gap-3">
            {MOBILE_NAV_ITEMS.map((item, idx) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "flex items-baseline justify-between py-2.5 border-b border-white/10 text-2xl sm:text-3xl font-light tracking-[-0.02em] transition-colors",
                    active ? "text-white font-normal" : "text-white/65 hover:text-white"
                  )}
                >
                  <span>{item.label}</span>
                  <span className="text-xs font-mono text-white/40">
                    0{idx + 1}
                  </span>
                </Link>
              );
            })}
          </nav>

          <div className="space-y-4 pt-4 border-t border-white/15">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-white/70">
              <span className="inline-flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-white/50" />
                {HOTEL_INFO.address.street}, {HOTEL_INFO.address.city}
              </span>
              <a
                href={`tel:${HOTEL_INFO.contact.phoneClean}`}
                className="inline-flex items-center gap-2 text-white hover:underline"
              >
                <Phone className="w-3.5 h-3.5 text-white/50" />
                {HOTEL_INFO.contact.phone}
              </a>
            </div>
            <Link
              href="/booking"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-between rounded-full bg-white text-[#171715] pl-6 pr-2 py-2.5 text-sm font-medium"
            >
              <span>Book Your Stay in Sarajevo</span>
              <span className="w-8 h-8 rounded-full bg-[#171715] text-white flex items-center justify-center">
                <ArrowUpRight className="w-4 h-4" />
              </span>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
