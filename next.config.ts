import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Dev only: lets a phone on the LAN load dev resources.
  allowedDevOrigins: ["192.168.1.9"],
  // D51: root permanently redirects to /tr; no language detection.
  async redirects() {
    return [{ source: "/", destination: "/tr", permanent: true }];
  },
};

export default nextConfig;
