import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Performance optimizations
  experimental: {
    // Optimize package bundling
    optimizePackageImports: ['lucide-react', 'recharts', 'framer-motion'],
  },

  // Compiler optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
  },

  // TypeScript configuration
  typescript: {
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
