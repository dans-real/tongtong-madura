/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",

  images: {
    unoptimized: true,
  },

  // REMOVED basePath and assetPrefix for custom domain
  // Only use these if deploying to username.github.io/repo-name/
  // For custom domains, assets should be at root

  trailingSlash: true,

  // Enable React Compiler
  reactCompiler: true,

  // Strict mode untuk development
  reactStrictMode: true,

  // Compress
  compress: true,

  // Power optimizations
  poweredByHeader: false,
};

export default nextConfig;
