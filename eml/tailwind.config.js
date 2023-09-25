/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./screens/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
      colors: {
        // gradient background found in BgLinearGradient.js
        primary: '#5ECCE9',
        secondary: '#C9E5EC',
        white: '#FFFFFF',
        black: '#383838',
        gray: '#A1ACB2',
        error: '#CF6679',
        success: '#00897B',
        disable: '#4AA04A',
        disabled: '#E4F2F5',
        red: '#FFE4E4',
        green: '#E4F1E4',
      },
      fontFamily: {
        "montserrat": 'Montserrat-Regular',
        "montserrat-bold": 'Montserrat-Bold',
      },
      extend: {
        fontSize: {
          heading: 32,
          subheading: 24,
          body: 16,
          'caption-medium': 12,
          'caption-small': 10,
        },
        borderRadius: {
          small: 4,
          medium: 8,
          large: 16,
        }
    },
  },
  exports: {
    tailwind: './tailwind.config.js'
  },
  corePlugins: {
    aspectRatio: false
  },
  plugins: [
    require('@tailwindcss/aspect-ratio')
  ],
}
