import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        backgroundShift: {
          "0%, 100%": { backgroundColor: "#93c47d" },
          "50%": { backgroundColor: "#6fa8dc" },
        },
      },
      animation: {
        "shift-background": "backgroundShift 20s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
