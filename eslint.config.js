import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,

      // Disable or relax rules to allow anything
      'react-refresh/only-export-components': 'off', // Allow all exports
      '@typescript-eslint/no-explicit-any': 'off', // Allow `any` type
      '@typescript-eslint/explicit-module-boundary-types': 'off', // No need to define return types
      'no-unused-vars': 'off', // Allow unused variables
      'no-console': 'off', // Allow console logs
      'react-hooks/rules-of-hooks': 'warn', // Keep hooks rules but non-blocking
      'react-hooks/exhaustive-deps': 'warn', // Keep dependency array checks but not strict
    },
  },
)
