module.exports = {
  env: {
    node: false,
    browser: true,
    es6: true,
  },
  parserOptions: {
    sourceType: "module",
  },
  plugins: ["prettier"],
  extends: [
    "plugin:prettier/recommended",
    "eslint:recommended",
    "plugin:react/recommended",
  ],
};
