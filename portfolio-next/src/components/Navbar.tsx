"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "#about",    label: "About"    },
  { href: "#skills",   label: "Skills"   },
  { href: "#projects", label: "Projects" },
  { href: "#contact",  label: "Contact"  },
];

export function Navbar() {
  const [activeLink, setActiveLink] = useState("#about");
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState(false);
  const reduce = !!useReducedMotion();

  // Scroll spy to highlight active section in navbar automatically
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 120;
      for (let i = NAV_LINKS.length - 1; i >= 0; i--) {
        const section = document.querySelector(NAV_LINKS[i].href);
        if (section) {
          const top = section.getBoundingClientRect().top + window.scrollY;
          if (top <= scrollPosition) {
            setActiveLink(NAV_LINKS[i].href);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -10, x: "-50%" }}
      animate={{ opacity: 1, y: 0, x: "-50%" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "fixed top-5 left-1/2 z-50 transition-all duration-300",
        "bg-tan/92 backdrop-blur-md border border-space-cadet/15 shadow-lg",
        "w-[92%] max-w-[400px] md:w-auto md:max-w-none",
        mobileExpanded ? "rounded-[24px]" : "rounded-full"
      )}
    >
      {/* Desktop Navigation Row */}
      <nav className="hidden md:flex items-center gap-3 py-1.5 px-3" aria-label="Desktop primary navigation">
        {/* SM Logo */}
        <a
          href="#hero"
          aria-label="Back to top"
          onClick={() => setActiveLink("#hero")}
          className="font-sans font-black text-space-cadet leading-none tracking-[-0.05em] text-[1.2rem] px-2 hover:opacity-75 transition-opacity"
        >
          SM
        </a>

        <div className="h-4 w-px bg-space-cadet/15" />

        {/* Links */}
        <ul className="flex items-center gap-1.5" role="list">
          {NAV_LINKS.map(({ href, label }) => {
            const isActive = activeLink === href;
            const isHovered = hoveredLink === href;
            return (
              <li key={href} className="relative" role="none">
                <a
                  href={href}
                  onMouseEnter={() => setHoveredLink(href)}
                  onMouseLeave={() => setHoveredLink(null)}
                  onClick={() => setActiveLink(href)}
                  className={cn(
                    "relative z-10 block px-3.5 py-1.5 rounded-full font-sans text-[11px] font-bold tracking-[0.08em] uppercase transition-colors duration-300",
                    isActive || isHovered ? "text-space-cadet" : "text-space-cadet/60"
                  )}
                >
                  {label}
                </a>
                {/* Liquid slider active indicator */}
                {isHovered && !reduce && (
                  <motion.span
                    layoutId="nav-highlight"
                    transition={{ type: "spring", stiffness: 380, damping: 28 }}
                    className="absolute inset-0 bg-space-cadet/[0.06] rounded-full -z-10"
                  />
                )}
                {!hoveredLink && isActive && !reduce && (
                  <motion.span
                    layoutId="nav-highlight"
                    transition={{ type: "spring", stiffness: 380, damping: 28 }}
                    className="absolute inset-0 bg-space-cadet/[0.1] rounded-full -z-10"
                  />
                )}
              </li>
            );
          })}
        </ul>

        <div className="h-4 w-px bg-space-cadet/15" />

        {/* CTA */}
        <a
          href="#contact"
          onClick={() => setActiveLink("#contact")}
          className="rounded-full bg-caput-mortuum text-tan font-sans font-bold text-[10px] tracking-[0.08em] uppercase px-4.5 py-2 hover:opacity-90 transition-opacity"
        >
          Let&apos;s Chat
        </a>
      </nav>

      {/* Mobile Navigation Column */}
      <div className="flex md:hidden flex-col w-full py-2 px-4" aria-label="Mobile primary navigation">
        <div className="flex items-center justify-between h-10 w-full">
          {/* SM Logo */}
          <a
            href="#hero"
            onClick={() => { setActiveLink("#hero"); setMobileExpanded(false); }}
            className="font-sans font-black text-space-cadet leading-none tracking-[-0.05em] text-[1.2rem] hover:opacity-75 transition-opacity"
          >
            SM
          </a>

          {/* Expand Trigger Hamburger */}
          <button
            className="flex flex-col gap-[4px] p-2 focus-visible:outline-none"
            aria-label={mobileExpanded ? "Close menu" : "Open menu"}
            onClick={() => setMobileExpanded(v => !v)}
          >
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                animate={{
                  rotate: mobileExpanded ? (i === 0 ? 45 : i === 2 ? -45 : 0) : 0,
                  y:      mobileExpanded ? (i === 0 ? 5.5  : i === 2 ? -5.5  : 0) : 0,
                  opacity: mobileExpanded && i === 1 ? 0 : 1,
                }}
                transition={{ duration: 0.2 }}
                className="block w-4.5 h-[1.5px] bg-space-cadet origin-center"
              />
            ))}
          </button>
        </div>

        {/* Dropdown Menu */}
        <AnimatePresence>
          {mobileExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden mt-2"
            >
              <ul className="flex flex-col gap-2 pb-4 border-t border-space-cadet/10 pt-4" role="list">
                {NAV_LINKS.map(({ href, label }) => (
                  <li key={href}>
                    <a
                      href={href}
                      onClick={() => {
                        setActiveLink(href);
                        setMobileExpanded(false);
                      }}
                      className={cn(
                        "block py-2 text-[12px] font-bold tracking-[0.08em] uppercase transition-colors",
                        activeLink === href ? "text-space-cadet font-extrabold" : "text-space-cadet/75"
                      )}
                    >
                      {label}
                    </a>
                  </li>
                ))}
                <li className="pt-2">
                  <a
                    href="#contact"
                    onClick={() => {
                      setActiveLink("#contact");
                      setMobileExpanded(false);
                    }}
                    className="w-full text-center block rounded-full bg-caput-mortuum text-tan font-sans font-bold text-[11px] tracking-[0.08em] uppercase py-2 hover:opacity-90 transition-opacity"
                  >
                    Let&apos;s Chat
                  </a>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
