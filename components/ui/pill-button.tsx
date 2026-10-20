"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface PillButtonProps {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  variant?: "dark-outline" | "light-outline" | "solid-dark" | "simple-pill";
  className?: string;
  type?: "button" | "submit";
  external?: boolean;
}

export function PillButton({
  href,
  onClick,
  children,
  variant = "dark-outline",
  className,
  type = "button",
  external = false,
}: PillButtonProps) {
  const shouldReduceMotion = useReducedMotion();

  const baseStyles =
    "group inline-flex items-center justify-between gap-2.5 rounded-full text-xs font-medium tracking-[-0.01em] transition-all duration-300 select-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#171715]/40";

  const variants = {
    "dark-outline":
      "border border-[#171715]/30 bg-white text-[#171715] pl-4 pr-1 py-1 hover:border-[#171715] hover:bg-[#F7F7F5] shadow-[0_2px_8px_rgba(0,0,0,0.03)]",
    "light-outline":
      "border border-white/35 bg-black/20 backdrop-blur-md text-white pl-4 pr-1 py-1 hover:bg-white/15 hover:border-white/60 shadow-[0_2px_12px_rgba(0,0,0,0.1)]",
    "solid-dark":
      "border border-[#171715] bg-[#171715] text-white pl-4 pr-1 py-1 hover:bg-[#2B2B28] shadow-[0_2px_10px_rgba(0,0,0,0.12)]",
    "simple-pill":
      "border border-[#171715]/30 bg-white text-[#171715] px-6 py-2 hover:border-[#171715] hover:bg-[#171715] hover:text-white",
  };

  const iconBadgeVariants = {
    "dark-outline":
      "w-7 h-7 rounded-full bg-[#171715] text-white flex items-center justify-center transition-all duration-300 group-hover:scale-105 group-hover:bg-[#2B2B28]",
    "light-outline":
      "w-7 h-7 rounded-full bg-white text-[#171715] flex items-center justify-center transition-all duration-300 group-hover:scale-105",
    "solid-dark":
      "w-7 h-7 rounded-full bg-white text-[#171715] flex items-center justify-center transition-all duration-300 group-hover:scale-105",
    "simple-pill": "hidden",
  };

  const content = (
    <>
      <span className="transition-transform duration-200 group-hover:translate-x-0.5">
        {children}
      </span>
      {variant !== "simple-pill" && (
        <span className={iconBadgeVariants[variant]} aria-hidden="true">
          <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.2] transition-transform duration-300 group-hover:translate-x-[1px] group-hover:-translate-y-[1px]" />
        </span>
      )}
    </>
  );

  const tapAnimation = shouldReduceMotion ? undefined : { scale: 0.97 };

  if (href) {
    if (external) {
      return (
        <motion.a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          whileTap={tapAnimation}
          className={cn(baseStyles, variants[variant], className)}
        >
          {content}
        </motion.a>
      );
    }
    return (
      <motion.div whileTap={tapAnimation} className="inline-block">
        <Link href={href} className={cn(baseStyles, variants[variant], className)}>
          {content}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      whileTap={tapAnimation}
      className={cn(baseStyles, variants[variant], className)}
    >
      {content}
    </motion.button>
  );
}
