import { NextConfig } from "next";
import redirects from "./redirect-mapping.json";

const nextConfig: NextConfig = {
  async redirects() {
    return redirects;
  },
  output: "standalone"
};

export default nextConfig;
