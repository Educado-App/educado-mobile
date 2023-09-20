module.exports = function (api) {
  api.cache(true);
  return {
    presets: [['babel-preset-expo'], ['@babel/preset-env', { loose: true }]],
    plugins: ["nativewind/babel"],
    env: {
      test: {
        plugins: ["@babel/plugin-transform-runtime"],
      },
    }
  };
};
module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['module:metro-react-native-babel-preset'],
    plugins: [
      [
        'module:react-native-dotenv',
        {
          moduleName: 'react-native-dotenv',
        },
      ],
    ],
  };
};