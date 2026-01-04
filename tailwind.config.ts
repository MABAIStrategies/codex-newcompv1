import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        "mab-navy": "#000C1F",
        "mab-deep": "#0B1A30",
        "mab-gold": "#D4AF37",
        "mab-ivory": "#F8F9FA"
      },
      fontFamily: {
        heading: ["var(--font-cinzel)", "serif"],
        body: ["var(--font-inter)", "sans-serif"]
      },
      boxShadow: {
        aurora: "0 10px 60px rgba(212,175,55,0.25)",
        outline: "0 0 0 1px rgba(212,175,55,0.35)",
        glow: "0 0 30px rgba(212,175,55,0.45)"
      },
      animation: {
        shimmer: "shimmer 6s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
        pulseGold: "pulseGold 2.4s ease-in-out infinite"
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" }
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" }
        },
        pulseGold: {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(212,175,55,0.45)" },
          "50%": { boxShadow: "0 0 0 14px rgba(212,175,55,0)" }
        }
      },
      backgroundImage: {
        "gold-radial": "radial-gradient(circle at 20% 20%, rgba(212,175,55,0.28), transparent 45%), radial-gradient(circle at 80% 0%, rgba(248,249,250,0.18), transparent 35%), radial-gradient(circle at 70% 80%, rgba(11,26,48,0.45), transparent 50%)"
      }
    }
  },
  plugins: []
};

export default config;
