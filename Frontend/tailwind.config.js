// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0A2C73",       // Deep secure blue
        secondary: "#27AE60",     // Green for success/pay
        accent: "#FFD700",        // Gold (highlight or alerts)
        background: "#F5F7FA",    // Light background
        dark: "#1B1F3B",          // Dark mode base
        danger: "#E63946",        // Red for errors
        grayish: "#7D8DA1",       // Neutral text/labels
      },
    },
  },
  plugins: [],
};