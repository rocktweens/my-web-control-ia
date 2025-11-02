const config = require("./src/config/config.json");
const withPWA = require("next-pwa")({
  dest: "public",
  register: false,
  skipWaiting: true,
  scope: "/chat/",
  disable: process.env.NODE_ENV === "development", // desactiva PWA en dev
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  basePath: config.base_path !== "/" ? config.base_path : "",
  trailingSlash: config.site.trailing_slash,
  transpilePackages: ["next-mdx-remote"],
  output: "standalone",
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.shopify.com", pathname: "/**" },
    ],
  },
  eslint: { ignoreDuringBuilds: true },
};

// exporta con PWA habilitado
module.exports = nextConfig;
//module.exports = withPWA(nextConfig);
