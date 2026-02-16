/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          // Background layers
          dark: "#020617",     // main app background
          base: "#020617",
          card: "#0f172a",     // panels / sidebar

          // Borders
          border: "#1e293b",
          softBorder: "#1e293b80",

          // Text
          text: "#e2e8f0",
          muted: "#94a3b8",
          subtle: "#64748b",

          // Accent system
          accent: "#3b82f6",
          accentHover: "#2563eb",
          accentSoft: "rgba(59,130,246,0.1)",

          // Status colors
          success: "#22c55e",
          warning: "#f59e0b",
          danger: "#ef4444",
        },

        primary: "#3b82f6",
        secondary: "#6366f1",
        muted: "#94a3b8",
      },

      borderRadius: {
        auth: "1.5rem",
        xl2: "1rem",
        chat: "0.75rem",
      },

      boxShadow: {
        soft: "0 10px 25px rgba(0,0,0,0.2)",
        glow: "0 0 0 1px rgba(59,130,246,0.2), 0 10px 30px rgba(59,130,246,0.15)",
      },

      spacing: {
        18: "4.5rem",
        22: "5.5rem",
      },

      fontSize: {
        xs2: "0.7rem",
      },

      transitionTimingFunction: {
        smooth: "cubic-bezier(0.4, 0, 0.2, 1)",
      },
    },
  },
  plugins: [],
}