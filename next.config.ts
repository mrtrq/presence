import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // About was renamed Contact; keep old links working.
      { source: "/about", destination: "/contact", permanent: true },
      // Writing and Interests are hidden until they're rewritten. The pages
      // still exist in app/; delete these two lines to bring them back.
      { source: "/writing/:path*", destination: "/", permanent: false },
      { source: "/interests/:path*", destination: "/", permanent: false },
    ];
  },
};

export default nextConfig;
