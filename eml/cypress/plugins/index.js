const startServerAndTest = require('start-server-and-test');

module.exports = (on, config) => {
  on('before:browser:launch', (browser, launchOptions) => {
    if (browser.family === 'chromium') {
      launchOptions.args.push('--disable-dev-shm-usage');
    }

    return launchOptions;
  });

  on('task', {
    startServerAndTest({ command, port }) {
      return new Promise((resolve, reject) => {
        const server = startServerAndTest(
          command,
          `http://localhost:${port}`,
          'ping',
          {
            env: {
              NODE_ENV: 'test',
            },
          },
          {
            timeout: 30000,
            retries: 2,
          },
          (err) => {
            if (err) {
              reject(err);
            } else {
              resolve();
            }
          }
        );

        server.stdout.pipe(process.stdout);
        server.stderr.pipe(process.stderr);
      });
    },
  });

  return {
    ...config,
    fixturesFolder: 'cypress/fixtures',
    integrationFolder: 'cypress/integration',
    screenshotsFolder: 'cypress/screenshots',
    videosFolder: 'cypress/videos',
    supportFile: 'cypress/support/index.js',
  };
};