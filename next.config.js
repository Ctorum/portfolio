/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  images: {
    loader: "akamai",
    path: "",
  },
  basePath: process.env.NODE_ENV,
  assetPrefix: process.env.NODE_ENV,
};

module.exports = nextConfig;
