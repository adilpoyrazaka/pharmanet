import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Dev only: lets a phone on the LAN load dev resources.
  allowedDevOrigins: ["192.168.1.9"],
};

export default nextConfig;
