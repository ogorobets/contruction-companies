module.exports = {
  parser: 'babel-eslint',
  env: {
    es6: true,
    node: true,
    browser: true,
    commonjs: true
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  settings: {
    react: {
      version: 'detect'
    }
  },
  plugins: [],
  extends: ['eslint:recommended', 'plugin:prettier/recommended'],
  rules: {
    'linebreak-style': ['error', 'unix']
  }
};
