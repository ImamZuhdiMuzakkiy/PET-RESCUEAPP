import js from "@eslint/js";
import globals from "globals";
import prettier from "eslint-config-prettier";

/** type {import('eslint).Linter.Config[]} */
export default [
  js.configs.recommended,
  {
    ...reactPlugin.configs.flat.recommended,
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  {
    files: ["**/*.js", "**/*.jsx"],
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      rules: {
        "react/no-unescaped-entities": "off",
        "react/prop-types": "off",
      }
    },
  },
  prettier,
];
