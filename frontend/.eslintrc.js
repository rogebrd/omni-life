module.exports = {
  env: {
    node: true,
    es6: true,
  },
  parserOptions: {
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    'prettier/prettier': ['error', { singleQuote: true }],
  },
  plugins: ['prettier'],
  extends: ['plugin:prettier/recommended'],
};
