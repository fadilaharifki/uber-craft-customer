import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_MAPBOX_API_KEY: process.env.NEXT_PUBLIC_MAPBOX_API_KEY,
  },
  transpilePackages: ["mui-one-time-password-input", "mui-tel-input"],
  /* config options here */
};

export default nextConfig;
