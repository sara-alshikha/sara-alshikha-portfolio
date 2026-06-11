/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          dark: "#0A1628",
          DEFAULT: "#132238",
          light: "#1E3A5F",
        },
        gold: {
          DEFAULT: "#D4AF37",
          light: "#E8C97A",
          pale: "#F5E9C8",
        },
        gray: {
          text: "#94A3B8"
        },
        muted: "#94A3B8", // Keeping for backward compatibility with existing components
      },
      fontFamily: {
        playfair: ['"Playfair Display"', 'serif'],
        inter: ['Inter', 'sans-serif'],
        cairo: ['Cairo', 'sans-serif'],
      },
      animation: {
        'float': 'float 8s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
      },
    },
  },
  plugins: [],
}
