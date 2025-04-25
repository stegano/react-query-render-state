module.exports = {
  parserOptions: {
    project: "./tsconfig.json",
  },
  plugins: ["prettier", "unused-imports", "react-hooks"],
  extends: [
    "plugin:react/recommended",
    "airbnb",
    "airbnb-typescript",
    "plugin:react/jsx-runtime",
    "plugin:prettier/recommended",
    "plugin:storybook/recommended",
  ],
  rules: {
    "react/prop-types": "off",
    "react/jsx-props-no-spreading": "off",
    "func-names": "off",
    "prettier/prettier": "error",
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": "off",
    "unused-imports/no-unused-imports": "error",
    "unused-imports/no-unused-vars": [
      "warn",
      {
        vars: "all",
        varsIgnorePattern: "^_",
        args: "after-used",
        argsIgnorePattern: "^_",
      },
    ],
    "react-hooks/exhaustive-deps": "warn",
  },
  ignorePatterns: ["references"],
};
