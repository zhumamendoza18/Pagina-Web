import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Do not auto-generate AGENTS.md / CLAUDE.md in the repo root.
  agentRules: false,
  images: {
    // Serve modern formats when the browser supports them.
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
