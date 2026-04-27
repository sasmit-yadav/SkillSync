/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        blob1: "blob 25s infinite alternate",
        blob2: "blob 35s infinite alternate-reverse",
        blob3: "blob 45s infinite alternate",
        twinkle: "twinkle 3s infinite ease-in-out",
      },
      animation: {
  pulseGlow: 'pulseGlow 2s infinite ease-in-out',
},
keyframes: {
  pulseGlow: {
    '0%, 100%': { boxShadow: '0 0 15px rgba(168, 85, 247, 0.4)' },
    '50%': { boxShadow: '0 0 30px rgba(168, 85, 247, 0.8)' },
  },
},
      keyframes: {
        blob: {
          "0%": { transform: "translate(0px, 0px) scale(1)" },
          "50%": { transform: "translate(50px, -30px) scale(1.05)" },
          "100%": { transform: "translate(-20px, 20px) scale(1)" },
        },
        twinkle: {
          "0%, 100%": { opacity: "0.1" },
          "50%": { opacity: "0.5" },
        },
      },
    },
  },
  plugins: [],
};
