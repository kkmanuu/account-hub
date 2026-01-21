import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";

import tseslint from "typescript-eslint";

// Export ESLint flat configuration
export default tseslint.config(
  // Ignore the build output directory
  { ignores: ["dist"] },

  {
    // Extend recommended ESLint and TypeScript rules
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
    ],

    // Apply this configuration only to TypeScript files
    files: ["**/*.{ts,tsx}"],

    // Define language options
    languageOptions: {
      // Use ECMAScript 2020 features
      ecmaVersion: 2020,

      // Enable browser global variables (window, document, etc.)
      globals: globals.browser,
    },

    // Register ESLint plugins
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },

    // Define custom rules
    rules: {
      // Enable recommended React Hooks rules
      ...reactHooks.configs.recommended.rules,

      // Warn if React components are not properly exported
      // (required for React Fast Refresh to work correctly)
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],

      // Disable unused variables rule for TypeScript
      "@typescript-eslint/no-unused-vars": "off",
    },
  }
);
