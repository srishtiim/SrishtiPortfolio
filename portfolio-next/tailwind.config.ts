import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        "space-cadet":   "#25344F",
        "slate-gray":    "#617891",
        "tan":           "#D5B893",
        // Darkened Coffee (#4A2E1B) for WCAG AA contrast (4.5+:1) against Tan background
        "coffee":        "#4A2E1B",
        "caput-mortuum": "#632024",
      },
      fontFamily: {
        sans: [
          "Helvetica Neue", "Helvetica", "Arial", "sans-serif",
        ],
        script: ["var(--font-pinyon)", "cursive"],
      },
      letterSpacing: {
        "label": "0.18em",
        "tight-display": "-0.03em",
      },
      lineHeight: {
        "display": "0.92",
        "editorial": "1.15",
      },
      keyframes: {
        "skeleton-wave": {
          "0%":   { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        skeleton: "skeleton-wave 1.6s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
