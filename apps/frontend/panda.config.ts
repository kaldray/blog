import { defineConfig } from "@pandacss/dev";

export default defineConfig({
  // Whether to use css reset
  preflight: true,
  jsxStyleProps: "all",

  // Where to look for your css declarations
  include: ["./src/**/*.{js,jsx,ts,tsx}", "./src/Components/*.{ts,tsx,js,jsx}"],

  // Files to exclude
  exclude: [],

  gitignore: true,
  jsxFramework: "react",
  clean: true,
  // Useful for theme customization
  theme: {
    extend: {
      tokens: {
        fonts: {
          montserrat: { value: "var(--font-montserrat),sans-serif" },
        },
        colors: {
          primary: { value: "hsl(208, 97%, 87%)" },
          secondary: { value: "hsl(337, 100%, 89%)" },
          accent: { value: "hsl(278, 35%, 78%)" },
        },
      },
    },
  },

  // The output directory for your css system
  outdir: "styled-system",
});
