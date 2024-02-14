module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["airbnb-base"],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": [
      "error",
      {
        bracketSpacing: true,
        tabWidth: 2,
        printWidth: 80,
        useTabs: false,
        endOfLine: "auto",
        semi: true,
      },
    ],
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
