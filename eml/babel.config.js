module.exports = function (api) {
  api.cache(true);
  return {
    presets: [['babel-preset-expo'], ['@babel/preset-env', { loose: true }]],
    plugins: ['nativewind/babel'],
    env: {
      test: {
        plugins: ['@babel/plugin-transform-runtime'],
      },
    }
  };
};
