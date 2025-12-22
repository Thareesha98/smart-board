/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#D84C38',
        'accent': '#FF7A00',
        'background-light': '#E8DBC7',
        'card-bg': '#FFFFFF',
        'text-dark': '#332720',
        'text-muted': '#665345',
        'success': '#10B981',
        'red-alert': '#EF4444',
      },
      borderRadius: {
        'large': '25px',
      },
      boxShadow: {
        'custom': '0 6px 20px rgba(0,0,0,0.08)',
      },
    },
  },
  plugins: [],
}