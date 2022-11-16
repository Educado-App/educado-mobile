/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./screens/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
  },
    extend: {
      colors:{
        cyanBlue: '#65D4EE',
        limeGreen: '#9DE89C',
        yellow: '#FAC12F',
        babyBlue: '#CFE9EF'
    },
  },
  corePlugins:{
    aspectRatio: false
  },
  plugins: [
    require('@tailwindcss/aspect-ratio')
  ],
}
