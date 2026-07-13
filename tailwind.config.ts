import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        "fade-slide-in": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "copy-pop": {
          "0%": { transform: "scale(1)" },
          "40%": { transform: "scale(1.02)" },
          "100%": { transform: "scale(1)" },
        },
      },
      animation: {
        "fade-slide-in": "fade-slide-in 0.35s ease-out",
        "copy-pop": "copy-pop 0.35s ease-out",
      },
    },
  },
  plugins: [],
} satisfies Config;
