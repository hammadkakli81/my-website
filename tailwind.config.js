/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'primary-dark': '#2563eb',
        primary: '#3b82f6',
        highlight: {
          dark: '#FFFFFF',
          light: '#1f1f1f',
        },
        secondary: {
          dark: '#60a5fa',
          light: '#e6e6e6',
        },
        action: '#3B82F6',
      },
      transitionProperty: {
        width: 'width',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
    backgroundImage: {
      'png-pattern': "url('/empty-bg.jpg')",
      'gradient-primary': 'linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%)',
      'gradient-secondary': 'linear-gradient(135deg, #fbbf24 0%, #fcd34d 100%)',
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
