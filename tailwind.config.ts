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
        neonPurple: "#a855f7",
        neonCyan: "#06b6d4",
        // Palet Gradasi Merah ke Coklat (Red to Sienna/Burnt Umber)
        redBrown: {
          50: "#fef2f2",   // sangat terang
          100: "#fee2e2",  // terang
          200: "#fecaca",  // merah muda
          300: "#fca5a5",  // merah soft
          400: "#f87171",  // merah cerah
          500: "#dc2626",  // merah murni
          600: "#b91c1c",  // merah gelap (maduraRed)
          700: "#991b1b",  // merah kecoklatan
          800: "#7f2d1f",  // coklat merah (sienna)
          900: "#6b2718",  // coklat tua (burnt umber)
          950: "#4a1d12",  // coklat sangat gelap
        },
      },
      fontFamily: {
        sans: ["system-ui", "ui-sans-serif", "sans-serif"],
      },
      boxShadow: {
        "soft-card": "0 20px 40px rgba(15,23,42,0.7)",
        "glow-gold": "0 0 20px rgba(251, 191, 36, 0.4)",
        "glow-purple": "0 0 20px rgba(168, 85, 247, 0.4)",
        "glow-cyan": "0 0 20px rgba(6, 182, 212, 0.4)",
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
  plugins: [],
};

export default config;
