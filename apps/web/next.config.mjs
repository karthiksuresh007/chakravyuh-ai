/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  experimental: {
    optimizePackageImports: ["recharts", "framer-motion", "react-markdown"],
  },
};

export default nextConfig;
