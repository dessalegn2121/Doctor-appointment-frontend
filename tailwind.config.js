/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3B82F6',
        secondary: '#1E40AF',
        accent: '#0EA5E9',
        danger: '#EF4444',
        success: '#10B981',
        warning: '#F59E0B',
      },
    },
  },
  plugins: [],
}
