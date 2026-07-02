"use client";

import Image from "next/image";
import { useState } from "react";
import { ImageSkeleton } from "./Skeleton";
import { cn } from "@/lib/utils";

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  fallbackClassName?: string;
}

const FALLBACK_SVG = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 220'%3E%3Crect fill='%2325344F'/%3E%3Ctext x='50%25' y='52%25' font-family='Georgia' font-size='18' fill='%23D5B893' text-anchor='middle' dominant-baseline='middle'%3ENo preview%3C/text%3E%3C/svg%3E`;

/**
 * next/image wrapper that shows a skeleton while loading and a
 * branded placeholder SVG if the image fails to load.
 */
export function ImageWithFallback({
  src,
  alt,
  fill,
  width,
  height,
  className,
  priority,
  fallbackClassName,
}: ImageWithFallbackProps) {
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);

  return (
    <div className={cn("relative overflow-hidden", fallbackClassName)}>
      {!loaded && <ImageSkeleton />}
      <Image
        src={errored ? FALLBACK_SVG : src}
        alt={alt}
        fill={fill}
        width={!fill ? width : undefined}
        height={!fill ? height : undefined}
        priority={priority}
        className={cn(
          "transition-opacity duration-300",
          loaded ? "opacity-100" : "opacity-0",
          className
        )}
        onLoad={() => setLoaded(true)}
        onError={() => { setErrored(true); setLoaded(true); }}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </div>
  );
}
