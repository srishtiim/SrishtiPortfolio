import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function prefixPath(path: string) {
  const basePath = "/SrishtiPortfolio";
  if (!path) return "";
  if (path.startsWith("http") || path.startsWith("data:") || path.startsWith("blob:")) return path;
  if (path.startsWith(basePath)) return path;
  return `${basePath}${path.startsWith("/") ? "" : "/"}${path}`;
}
