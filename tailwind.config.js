/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["'Geist Variable'", "Geist", "system-ui", "-apple-system", "sans-serif"],
      },
      colors: {
        coffee: {
          50: "#FDFBF8",
          100: "#FAF3E8",
          200: "#F3E5D3",
          300: "#E8DACB",
          400: "#D8C4B5",
          500: "#C08A47",
          600: "#8A5A2B",
          700: "#5A4436",
          800: "#3E2723",
          900: "#2A1A17",
          950: "#1A0F0D",
        },
        muted: {
          DEFAULT: "#A0917F",
        },
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [],
}