import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true, // enable React Compiler support (auto-memoization)
  cacheComponents: true, // opt-in for “Cache Components” feature in v16
};

export default nextConfig;
