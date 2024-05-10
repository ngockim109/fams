module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "airbnb",
    "airbnb-typescript",
    "airbnb/hooks",
    "plugin:jsx-a11y/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "prettier",
    "plugin:jest-dom/recommended",
    "plugin:testing-library/react",
    "plugin:testing-library/dom",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: ["./tsconfig.json"],
  },
  plugins: [
    "react-refresh",
    "react",
    "@typescript-eslint",
    "prettier",
    "jest-dom",
  ],
  overrides: [
    {
      // Enable eslint-plugin-testing-library rules or preset only for matching testing-library files!
      files: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)"],
      extends: ["plugin:testing-library/react"],
    },
    // Enable eslint-plugin-testing-library rules or preset only for matching cypress testing files!
    {
      files: ["cypress/**/*.ts", "cypress.config.ts"],
      parserOptions: {
        project: "./cypress/tsconfig.json",
      },
    },
  ],
  rules: {
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    "prettier/prettier": "error",
    "react/react-in-jsx-scope": 0,
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "react/function-component-definition": [
      "error",
      { namedComponents: "arrow-function" },
    ],
    "jest-dom/prefer-checked": "error",
    "jest-dom/prefer-enabled-disabled": "error",
    "jest-dom/prefer-required": "error",
    "jest-dom/prefer-to-have-attribute": "error",
    "testing-library/await-async-queries": "error",
    "testing-library/no-await-sync-queries": "error",
    "testing-library/no-debugging-utils": "warn",
    "testing-library/no-dom-import": "off",
    "no-unused-expressions": "off",
    "@typescript-eslint/no-unused-expressions": "off",

    //tmp no console
    "no-console": "off",
    "no-restricted-syntax": [
      "error",
      {
        selector:
          "CallExpression[callee.object.name='console'][callee.property.name!=/^(log|warn|error|info|trace)$/]",
        message: "Unexpected property on console object was called",
      },
    ],
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
