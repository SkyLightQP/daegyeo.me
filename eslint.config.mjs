import { defineConfig, globalIgnores } from 'eslint/config';
import { fixupConfigRules } from '@eslint/compat';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import prettier from 'eslint-config-prettier/flat';
export default defineConfig([
  ...fixupConfigRules(nextVitals),
  ...fixupConfigRules(nextTs),
  {
    rules: {
      'import/prefer-default-export': 'off',
      'no-console': 'error',
    },
  },
  prettier,
  globalIgnores(['.next/**', 'out/**', 'build/**', 'dist/**', 'node_modules/**']),
]);
