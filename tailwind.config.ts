import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        maduraRed: "#b91c1c",
        maduraGold: "#fbbf24",
        maduraSoft: "#f97316",
      },
      fontFamily: {
        sans: ["system-ui", "ui-sans-serif", "sans-serif"],
      },
      boxShadow: {
        "soft-card": "0 20px 40px rgba(15,23,42,0.7)",
      },
    },
  },
  plugins: [],
};

export default config;
