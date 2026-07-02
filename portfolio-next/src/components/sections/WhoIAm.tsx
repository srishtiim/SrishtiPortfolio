"use client";

import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { prefixPath } from "@/lib/utils";

const PHOTOS = [
  { src: "/photo1.jpg", word: "WHO", alt: "Srishti Mukherjee — photo 1" },
  { src: "/photo2.jpg", word: "I",   alt: "Srishti Mukherjee — photo 2" },
  { src: "/photo3.jpg", word: "AM",  alt: "Srishti Mukherjee — photo 3" },
];

const FALLBACK =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 500'%3E%3Crect fill='%2325344F'/%3E%3Ctext x='50%25' y='50%25' font-family='Helvetica' font-size='14' fill='%23D5B893' text-anchor='middle' dominant-baseline='middle'%3ESrishti%3C/text%3E%3C/svg%3E";

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.25,
    },
  },
};

const quoteContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.05,
    },
  },
};

const cardVariants = (reduce: boolean): Variants => ({
  hidden: { opacity: 0, y: reduce ? 0 : 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
});

const wordVariants = (reduce: boolean): Variants => ({
  hidden: { opacity: 0, y: reduce ? 0 : 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay: reduce ? 0 : 0.25,
      duration: 0.4,
      ease: "easeOut",
    },
  },
});

const lineVariants = (reduce: boolean): Variants => ({
  hidden: { opacity: 0, y: reduce ? 0 : 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
});

export function WhoIAm() {
  const reduce = !!useReducedMotion();

  return (
    <section
      id="about"
      aria-label="Who I Am"
      className="w-full bg-tan py-24 px-6 md:px-16 lg:px-24 overflow-hidden"
    >
      <motion.p
        initial={{ opacity: 0, x: reduce ? 0 : -18 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: reduce ? 0.01 : 0.42 }}
        className="label mb-14"
      >
        01 / Who I Am
      </motion.p>

      <h2 className="sr-only">Who I Am</h2>

      {/* Photo strip with staggered loading on scroll */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="flex flex-wrap justify-center gap-8 md:gap-14 mb-20"
        aria-hidden="true"
      >
        {/* Photo strip with staggered loading on scroll */}
        {PHOTOS.map((p, i) => (
          <motion.div
            key={p.word}
            variants={cardVariants(reduce)}
            className="relative flex flex-col items-center gap-4"
          >
            {/* Perfectly horizontal, zero rotation/skew slant */}
            <div className="relative overflow-hidden rounded-xl shadow-xl w-[180px] h-[240px] md:w-[220px] md:h-[290px]">
              <Image
                src={prefixPath(p.src)}
                alt={p.alt}
                fill
                unoptimized
                sizes="(max-width: 768px) 180px, 220px"
                className="object-cover"
              />
            </div>

            {/* Poster word — matching 'Creative' cursive script */}
            <motion.span
              variants={wordVariants(reduce)}
              className="font-script text-space-cadet select-none leading-none block"
              style={{
                fontSize: "clamp(2.5rem, 5vw, 3.8rem)",
                letterSpacing: "-0.01em",
              }}
            >
              {p.word}
            </motion.span>
          </motion.div>
        ))}
      </motion.div>

      {/* Bio block — denser, magazine-editorial layout */}
      <div className="max-w-2xl mx-auto">
        {/* Pull quote — Helvetica, tight leading, staggered scroll reveal */}
        <motion.p
          variants={quoteContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="font-sans font-bold text-space-cadet text-balance overflow-hidden"
          style={{ fontSize: "clamp(1.35rem, 2.8vw, 2rem)", lineHeight: 1.12, letterSpacing: "-0.025em" }}
        >
          <motion.span className="block" variants={lineVariants(reduce)}>
            Third-year B.Tech CS (Data Science) —
          </motion.span>
          <motion.span className="block text-caput-mortuum" variants={lineVariants(reduce)}>
            building AI systems that bridge research and product.
          </motion.span>
        </motion.p>

        {/* Rule & Description — fade in with slight delay */}
        <motion.div
          initial={{ opacity: 0, y: reduce ? 0 : 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: reduce ? 0 : 0.4, duration: 0.5 }}
        >
          {/* Rule */}
          <div className="my-5 h-px w-12 bg-caput-mortuum" />

          <p className="font-sans text-[13.5px] text-coffee leading-[1.65]">
            Currently a{" "}
            <span className="text-space-cadet font-semibold">Research Intern</span> at the{" "}
            <em className="not-italic text-space-cadet/80">Scalable Analytics Research Lab, SUNY Buffalo</em>,
            under <span className="text-space-cadet font-semibold">Dr.&nbsp;Haimonti Dutta</span>
            {" "}— clinical outcome prediction from multimodal EHR data,
            synthetic EHR generation, LLMs for clinical note analysis.
          </p>

          <p className="font-sans text-[12px] text-coffee/60 mt-3 leading-[1.6]">
            Previously: Total Shift Left (Software) · Wedd.Ai (AI/ML) · Smollan · Vatika Ltd.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
