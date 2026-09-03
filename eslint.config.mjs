import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

if (nextVitals[0]?.rules) {
  nextVitals[0].rules["react-hooks/set-state-in-effect"] = "warn";
  nextVitals[0].rules["react-hooks/immutability"] = "warn";
}

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
    "src/generated/**",
    "ecosystem.config.cjs",
    "scripts/*.cjs",
  ]),
]);

export default eslintConfig;
