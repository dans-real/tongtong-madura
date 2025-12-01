const isProd = process.env.NODE_ENV === "production";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  // Saat dev (npm run dev) => tanpa basePath
  // Saat production (npm run build, di GitHub Pages) => pakai nama repo
  basePath: isProd ? "/tongtong-madura" : "",
  assetPrefix: isProd ? "/tongtong-madura/" : "",

  // Skip trailing slash untuk compatibility
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
