/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/_components/**/*.{js,ts,jsx,tsx,mdx}',
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
          lighter: '#D9D9D9',
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
      spacing: {
        '15':'60px',
        '3/10':'30%',
        '7/10':'70%',
        '22':'90px'
      },
    },
  },
  plugins: [],
}
