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
        'secondary-accent': '#FF7A00',
        'background-light': '#E8DBC7',
        'card-bg': '#FFFFFF',
        'text-dark': '#332720',
        'text-muted': '#665345',
        'red-alert': '#EF4444',
        'success': '#10B981', 
        'info': '#3B82F6',
        'error': '#EF4444',
        'warning': '#F59E0B'
      },
      borderRadius: {
        'large': '25px',
        'card': '15px',
        'btn': '12px',
      },
      boxShadow: {
        'custom': '0 6px 20px rgba(0,0,0,0.08)',
        'accent-hover': '0 4px 12px rgba(255, 122, 0, 0.3)',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}