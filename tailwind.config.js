module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'light-bg': '#0f172a'
      },
      boxShadow: {
        neon: "0 0 5px rgba(52, 189, 215, 1)",
        neon2: "0 0 15px rgba(0, 255, 0, 0.8), 0 0 25px rgba(0, 255, 0, 0.6), inset 0 0 10px rgba(0, 255, 0, 0.4)",
        neonHover: "0 0 20px rgba(0, 255, 0, 0.8), 0 0 30px rgba(0, 255, 0, 0.6), inset 0 0 15px rgba(0, 255, 0, 0.4)",
        neonToggle: "0 0 15px rgba(0, 0, 200, 0.8), 0 0 25px rgba(0, 0, 200, 0.6), inset 0 0 10px rgba(0, 0, 255, 0.4)",
        neonToggleHover: "0 0 20px rgba(0, 0, 255, 0.8), 0 0 30px rgba(0, 0, 255, 0.6), inset 0 0 15px rgba(0, 0, 255, 0.4)",
      },
      dropShadow: {
        'forX': '0 0 10px rgba(255, 0, 0, 1)',
        'forO': '0 0 10px rgba(52, 189, 215, 1)',
      },
    },
  },
  plugins: [],
  darkMode: 'class', // Enable dark mode
  variants: {
    extend: {
      textColor: ['neon'], // Add `neon` as a variant for text color
    },
  },
};
