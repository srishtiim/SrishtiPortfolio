import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
  "aria-label"?: string;
}

/**
 * Skeleton loader block — use as placeholder while async content loads.
 */
export function Skeleton({ className, "aria-label": label }: SkeletonProps) {
  return (
    <div
      role="status"
      aria-label={label ?? "Loading…"}
      className={cn(
        "skeleton rounded-lg",
        className
      )}
    />
  );
}

/** Pre-built skeleton for a project card */
export function ProjectCardSkeleton() {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-slate-gray/20 p-4">
      <Skeleton className="h-44 w-full" aria-label="Loading project image" />
      <Skeleton className="h-5 w-2/3" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-3/4" />
      <div className="flex gap-2 pt-1">
        <Skeleton className="h-6 w-16 rounded-full" />
        <Skeleton className="h-6 w-16 rounded-full" />
        <Skeleton className="h-6 w-12 rounded-full" />
      </div>
    </div>
  );
}

/** Pre-built skeleton for an image */
export function ImageSkeleton({ className }: { className?: string }) {
  return (
    <Skeleton
      className={cn("w-full h-full absolute inset-0", className)}
      aria-label="Loading image"
    />
  );
}
