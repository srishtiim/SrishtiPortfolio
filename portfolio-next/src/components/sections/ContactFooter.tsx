"use client";

import { motion, useReducedMotion } from "framer-motion";
import { scrollRevealVariants } from "@/lib/motion";

const LINKS = [
  {
    label: "Email",
    href: "mailto:srishtimukherjee01@gmail.com",
    display: "srishtimukherjee01@gmail.com",
    icon: "✉",
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/srishti-mukherjee",
    display: "linkedin.com/in/srishti-mukherjee",
    icon: "in",
  },
  {
    label: "GitHub",
    href: "https://github.com/srishtiim",
    display: "github.com/srishtiim",
    icon: "gh",
  },
];

export function ContactFooter() {
  const reduce = !!useReducedMotion();
  const reveal = scrollRevealVariants(reduce);

  return (
    <footer
      id="contact"
      aria-label="Contact"
      className="w-full bg-caput-mortuum px-6 md:px-16 lg:px-28 py-24 relative overflow-hidden"
    >
      {/* Decorative ampersand — faint */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-8 -right-4 font-sans font-black select-none"
        style={{
          fontSize: "clamp(12rem, 22vw, 22rem)",
          lineHeight: 1,
          color: "rgba(255,255,255,0.04)",
          letterSpacing: "-0.04em",
        }}
      >
        &amp;
      </span>

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Eyebrow */}
        <motion.p
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="label mb-7"
          style={{ color: "rgba(213,184,147,0.45)" }}
        >
          04 / Contact
        </motion.p>

        {/* Headline — Pinyon Script only here, fades + slides up on scroll entry */}
        <motion.h2
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="font-script text-tan text-balance mb-14"
          style={{
            fontSize: "clamp(3rem, 9vw, 8.5rem)",
            lineHeight: 1.05,
            letterSpacing: "-0.01em",
          }}
        >
          Let&apos;s connect.
        </motion.h2>

        {/* Asymmetric baseline layout */}
        <div className="flex flex-col md:flex-row md:items-end gap-8 md:justify-between">
          {/* Links — fades + slides up */}
          <motion.ul
            variants={reveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-3"
            aria-label="Contact links"
          >
            {LINKS.map(({ label, href, display, icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target={href.startsWith("mailto") ? undefined : "_blank"}
                  rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                  aria-label={`${label}: ${display}`}
                  className="group flex items-center gap-3 text-tan/65 hover:text-tan
                             transition-colors focus-visible:ring-2 focus-visible:ring-tan
                             focus-visible:outline-none rounded-sm"
                >
                  <span
                    className="w-7 h-7 rounded-full border border-tan/20 flex items-center
                               justify-center font-sans font-bold text-[10px] tracking-[0.06em]
                               group-hover:border-tan/55 transition-colors shrink-0"
                  >
                    {icon}
                  </span>
                  <span className="font-sans text-[13px] underline-offset-4 group-hover:underline">
                    {display}
                  </span>
                </a>
              </li>
            ))}
          </motion.ul>

          {/* Right column — small print, fades + slides up */}
          <motion.div
            variants={reveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-right"
          >
            <p className="font-sans text-[11px] leading-[2] tracking-[0.06em] text-tan/35">
              Open to research collaborations,
              <br />
              internships &amp; full-time roles.
              <br />
              <span className="block mt-1 text-tan/20">
                © {new Date().getFullYear()} Srishti Mukherjee
              </span>
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
