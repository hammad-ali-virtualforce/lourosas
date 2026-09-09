import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lourosas.yourvirtualforce.com",
      },
    ],
  },
};

export default nextConfig;