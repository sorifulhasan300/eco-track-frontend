import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // এটি সব ডোমেইনকে সাপোর্ট করবে
      },
      {
        protocol: "http",
        hostname: "**", // যদি কোনো ইমেজ http থেকে আসে সেটির জন্যও
      },
    ],
  },
};

export default nextConfig;