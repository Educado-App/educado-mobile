/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./screens/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#5ECCE9',
        secondary: '#C9E5EC',
        globalBlack: '#383838',
        globalWhite: '#FFFFFF',
        globalGrey: '#A1ACB2',
        warningError: '#CF6679',
        warningSuccess: '#00897B',
        warningDisable: '#4AA04A',
        bgDisabled: '#E4F2F5',
        bgRed: '#FFE4E4',
        bgGreen: '#E4F1E4'
      },
    },

    corePlugins: {
      aspectRatio: false
    },
    plugins: [
      require('@tailwindcss/aspect-ratio')
    ],
  }
}