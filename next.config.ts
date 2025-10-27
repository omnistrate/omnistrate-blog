const redirects = require("./redirect-mapping.json");

/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return redirects;
  },
  output: "standalone"
};

module.exports = nextConfig;
