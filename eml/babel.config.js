module.exports = function (api) {
  api.cache(true);
  return {
    presets: [['babel-preset-expo'], ['@babel/preset-env', { loose: true }]],
    plugins: [
      "nativewind/babel",
      "react-native-reanimated/plugin",
      ['module:react-native-dotenv', {
        moduleName: '@env',
        path: '.env',
      }],
    ],
    env: {
      test: {
        plugins: ["@babel/plugin-transform-runtime"],
      },
    }
  };
};