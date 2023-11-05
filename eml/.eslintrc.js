module.exports = {
  'env': {
    'browser': true,
    'es2021': true,
    'node': true,
  },
  'extends': [
    'eslint:recommended',
    'plugin:react/recommended'
  ],
  'overrides': [
    {
      'files': [
        '**/*.js', // Include .js files
        '.eslintrc.{js,cjs}',
      ],
      'parserOptions': {
        'sourceType': 'module'
      }
    },
    {
      'files': [
        '**/*.jsx', // Include .jsx files
      ],
      'parser': '@babel/eslint-parser', // Specify the parser
      'parserOptions': {
        'ecmaFeatures': {
          'jsx': true,
        },
        'sourceType': 'module'
      }
    }
  ],
  'plugins': [
    'react'
  ],
  'ignorePatterns': [
    '**/*.test.js', '**/*.test.jsX', '**/*.spec.js', '**/*.spec.jsx',  '**/*.config.js', 'jestSetup.js',
  ],
  'rules': {
    'indent': ['error', 2],
  },
  'settings': {
    'react': {
      'version': '16.13.1'
    }
  }
};
