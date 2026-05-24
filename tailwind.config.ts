import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{ts,tsx,astro}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        navy: {
          50: "#f0f3f8",
          100: "#d9e0ed",
          200: "#b3c1db",
          300: "#8da2c9",
          400: "#6783b7",
          500: "#4a6fa5",
          600: "#3a5a8a",
          700: "#2a456f",
          800: "#1a2a4a",
          900: "#0a1628",
          950: "#050e1a",
        },
        gold: {
          50: "#fdf8ed",
          100: "#f9edcc",
          200: "#f3db99",
          300: "#edc966",
          400: "#e0b84a",
          500: "#d4a853",
          600: "#b88a2e",
          700: "#8c6822",
          800: "#604719",
          900: "#34260d",
          950: "#1a1306",
        },
      },
      fontFamily: {
        heading: ["var(--font-heading)"],
        body: ["var(--font-body)"],
      },
      animation: {
        float: "float 3s ease-in-out infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
