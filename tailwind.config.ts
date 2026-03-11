import type { Config } from "tailwindcss";
import containerQueries from '@tailwindcss/container-queries';

const config: Config = {
  // We updated this content array to catch EVERY file in src
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bgPrimary: "var(--color-bg-primary)",
        bgSurface: "var(--color-bg-surface)",
        textPrimary: "var(--color-text-primary)",
        textMuted: "var(--color-text-muted)",
        accentPrimary: "var(--color-accent-primary)",
        accentHover: "var(--color-accent-hover)",
        borderSubtle: "var(--color-border)",
        success: "var(--color-success)",
      },
    },
  },
  plugins: [containerQueries],
};
export default config;