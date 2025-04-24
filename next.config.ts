import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["res.cloudinary.com", "images.unsplash.com", "cdn.pixabay.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
  },]
}
};

export default nextConfig;
