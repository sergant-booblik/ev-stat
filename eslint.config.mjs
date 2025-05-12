/* eslint-env node */
// import { defineFlatConfig } from 'eslint-define-config';
import { defineConfig, globalIgnores } from "eslint/config";
import vue from 'eslint-plugin-vue';
import vueParser from 'vue-eslint-parser';
import tseslint from 'typescript-eslint';
import unusedImports from 'eslint-plugin-unused-imports';

export default defineConfig([
  globalIgnores(['coverage/**', 'dist/**', '*.config.*', 'node_modules/**', 'tailwind.config.ts']),
  {
    files: ['**/*.{js,cjs,mjs,ts,cts,mts,vue}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parser: vueParser,
      parserOptions: {
        parser: tseslint.parser,
        project: './tsconfig.app.json',
        extraFileExtensions: ['.vue'],
      },
    },
    plugins: {
      vue,
      '@typescript-eslint': tseslint.plugin,
      'unused-imports': unusedImports,
    },
    rules: {
      // Общие
      'quotes': ['error', 'single'],
      'object-curly-spacing': ['error', 'always'],
      'comma-dangle': ['error', 'always-multiline'],
      'semi': ['error', 'always'],

      // Vue
      'vue/singleline-html-element-content-newline': ['error', {
        ignoreWhenNoAttributes: true,
        ignoreWhenEmpty: true,
        ignores: ['pre', 'textarea'],
      }],
      'vue/require-default-prop': 'off',
      'vue/multi-word-component-names': 'off',
      'vue/return-in-computed-property': 'off',
      'vue/html-self-closing': ['error', {
        'html': {
          'void': 'always',
          'normal': 'always',
        },
      }],

      // TS
      'unused-imports/no-unused-imports': 'error',
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/explicit-module-boundary-types': ['error'],
      '@typescript-eslint/explicit-function-return-type': ['warn', {
        allowExpressions: true,
        allowTypedFunctionExpressions: true,
      }],

      // Import restrictions
      'no-restricted-imports': ['warn', {
        paths: [
          {
            name: '@/store',
            message: 'Specify import store module. Do not import whole store',
          },
          {
            name: '@/utils',
            message: 'Specify import util. Do not import whole util',
          },
        ],
        patterns: ['../*'],
      }],

      // Clean code
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-debugger': 'warn',
      'no-alert': 'error',
    },
  },
  // Overrides
  {
    files: ['tests/**/*.test.ts'],
    rules: {
      '@typescript-eslint/explicit-function-return-type': 'off',
      'no-restricted-imports': 'off',
    },
  },
]);
