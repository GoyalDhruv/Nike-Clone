/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'textPrimary': '#707072',
        'bgPrimary': '#f5f5f5'
      },
    },
  },
  plugins: [],
}