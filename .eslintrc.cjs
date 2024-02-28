module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["airbnb-base"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  rules: {
    semi: ["error", "always"],
    quotes: ["error", "double"],
    "no-console": "off",
    "import/extensions": 0,
    "no-unused-vars": [
      "error",
      { vars: "all", varsIgnorePattern: "^_*$", argsIgnorePattern: "^_*$" },
    ],
    "implicit-arrow-linebreak": 0,
    "linebreak-style": 0,
    "import/no-unresolved": 0,
  },
  overrides: [
    {
      files: ["*.graphql"],
      parser: "@graphql-eslint/eslint-plugin",
      plugins: ["@graphql-eslint"],
      parserOptions: {
        schema: "./schemas/schema.graphql",
      },
    },
  ],
};
