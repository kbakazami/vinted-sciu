/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        // => @media (min-width: 640px) { ... }
        'sm': '640px',
        // => @media (min-width: 768px) { ... }
        'md': '768px',
        // => @media (min-width: 1024px) { ... }
        'lg': '1024px',
        // => @media (min-width: 1280px) { ... }
        'xl': '1280px',
        // => @media (min-width: 1600px) { ... }
        '2xl': '1600px',
        // => @media (min-width: 1920px) { ... }
        '3xl': '1920px'
      },
      colors: {
        primary: {
          "DEFAULT": '#212529',
        },
        secondary: {
          "DEFAULT": '#F6D9DD',
          darker: '#FF5F76',
        }
      },
      fontFamily: {
        poppins: ['var(--font-poppins)'],
      },
    },
  },
  plugins: [],
}
