"use client";

import { useState, useId } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Chip } from "@/components/ui/Chip";
import { crossfade } from "@/lib/motion";
import { cn } from "@/lib/utils";
import {
  skillCategories,
  certifications,
  education,
  type SkillCategory,
  type Certification,
  type EducationEntry,
} from "@/lib/data";

const TABS = [
  { id: "skills",    label: "Skills" },
  { id: "certs",     label: "Certifications" },
  { id: "education", label: "Education" },
] as const;

type TabId = (typeof TABS)[number]["id"];

// ─── Reusable Folder Component ────────────────────────────────────────────────

interface FolderProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  id: string;
  controlsId: string;
  variants?: any;
}

export function Folder({
  label,
  isActive,
  onClick,
  onKeyDown,
  id,
  controlsId,
  variants,
}: FolderProps) {
  return (
    <motion.button
      variants={variants}
      role="tab"
      id={id}
      aria-selected={isActive}
      aria-controls={controlsId}
      tabIndex={isActive ? 0 : -1}
      onClick={onClick}
      onKeyDown={onKeyDown}
      className="flex flex-col items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-space-cadet p-2 rounded-xl transition-all"
    >
      {/* Folder card: scaled 1.5x, roughly square-proportioned visual card */}
      <motion.div
        animate={
          isActive
            ? { y: -10, scale: 1.05, filter: "drop-shadow(0 16px 28px rgba(0,0,0,0.45))" }
            : { y: 0, scale: 1, filter: "drop-shadow(0 4px 10px rgba(0,0,0,0.15))" }
        }
        whileHover={
          isActive
            ? { y: -16, scale: 1.08, filter: "drop-shadow(0 22px 38px rgba(0,0,0,0.5))" }
            : { y: -6, scale: 1.03, filter: "drop-shadow(0 8px 18px rgba(0,0,0,0.25))" }
        }
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        style={{ zIndex: isActive ? 20 : 10 }}
        className="relative w-48 h-36 sm:w-60 sm:h-44 shrink-0 select-none"
      >
        {/* Back panel (Charcoal folder body) */}
        <div className="absolute inset-x-0 bottom-0 h-[80%] bg-neutral-900 rounded-lg border border-white/5" />
        {/* Raised tab portion */}
        <div className="absolute top-0 left-0 w-24 sm:w-28 h-[25%] bg-neutral-900 rounded-t-md border-t border-l border-white/5" />

        {/* White document visible peeking out from the top edge */}
        <motion.div
          animate={isActive ? { y: -12 } : { y: -2 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="absolute top-[15%] left-6 right-6 h-[70%] bg-white rounded-t-sm shadow-sm flex flex-col gap-1.5 p-3 overflow-hidden"
        >
          {/* Faint print lines inside page */}
          <div className="h-[3px] w-3/4 bg-neutral-200 rounded-sm" />
          <div className="h-[3px] w-1/2 bg-neutral-200 rounded-sm" />
          <div className="h-[3px] w-5/6 bg-neutral-100 rounded-sm" />
        </motion.div>

        {/* Front Panel: Translucent Frosted Glass panel */}
        <div className="absolute bottom-0 inset-x-0 h-[75%] rounded-lg bg-neutral-950/45 backdrop-blur-md border border-white/10" />
      </motion.div>

      {/* Label goes below folder icon in small-caps text */}
      <span
        style={{ fontVariant: "small-caps" }}
        className={cn(
          "font-sans text-[12px] sm:text-[13px] tracking-[0.14em] uppercase transition-colors duration-200",
          isActive ? "text-space-cadet font-bold" : "text-coffee hover:text-space-cadet"
        )}
      >
        {label}
      </span>
    </motion.button>
  );
}

// ─── Content panels ───────────────────────────────────────────────────────────

function SkillsPanel({ categories }: { categories: SkillCategory[] }) {
  if (!categories.length)
    return <EmptyState message="No skills listed yet." />;

  return (
    <div className="space-y-5">
      {categories.map((cat) => (
        <div key={cat.label}>
          <p className="label mb-2" style={{ color: "#4A2E1B" }}>{cat.label}</p>
          <div className="flex flex-wrap gap-1.5">
            {cat.skills.map((s) => (
              <Chip key={s} label={s} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function CertCard({ cert }: { cert: Certification }) {
  return (
    <div className="group flex items-start justify-between gap-4 border-b border-space-cadet/10 py-3 last:border-0">
      <div className="min-w-0">
        <p className="font-sans font-semibold text-space-cadet text-[13.5px] leading-[1.3] truncate">
          {cert.title}
        </p>
        <p className="label mt-0.5" style={{ color: "#4A2E1B" }}>{cert.issuer}</p>
      </div>
      {cert.link ? (
        <a
          href={cert.link}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`View certificate: ${cert.title}`}
          className="shrink-0 font-sans text-[11px] font-medium text-caput-mortuum border border-caput-mortuum/40 rounded-full px-2.5 py-0.5 transition-colors hover:bg-caput-mortuum/15 focus-visible:ring-2 focus-visible:ring-space-cadet"
        >
          View ↗
        </a>
      ) : (
        <span className="shrink-0 font-sans text-[11px] text-space-cadet/45 italic">—</span>
      )}
    </div>
  );
}

function CertsPanel({ certs }: { certs: Certification[] }) {
  if (!certs.length)
    return <EmptyState message="No certifications listed yet." />;
  return (
    <div>
      {certs.map((c) => (
        <CertCard key={c.title} cert={c} />
      ))}
    </div>
  );
}

function EduEntry({ entry }: { entry: EducationEntry }) {
  return (
    <div className="flex flex-col md:flex-row md:items-baseline gap-0.5 md:gap-8 border-b border-space-cadet/10 pb-4 last:border-0 last:pb-0">
      <span className="label shrink-0 md:w-24" style={{ color: "#4A2E1B" }}>{entry.period}</span>
      <div>
        <p className="font-sans font-bold text-space-cadet text-[15px] leading-snug tracking-[-0.01em]">
          {entry.institution}
        </p>
        <p className="font-sans text-[13px] text-coffee mt-0.5">{entry.degree}</p>
        {entry.detail && (
          <p className="font-sans text-[11px] text-coffee/60 mt-0.5 italic">{entry.detail}</p>
        )}
      </div>
    </div>
  );
}

function EducationPanel({ entries }: { entries: EducationEntry[] }) {
  if (!entries.length)
    return <EmptyState message="No education entries yet." />;
  return (
    <div className="space-y-4">
      {entries.map((e) => (
        <EduEntry key={e.institution} entry={e} />
      ))}
    </div>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <p className="font-sans text-coffee/60 text-[13px] py-8 text-center italic">
      {message}
    </p>
  );
}

// ─── Main section ─────────────────────────────────────────────────────────────

const rowVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const folderRevealVariants = (reduce: boolean) => ({
  hidden: { opacity: 0, y: reduce ? 0 : 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
});

export function WhatICanDo() {
  const [active, setActive] = useState<TabId>("skills");
  const panelId = useId();
  const reduce = !!useReducedMotion();

  function handleKeyDown(e: React.KeyboardEvent, idx: number) {
    if (e.key === "ArrowRight") {
      const next = TABS[(idx + 1) % TABS.length];
      setActive(next.id);
      document.getElementById(`tab-${next.id}`)?.focus();
    }
    if (e.key === "ArrowLeft") {
      const prev = TABS[(idx - 1 + TABS.length) % TABS.length];
      setActive(prev.id);
      document.getElementById(`tab-${prev.id}`)?.focus();
    }
  }

  return (
    <section
      id="skills"
      aria-label="What I Can Do"
      className="w-full bg-tan py-20 px-6 md:px-16 lg:px-24"
    >
      {/* Eyebrow */}
      <motion.p
        initial={{ opacity: 0, x: reduce ? 0 : -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: reduce ? 0.01 : 0.45 }}
        className="label mb-3"
      >
        02 / What I Can Do
      </motion.p>

      <motion.h2
        initial={{ opacity: 0, y: reduce ? 0 : 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: reduce ? 0.01 : 0.45, delay: 0.08 }}
        className="font-sans font-bold text-[2.25rem] md:text-[3rem] text-space-cadet leading-[0.95] tracking-[-0.03em] mb-10"
      >
        Skills &amp; Background
      </motion.h2>

      {/* ── Folder tab row (staggered reveal on scroll) ────────────────── */}
      <motion.div
        role="tablist"
        aria-label="Skill categories"
        variants={rowVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        className="flex gap-4 sm:gap-6 items-end mb-0 overflow-x-auto scrollbar-none pb-2 pt-4"
      >
        {TABS.map((tab, idx) => (
          <Folder
            key={tab.id}
            id={`tab-${tab.id}`}
            label={tab.label}
            isActive={active === tab.id}
            controlsId={`${panelId}-panel`}
            onClick={() => setActive(tab.id)}
            onKeyDown={(e) => handleKeyDown(e, idx)}
            variants={folderRevealVariants(reduce)}
          />
        ))}
      </motion.div>

      {/* ── Content panel — clean frosted border box ───────────────── */}
      <div
        id={`${panelId}-panel`}
        role="tabpanel"
        aria-labelledby={`tab-${active}`}
        className="bg-space-cadet/[0.03] border border-space-cadet/15 rounded-2xl p-5 md:p-7 min-h-[300px] relative z-10 shadow-inner mt-2"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            variants={reduce ? {} : crossfade}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {active === "skills"    && <SkillsPanel categories={skillCategories} />}
            {active === "certs"     && <CertsPanel certs={certifications} />}
            {active === "education" && <EducationPanel entries={education} />}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
