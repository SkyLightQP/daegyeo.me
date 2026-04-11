import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import prettier from 'eslint-config-prettier/flat';
import importPlugin from 'eslint-plugin-import';

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      'import/prefer-default-export': 'off',
      'no-console': 'error',
    },
    plugins: {
      import: importPlugin,
    },
  },
  prettier,
  globalIgnores(['.next/**', 'out/**', 'build/**', 'dist/**', 'node_modules/**']),
]);
