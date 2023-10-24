import { defineConfig } from 'cypress'

export default defineConfig({
  viewportWidth: 375,
  viewportHeight: 667,
  video: false,
  chromeWebSecurity: false,
  e2e: {
    baseUrl: 'http://localhost:8888',
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.js')(on, config)
    },
    specPattern: '**/*.+(spec|test).[jt]s',
    excludeSpecPattern: '**/*.+(spec|test).[jt]s',
  },
})
