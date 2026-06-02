import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'pub-f36b9f002923401ab68fe246b9e3d0f7.r2.dev',
      },
    ],
  },
};

export default nextConfig;
