import { Suspense } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/sections/Hero";
import { WhoIAm } from "@/components/sections/WhoIAm";
import { WhatICanDo } from "@/components/sections/WhatICanDo";
import { ProjectGallery } from "@/components/sections/ProjectGallery";
import { ContactFooter } from "@/components/sections/ContactFooter";
import { Skeleton } from "@/components/ui/Skeleton";

/** Shared fallback for Suspense boundaries below the fold */
function SectionFallback({ h = 500 }: { h?: number }) {
  return (
    <div
      className="w-full px-6 md:px-16 lg:px-24 py-24 space-y-4"
      aria-busy="true"
      style={{ minHeight: h }}
    >
      <Skeleton className="h-6 w-32" />
      <Skeleton className="h-12 w-72" />
      <Skeleton className="h-4 w-full max-w-xl" />
      <Skeleton className="h-4 w-2/3" />
    </div>
  );
}

export default function Home() {
  return (
    <>
      <Navbar />

      <main>
        {/* Hero — above fold, no lazy suspend */}
        <Hero />

        {/* Below-fold sections — each in its own Suspense boundary */}
        <Suspense fallback={<SectionFallback h={700} />}>
          <WhoIAm />
        </Suspense>

        <Suspense fallback={<SectionFallback h={500} />}>
          <WhatICanDo />
        </Suspense>

        <Suspense fallback={<SectionFallback h={600} />}>
          <ProjectGallery />
        </Suspense>
      </main>

      <ContactFooter />
    </>
  );
}
