import type { NextConfig } from "next";
import createMDX from '@next/mdx'

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
};

const withMDX = createMDX({
  // No options for now
})

export default withMDX(nextConfig);
