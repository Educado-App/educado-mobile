module.exports = function (api) {
  api.cache(true);
  return {
    presets: [['babel-preset-expo'], ['@babel/preset-env', { loose: true }]],
    plugins: [
      "nativewind/babel",
      [
        'module:react-native-dotenv',
        {
          moduleName: '@env',
          path: 'config/.env',
          blacklist: null,
          whitelist: null,
          safe: false,
          allowUndefined: false
        }
      ]
    ],

    env: {
      test: {
        plugins: ["@babel/plugin-transform-runtime"],
      },
    }
  };
};
