"use client";

import { useRef } from "react";
import { useReducedMotion, motion, useScroll, useTransform, useSpring } from "framer-motion";
import { scrollRevealVariants } from "@/lib/motion";

const TAGLINES = [
  "CS · Data Science",
  "AI/ML + Full-Stack",
  "Research · Product",
];

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduce = !!useReducedMotion();

  // Scroll parallax for overlapping text blocks
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const yName = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const yTagline = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const yCopy = useTransform(scrollYProgress, [0, 1], [0, -25]);

  const nameSpring = useSpring(yName, { stiffness: 120, damping: 28 });
  const taglineSpring = useSpring(yTagline, { stiffness: 120, damping: 28 });
  const copySpring = useSpring(yCopy, { stiffness: 120, damping: 28 });

  const reveal = scrollRevealVariants(reduce);

  return (
    <section
      ref={containerRef}
      id="hero"
      aria-label="Hero"
      className="relative w-full min-h-screen bg-tan overflow-hidden flex flex-col justify-center px-6 md:px-16 lg:px-28"
    >
      {/* Decorative accent rings & lines — adjusted for light Tan background */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-[560px] h-[560px] rounded-full border border-space-cadet/[0.04]" />
        <div className="absolute -top-16 -right-16 w-[340px] h-[340px] rounded-full border border-space-cadet/[0.07]" />
        <div className="absolute bottom-16 -left-12 w-[260px] h-[260px] rounded-full border border-caput-mortuum/[0.06]" />
        {/* Faint vertical rule */}
        <div className="hidden lg:block absolute top-0 bottom-0 right-[28%] w-px bg-space-cadet/[0.06]" />
      </div>

      <div className="relative z-10 max-w-5xl">
        {/* Eyebrow label */}
        <motion.p
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="label mb-8"
        >
          Portfolio — 2026
        </motion.p>

        {/* Name — Pinyon Script & Helvetica, with subtle scroll parallax */}
        <motion.h1
          style={{
            y: reduce ? 0 : nameSpring,
            fontSize: "clamp(4.5rem, 11vw, 10.5rem)",
          }}
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="leading-[0.88] tracking-[-0.01em] text-space-cadet"
        >
          <span
            className="font-script block text-space-cadet"
            style={{ fontSize: "1em", lineHeight: 1 }}
          >
            Creative
          </span>
          <span
            className="font-sans font-black block text-caput-mortuum"
            style={{
              fontSize: "0.62em",
              letterSpacing: "-0.04em",
              lineHeight: 1,
              marginTop: "0.06em",
            }}
          >
            Developer
          </span>
        </motion.h1>

        {/* Tagline pills with scroll parallax */}
        <motion.div
          style={reduce ? {} : { y: taglineSpring }}
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-wrap gap-2 mt-7"
          aria-label="Specialisations"
        >
          {TAGLINES.map((t) => (
            <span
              key={t}
              className="font-sans font-medium text-[11px] tracking-[0.12em] uppercase
                         px-3.5 py-1.5 rounded-full
                         border border-space-cadet/25 text-space-cadet/80"
            >
              {t}
            </span>
          ))}
        </motion.div>

        {/* Sub-copy with scroll parallax */}
        <motion.p
          style={reduce ? {} : { y: copySpring }}
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-6 max-w-lg font-sans text-coffee text-[14px] leading-[1.6]"
        >
          B.Tech CS (Data Science) at Manipal University Jaipur.
          Currently a Research Intern at the{" "}
          <span className="text-space-cadet font-semibold">Scalable Analytics Research Lab, SUNY Buffalo</span>{" "}
          under Dr.&nbsp;Haimonti Dutta — clinical outcome prediction from multimodal EHR data.
        </motion.p>

        {/* CTA row */}
        <motion.div
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex gap-3 mt-8 flex-wrap"
        >
          <a
            href="#projects"
            className="rounded-full bg-caput-mortuum text-tan font-sans font-semibold
                       px-6 py-2.5 text-[12px] tracking-[0.08em] uppercase
                       transition-transform hover:scale-[1.03] active:scale-[0.98]
                       focus-visible:ring-2 focus-visible:ring-space-cadet"
          >
            See My Work
          </a>
          <a
            href="#contact"
            className="rounded-full border border-space-cadet/30 text-space-cadet/80 font-sans font-medium
                       px-6 py-2.5 text-[12px] tracking-[0.08em] uppercase
                       transition-colors hover:border-space-cadet/60 hover:text-space-cadet
                       focus-visible:ring-2 focus-visible:ring-space-cadet"
          >
            Get In Touch
          </a>
        </motion.div>
      </div>
    </section>
  );
}
