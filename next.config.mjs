/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  // NAMA REPO di GitHub
  basePath: "/tongtong-madura",
  assetPrefix: "/tongtong-madura/",
};

export default nextConfig;
