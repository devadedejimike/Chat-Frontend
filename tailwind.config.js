/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Semantic naming
        brand: {
          dark: "#020617",    // slate-950
          card: "#0f172a",    // slate-900
          border: "#1e293b",  // slate-800
          accent: "#3b82f6",  // blue-500
          glow: "rgba(59, 130, 246, 0.1)",
        },
        // You can also define a custom palette
        primary: "#3b82f6",
        secondary: "#6366f1",
        muted: "#94a3b8",
      },
      borderRadius: {
        'auth': '1.5rem',
      }
    },
  },
  plugins: [],
}