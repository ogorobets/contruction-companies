module.exports = {
  parser: '@typescript-eslint/parser',
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
  root: true,
  plugins: ['@typescript-eslint', 'react', 'react-hooks'],
  extends: [
    'eslint:recommended',
    //'plugin:@typescript-eslint/eslint-recommended',
    //'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended'
  ],
  rules: {
    'linebreak-style': ['error', 'unix'],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'no-unused-vars': 'off',
    'no-debugger': 'off',
    'react/prop-types': 0
  }
};
