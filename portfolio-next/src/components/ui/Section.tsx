"use client";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionProps {
  id: string;
  children: React.ReactNode;
  className?: string;
  ariaLabel?: string;
}

/**
 * Generic section wrapper — consistent padding, max-width, lazy-mount animation.
 */
export function Section({ id, children, className, ariaLabel }: SectionProps) {
  const reduce = useReducedMotion();
  return (
    <motion.section
      id={id}
      aria-label={ariaLabel ?? id}
      initial={{ opacity: 0, y: reduce ? 0 : 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: reduce ? 0.01 : 0.55, ease: [0.22, 1, 0.36, 1] }}
      className={cn("w-full px-6 md:px-12 lg:px-24 py-24", className)}
    >
      {children}
    </motion.section>
  );
}
