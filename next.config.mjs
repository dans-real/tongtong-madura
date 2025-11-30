const isProd = process.env.NODE_ENV === "production";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  // Kalau dev (npm run dev) → tanpa basePath
  // Kalau di-build (GitHub Pages) → pakai nama repo
  basePath: isProd ? "/tongtong-madura" : "",
  assetPrefix: isProd ? "/tongtong-madura/" : "",
};

export default nextConfig;
