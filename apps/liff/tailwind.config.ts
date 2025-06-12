import type { Config } from "tailwindcss";

export default {
  darkMode: 'class',
  content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
          "Apple Color Emoji",
          "Segoe UI Emoji",
          "Segoe UI Symbol",
          "Noto Color Emoji",
        ],
      },
      colors: {
        // Semantic color names
        primary: {
          DEFAULT: '#FDC700',
          light: '#FFDB4D',
          dark: '#E6B300',
          contrast: '#000000',
        },
        // Supporting colors
        background: {
          light: '#FFFFFF',
          dark: '#1A1A1A',
        },
        text: {
          primary: '#1A1A1A',
          secondary: '#4B5563',
          disabled: '#9CA3AF',
          onPrimary: '#000000',
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
} satisfies Config;
