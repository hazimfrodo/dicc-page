import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["hazimio.com"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dicc.um.edu.my",
      },
      {
        protocol: "https",
        hostname: "www.dicc.um.edu.my",
      },
      {
        protocol: "https",
        hostname: "secure.gravatar.com",
      },
    ],
  },
};

export default nextConfig;
