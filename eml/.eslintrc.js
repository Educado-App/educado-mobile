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
      'env': {
        'node': true,
        'es6': true
      },
      'files': [
        '.eslintrc.{js,cjs}'
      ],
      'parserOptions': {
        'sourceType': 'script'
      }
    }
  ],
  'parserOptions': {
    'ecmaVersion': 'latest',
    'sourceType': 'module'
  },
  'plugins': [
    'react'
  ],
  'ignorePatterns': [
    '**/*.test.js', '**/*.spec.js', '**/*.config.js', 'jestSetup.js'

  ],
  'rules': {
    'indent': [ 'error', 2 ],
  },
  'settings': {
    'react': {
      'version': '16.13.1'
    }
  }
};