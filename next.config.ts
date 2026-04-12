import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.google.com",
        pathname: "/s2/favicons",
      },
      {
        protocol: "https",
        hostname: "img.youtube.com",
        pathname: "/vi/**",
      },
      {
        protocol: "https",
        hostname: "i.ytimg.com",
        pathname: "/vi/**",
      },
      {
        protocol: "https",
        hostname: "d2bwo9zemjwxh5.cloudfront.net",
        pathname: "/ep-logo/**",
      },
      {
        protocol: "https",
        hostname: "theadultman.com",
        pathname: "/wp-content/**",
      },
      {
        protocol: "https",
        hostname: "www.thecoolector.com",
        pathname: "/wp-content/**",
      },
      {
        protocol: "https",
        hostname: "mensgear.net",
        pathname: "/wp-content/**",
      },
    ],
  },
};

export default nextConfig;
