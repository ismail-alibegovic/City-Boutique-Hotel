"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, X, Phone, MapPin } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { HOTEL_INFO } from "@/lib/hotel-data";
import { MOTION_EASE } from "@/lib/motion";

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
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 680);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

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
                "w-auto object-contain transition-transform duration-300 group-hover:scale-102",
                isHeroOverlay
                  ? "h-[36px] sm:h-[42px] lg:h-[46px] drop-shadow-[0_2px_10px_rgba(0,0,0,0.28)]"
                  : "h-[34px] sm:h-[38px] lg:h-[42px]"
              )}
            />
          </Link>

          {/* Center: Minimalist Pill Navigation with Animated Floating Pill */}
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
                    "relative px-4 xl:px-[18px] py-1.5 rounded-full text-xs transition-colors duration-200 whitespace-nowrap z-10",
                    active
                      ? isHeroOverlay
                        ? "text-[#171715] font-medium"
                        : "text-white font-medium"
                      : isHeroOverlay
                        ? "text-white/90 hover:text-white font-normal"
                        : "text-[#777773] hover:text-[#171715] font-normal"
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId={isHeroOverlay ? "nav-active-hero" : "nav-active-page"}
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 32,
                      }}
                      className={cn(
                        "absolute inset-0 rounded-full -z-10 shadow-2xs",
                        isHeroOverlay ? "bg-white" : "bg-[#171715]"
                      )}
                    />
                  )}
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
                "group inline-flex items-center gap-2.5 rounded-full pl-3.5 sm:pl-4 pr-1 py-1 text-xs font-medium whitespace-nowrap transition-all duration-300 select-none",
                isHeroOverlay
                  ? "border border-white/35 bg-white/10 backdrop-blur-md text-white hover:bg-white/20 hover:border-white/60"
                  : "border border-[#171715]/25 bg-white text-[#171715] hover:border-[#171715] hover:bg-[#F7F7F5]"
              )}
            >
              <span className="transition-transform duration-200 group-hover:translate-x-0.5">
                Book Your Stay
              </span>
              <span
                className={cn(
                  "w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-105",
                  isHeroOverlay
                    ? "bg-white text-[#171715]"
                    : "bg-[#171715] text-white"
                )}
              >
                <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.2] transition-transform duration-300 group-hover:translate-x-[1px] group-hover:-translate-y-[1px]" />
              </span>
            </Link>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={mobileMenuOpen}
              className={cn(
                "lg:hidden w-9 h-9 rounded-full flex items-center justify-center border transition-all duration-200 cursor-pointer active:scale-95",
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

      {/* Floating Compact Sticky Bar with Smooth Enter / Exit Animation */}
      <AnimatePresence>
        {isHeroOverlay && isScrolled && (
          <motion.div
            initial={
              shouldReduceMotion
                ? false
                : { opacity: 0, y: -24, x: "-50%", scale: 0.98 }
            }
            animate={{ opacity: 1, y: 0, x: "-50%", scale: 1 }}
            exit={
              shouldReduceMotion
                ? undefined
                : { opacity: 0, y: -16, x: "-50%", scale: 0.98 }
            }
            transition={{ duration: 0.35, ease: MOTION_EASE.editorial }}
            className="fixed top-3 left-1/2 z-50 w-[calc(100%-1.5rem)] max-w-[1120px] rounded-full bg-white/95 backdrop-blur-xl border border-[#E7E7E3] shadow-[0_12px_36px_rgba(0,0,0,0.08)] px-4 sm:px-5 py-2 flex items-center justify-between"
          >
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
                className="h-[26px] sm:h-[30px] w-auto object-contain transition-transform duration-200 hover:scale-105"
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
                      "relative px-3.5 py-1 rounded-full text-xs transition-colors duration-150",
                      active
                        ? "text-white font-medium"
                        : "text-[#777773] hover:text-[#171715]"
                    )}
                  >
                    {active && (
                      <motion.span
                        layoutId="nav-active-sticky"
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 32,
                        }}
                        className="absolute inset-0 rounded-full bg-[#171715] -z-10 shadow-2xs"
                      />
                    )}
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center gap-2">
              <Link
                href="/booking"
                className="group inline-flex items-center gap-2 rounded-full border border-[#171715]/25 bg-white pl-3.5 pr-1 py-1 text-xs font-medium text-[#171715] hover:border-[#171715] hover:bg-[#F7F7F5] transition-all"
              >
                <span>Book Your Stay</span>
                <span className="w-6 h-6 rounded-full bg-[#171715] text-white flex items-center justify-center transition-transform group-hover:scale-105">
                  <ArrowUpRight className="w-3 h-3 stroke-[2.2]" />
                </span>
              </Link>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                aria-label="Open menu"
                className="lg:hidden w-8 h-8 rounded-full border border-[#E7E7E3] bg-[#F7F7F5] text-[#171715] flex items-center justify-center active:scale-95 transition-transform"
              >
                <Menu className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Fullscreen Editorial Drawer with AnimatePresence & Staggered Reveal */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: MOTION_EASE.fade }}
            className="fixed inset-0 z-50 bg-[#111512]/96 backdrop-blur-2xl text-white flex flex-col justify-between p-6 sm:p-10"
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
                className="w-10 h-10 rounded-full border border-white/25 flex items-center justify-center text-white hover:bg-white/10 active:scale-95 transition-all cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <nav className="my-auto py-8 flex flex-col gap-2">
              {MOBILE_NAV_ITEMS.map((item, idx) => {
                const active = isActive(item.href);
                return (
                  <motion.div
                    key={item.href}
                    initial={
                      shouldReduceMotion
                        ? false
                        : { opacity: 0, x: -16 }
                    }
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.35,
                      delay: 0.08 + idx * 0.04,
                      ease: MOTION_EASE.editorial,
                    }}
                  >
                    <Link
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
                  </motion.div>
                );
              })}
            </nav>

            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3, ease: MOTION_EASE.editorial }}
              className="space-y-4 pt-4 border-t border-white/15"
            >
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
                className="group w-full flex items-center justify-between rounded-full bg-white text-[#171715] pl-6 pr-2 py-2.5 text-sm font-medium hover:bg-[#F7F7F5] transition-colors"
              >
                <span>Book Your Stay in Sarajevo</span>
                <span className="w-8 h-8 rounded-full bg-[#171715] text-white flex items-center justify-center transition-transform group-hover:scale-105">
                  <ArrowUpRight className="w-4 h-4" />
                </span>
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
