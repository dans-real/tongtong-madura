/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",        // <– WAJIB untuk GitHub Pages
  images: {
    unoptimized: true,     // karena GitHub Pages hanya static file
  },
  // ganti "tongtong-madura" dengan nama repo GitHub kamu
  basePath: "/tongtong-madura",
  assetPrefix: "/tongtong-madura/",
};

export default nextConfig;
