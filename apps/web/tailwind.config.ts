import type { Config } from "tailwindcss";
import { colors } from "./src/design/colors";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: colors.background,
        foreground: colors.textPrimary,
        surface: colors.surface,
        "ck-border": colors.border,
        "text-primary": colors.textPrimary,
        "text-secondary": colors.textSecondary,
        "ai-primary": colors.aiPrimary,
        "conflict-high": colors.conflictHigh,
        "conflict-medium": colors.conflictMedium,
        "conflict-low": colors.conflictLow,
        "conflict-historical": colors.conflictHistorical,
        "map-water": colors.mapWater,
        "map-land": colors.mapLand,
      },
      fontFamily: {
        sans: ["Inter", "var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: [
          "JetBrains Mono",
          "var(--font-geist-mono)",
          "monospace",
        ],
      },
      keyframes: {
        "timeline-pulse": {
          "0%, 100%": { transform: "scale(1)", opacity: "0.4" },
          "50%": { transform: "scale(2)", opacity: "0" },
        },
        "pulse-war": {
          "0%": { transform: "scale(1)", opacity: "1" },
          "50%": { transform: "scale(1.6)", opacity: "0.4" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
      },
      animation: {
        "pulse-war": "pulse-war 2s infinite",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
export default config;
