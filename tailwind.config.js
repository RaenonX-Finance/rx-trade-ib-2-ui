/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        market: {
          up: '#26a699',
          down: '#ef5350',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      fontSize: {
        '2xs': '0.7rem',
        '3xs': '0.65rem',
      },
      lineHeight: {
        unset: 'unset',
      },
    },
  },
};
