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
};

export default nextConfig;
