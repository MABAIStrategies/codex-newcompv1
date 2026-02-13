import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        midnight: "#000C1F",
        abyss: "#0B1A30",
        aurum: "#D4AF37",
        ivory: "#F8F9FA",
      },
      fontFamily: {
        heading: ["var(--font-cinzel)", "serif"],
        body: ["var(--font-inter)", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 20px rgba(212, 175, 55, 0.25)",
      },
      backgroundImage: {
        "gold-noise": "radial-gradient(circle at 20% 20%, rgba(212,175,55,0.08), transparent 35%), radial-gradient(circle at 80% 0%, rgba(212,175,55,0.12), transparent 30%), radial-gradient(circle at 50% 50%, rgba(212,175,55,0.06), transparent 45%)",
      },
    },
  },
  plugins: [],
};

export default config;
