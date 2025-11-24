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
        'background-light': '#E8DBC7', // Your original --light
        'card-bg': '#FFFFFF',
        'text-dark': '#332720', // Your original --text
        'text-muted': '#665345', // Your original --muted
        'red-alert': '#EF4444',
        'success': '#10B981', 
        'info': '#3B82F6',
        'error': '#EF4444'
      },
      borderRadius: {
        'large': '25px', // Your original --radius
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
      transitionProperty: {
        'transform-shadow': 'transform, box-shadow',
      },
    },
  },
  plugins: [],
}