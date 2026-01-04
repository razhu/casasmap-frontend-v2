import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Ignore generated files
    "src/lib/graphql/generated.ts",
    "scripts/**",
  ]),
  {
    rules: {
      // Allow any types in some cases (generated code, error handling)
      "@typescript-eslint/no-explicit-any": "off",
      // Allow unused vars with underscore prefix
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      // Allow setState in effects (common React pattern)
      "react-hooks/set-state-in-effect": "off",
      // Allow incompatible libraries (React Hook Form)
      "react-hooks/incompatible-library": "off",
      // Allow unescaped entities
      "react/no-unescaped-entities": "off",
    },
  },
]);

export default eslintConfig;
