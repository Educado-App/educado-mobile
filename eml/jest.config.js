/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'jest-expo',
  testEnvironment: 'node',
  transform: {
    '^.+\\.ts?$': 'ts-jest',
    "^.+\\.(js|jsx)$": "babel-jest",
  }, moduleFileExtensions: [
    'ts',
    'tsx',
    'js',
    'jsx',
    'json',
    'node',
  ],
  setupFiles: [
    "./jestSetup.js"
  ],
  transformIgnorePatterns: ["node_modules/?!(@expo-google-fonts|expo_font)"],
  globals: {
    "__DEV__": true
  },
  moduleNameMapper: {
    "expo-font": require.resolve('expo-font'),
  }
};