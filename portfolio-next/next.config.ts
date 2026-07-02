import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/SrishtiPortfolio",
  assetPrefix: "/SrishtiPortfolio",
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "via.placeholder.com" },
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
    ],
    // Reserve explicit sizes to prevent layout shift
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  // Reduce bundle size
  experimental: {
    optimizePackageImports: ["framer-motion"],
  },
};

export default nextConfig;
