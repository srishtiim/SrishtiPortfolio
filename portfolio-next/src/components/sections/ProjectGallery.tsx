"use client";

import { useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { Chip } from "@/components/ui/Chip";
import { projects } from "@/lib/data";
import { cn, prefixPath } from "@/lib/utils";

export function ProjectGallery() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const reduce = !!useReducedMotion();

  // Listen to window size changes
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const handleCardClick = (idx: number) => {
    if (isMobile) {
      setHoveredIdx(hoveredIdx === idx ? null : idx);
    }
  };

  return (
    <section
      id="projects"
      aria-label="Project Gallery"
      className="w-full bg-tan py-24 px-6 md:px-16 lg:px-24 overflow-hidden"
    >
      {/* Section Eyebrow */}
      <motion.p
        initial={{ opacity: 0, x: -18 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: reduce ? 0.01 : 0.42 }}
        className="label mb-3"
      >
        03 / Projects
      </motion.p>

      {/* Section Title */}
      <motion.h2
        initial={{ opacity: 0, y: reduce ? 0 : 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: reduce ? 0.01 : 0.42, delay: 0.08 }}
        className="font-sans font-black text-space-cadet mb-14 leading-[0.93] tracking-[-0.035em]"
        style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
      >
        Selected Work
      </motion.h2>

      {projects.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3 text-center">
          <span className="text-4xl">📂</span>
          <p className="font-sans font-bold text-xl text-space-cadet tracking-[-0.02em]">No projects yet</p>
          <p className="label">Check back soon</p>
        </div>
      ) : (
        /* Hairline-divider gapless Bento Accordion Row Wrapper */
        <div className="w-full flex flex-col justify-center pt-8">
          <div
            className={cn(
              "w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]",
              "flex flex-col md:flex-row overflow-hidden",
              "border-y border-space-cadet/15 bg-white/20 backdrop-blur-md shadow-lg",
              "divide-y md:divide-y-0 md:divide-x divide-space-cadet/15"
            )}
          >
            {projects.map((project, i) => {
              const isExpanded = hoveredIdx === i;

              return (
                <div
                  key={project.id}
                  onClick={() => handleCardClick(i)}
                  onMouseEnter={() => !isMobile && setHoveredIdx(i)}
                  onMouseLeave={() => !isMobile && setHoveredIdx(null)}
                  className={cn(
                    "relative overflow-hidden flex flex-col justify-between cursor-pointer",
                    "transition-[flex,height] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                    isMobile ? "w-full" : "h-[450px]"
                  )}
                  style={{
                    // On desktop: flex expands from 1 to 3.2. On mobile: static flex, dynamic height.
                    flex: isMobile ? "none" : isExpanded ? 3.2 : 1,
                    height: isMobile ? (isExpanded ? "auto" : "110px") : "450px",
                  }}
                >
                  {/* Thumbnail / Image container (hidden/narrow on mobile default, visible on desktop) */}
                  <div
                    className={cn(
                      "relative shrink-0 overflow-hidden transition-[height,opacity] duration-500",
                      isMobile
                        ? isExpanded ? "h-40 w-full opacity-100" : "h-0 opacity-0"
                        : "h-36 w-full opacity-100"
                    )}
                  >
                    <ImageWithFallback
                      src={prefixPath(project.image ?? "")}
                      alt={`Preview of ${project.title}`}
                      fill
                      priority={i < 2}
                      className="object-cover"
                      fallbackClassName="w-full h-full"
                    />
                    {/* Subtle gradient vignette to blend with card */}
                    <div className="absolute inset-0 bg-gradient-to-t from-tan/20 to-transparent" />
                  </div>

                  {/* Content Box */}
                  <div className="p-5 flex flex-col justify-between flex-grow">
                    <div>
                      {/* Eyebrow / Metrics */}
                      <p className="label text-caput-mortuum mb-1 block truncate">
                        {project.metrics || "Project"}
                      </p>

                      {/* Title */}
                      <h3 className="font-sans font-bold text-space-cadet text-[14.5px] tracking-[-0.025em] truncate">
                        {project.title}
                      </h3>

                      {/* Tagline */}
                      <p className="font-sans text-[11px] text-coffee mt-0.5 tracking-wide truncate">
                        {project.tagline}
                      </p>

                      {/* Description & Tech Stack: smoothly fade/slide reveal */}
                      <div
                        className={cn(
                          "transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] overflow-hidden",
                          isExpanded
                            ? "opacity-100 max-h-[300px] mt-4 pointer-events-auto"
                            : "opacity-0 max-h-0 pointer-events-none"
                        )}
                      >
                        <p className="font-sans text-[12.5px] text-space-cadet/95 leading-relaxed">
                          {project.description}
                        </p>

                        <div className="flex flex-wrap gap-1 mt-4">
                          {project.stack.slice(0, 4).map((s) => (
                            <Chip key={s} label={s} />
                          ))}
                          {project.stack.length > 4 && (
                            <span className="label self-center ml-1 text-space-cadet/60">
                              +{project.stack.length - 4}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Bottom Action Footer Row */}
                    <div className="mt-4 pt-3 border-t border-space-cadet/10 flex items-center justify-between shrink-0">
                      {/* Links container: fades in on expand */}
                      <div
                        className={cn(
                          "flex gap-2 transition-opacity duration-300",
                          isExpanded ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                        )}
                      >
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-full bg-caput-mortuum text-tan font-sans font-semibold px-2.5 py-1 text-[9px] tracking-[0.06em] uppercase hover:opacity-90 transition-opacity focus-visible:ring-2 focus-visible:ring-space-cadet"
                          >
                            Live
                          </a>
                        )}
                        {project.paperUrl && (
                          <a
                            href={project.paperUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-full bg-coffee text-tan font-sans font-semibold px-2.5 py-1 text-[9px] tracking-[0.06em] uppercase hover:opacity-90 transition-opacity focus-visible:ring-2 focus-visible:ring-space-cadet"
                          >
                            Paper
                          </a>
                        )}
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-full border border-space-cadet/25 text-space-cadet font-sans font-medium px-2.5 py-1 text-[9px] tracking-[0.06em] uppercase hover:border-space-cadet/60 transition-colors focus-visible:ring-2 focus-visible:ring-space-cadet"
                          >
                            Code
                          </a>
                        )}
                      </div>

                      {/* Small Prompt / Index indicator */}
                      <span className="font-sans font-medium text-[10px] text-space-cadet/30 tabular-nums">
                        {isExpanded ? `0${i + 1}` : `[0${i + 1}]`}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
}
