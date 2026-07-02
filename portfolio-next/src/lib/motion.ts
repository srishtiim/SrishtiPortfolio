// src/lib/motion.ts — Shared motion configs, respects prefers-reduced-motion

import type { MotionProps, Variants } from "framer-motion";

/** Returns true when user has opted into reduced motion */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Standard transition curve and duration used site-wide */
export const sharedTransition = {
  duration: 0.6,
  ease: [0.22, 1, 0.36, 1] as const,
};

/** Scroll reveal animation variants */
export const scrollRevealVariants = (reduced = false): Variants => ({
  hidden: { opacity: 0, y: reduced ? 0 : 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: sharedTransition,
  },
});

/** Crossfade for tab content */
export const crossfade: Variants = {
  hidden: { opacity: 0, scale: 0.98 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.25, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    scale: 0.97,
    transition: { duration: 0.15 },
  },
};

/** Expand/collapse layout animation props */
export const expandProps: MotionProps = {
  layout: true,
  transition: { layout: { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const } },
};
