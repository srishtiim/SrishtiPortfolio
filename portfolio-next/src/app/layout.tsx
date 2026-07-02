import type { Metadata } from "next";
import { Pinyon_Script } from "next/font/google";
import "./globals.css";

// Pinyon Script — signature/accent only (hero name + footer headline)
const pinyonScript = Pinyon_Script({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-pinyon",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Srishti Mukherjee — AI/ML & Full-Stack Engineer",
  description:
    "B.Tech CS (Data Science) student at Manipal University Jaipur. Research Intern at SUNY Buffalo. Building AI systems and data-driven products.",
  openGraph: {
    title: "Srishti Mukherjee — AI/ML & Full-Stack Engineer",
    description:
      "Research Intern at Scalable Analytics Research Lab, SUNY Buffalo.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={pinyonScript.variable}>
      <body className="bg-space-cadet text-tan antialiased">
        {children}
      </body>
    </html>
  );
}
