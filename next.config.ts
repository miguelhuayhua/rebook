import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images:{
    remotePatterns: [
      {
        protocol: "https",
        hostname: "uwvzdbdovvqztagdjxlb.supabase.co",
        port: "",
        pathname: "/storage/**"
      }
    ]
  }
};

export default nextConfig;
