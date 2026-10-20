/**
 * Centralized Motion Tokens & Easing Curves
 * City Boutique Hotel Sarajevo — Premium Motion Design System
 */

// Luxury architectural easing curves (Cubic Bezier)
export const MOTION_EASE = {
  // Smooth deceleration for entrances and reveals
  editorial: [0.22, 1, 0.36, 1] as const,
  // Cinematic slow-settle for hero and large images
  cinematic: [0.16, 1, 0.3, 1] as const,
  // Snappy responsive easing for buttons and microinteractions
  micro: [0.25, 1, 0.5, 1] as const,
  // Gentle curve for overlays and fades
  fade: [0.33, 1, 0.68, 1] as const,
};

export const MOTION_DURATIONS = {
  instant: 0.15,
  fast: 0.3,
  normal: 0.5,
  reveal: 0.75,
  cinematic: 1.2,
  heroScale: 1.6,
};

export const MOTION_STAGGER = {
  tight: 0.06,
  normal: 0.09,
  relaxed: 0.14,
};

// Common reusable Framer Motion variants
export const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: MOTION_DURATIONS.normal,
      ease: MOTION_EASE.editorial,
    },
  },
};

export const fadeUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: MOTION_DURATIONS.reveal,
      ease: MOTION_EASE.editorial,
    },
  },
};

export const staggerContainerVariants = {
  hidden: {},
  visible: (customStagger = MOTION_STAGGER.normal) => ({
    transition: {
      staggerChildren: customStagger,
      delayChildren: 0.05,
    },
  }),
};

export const maskedLineVariants = {
  hidden: { y: "105%", opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: MOTION_DURATIONS.reveal,
      ease: MOTION_EASE.editorial,
    },
  },
};

export const cardRevealVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: MOTION_DURATIONS.reveal,
      ease: MOTION_EASE.editorial,
    },
  },
};
