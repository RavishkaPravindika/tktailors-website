import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Light mode
        "tk-black": "#111111",
        "tk-white": "#FFFFFF",
        "tk-grey": "#6B7280",
        "tk-grey-light": "#F3F4F6",
        "tk-grey-mid": "#D1D5DB",
        // Dark mode
        "tk-dark-bg": "#181818",
        "tk-dark-surface": "#232323",
        "tk-dark-border": "#333333",
        "tk-dark-text": "#E5E7EB",
        "tk-dark-muted": "#9CA3AF",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        serif: ["var(--font-playfair)", "Georgia", "serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "slide-up": "slideUp 0.6s ease-out forwards",
        "page-flip": "pageFlip 0.8s ease-in-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pageFlip: {
          "0%": { transform: "perspective(1200px) rotateY(0deg)" },
          "100%": { transform: "perspective(1200px) rotateY(-180deg)" },
        },
      },
      boxShadow: {
        elegant: "0 4px 24px rgba(0,0,0,0.08)",
        "elegant-dark": "0 4px 24px rgba(0,0,0,0.4)",
        card: "0 2px 12px rgba(0,0,0,0.06)",
      },
      transitionDuration: {
        "400": "400ms",
      },
    },
  },
  plugins: [],
} satisfies Config;
