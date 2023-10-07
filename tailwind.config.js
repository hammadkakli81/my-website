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
        'primary-dark': '#3e455a',
        primary: '#ffffff',
        highlight: {
          dark: '#FFFFFF',
          light: '#1f1f1f',
        },
        secondary: {
          dark: '#4f576e',
          light: '#e6e6e6',
        },
        action: '#3B82F6',
      },
      transitionProperty: {
        width: 'width',
      },
    },
    backgroundImage: {
      'png-pattern': "url('/empty-bg.jpg')",
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
