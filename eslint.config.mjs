import pluginCypress from 'eslint-plugin-cypress';
import js from '@eslint/js';

export default [
  js.configs.recommended,
  {
    files: ['cypress/**/*.js'],
    plugins: {
      cypress: pluginCypress
    },
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        cy: 'readonly',
        Cypress: 'readonly',
        describe: 'readonly',
        context: 'readonly',
        it: 'readonly',
        expect: 'readonly',
        before: 'readonly',
        beforeEach: 'readonly',
        after: 'readonly',
        afterEach: 'readonly',
        require: 'readonly',
        module: 'readonly'
      }
    },
    rules: {

      ...pluginCypress.configs.recommended.rules,

      'cypress/no-assigning-return-values': 'error',
      'cypress/no-unnecessary-waiting': 'error',
      'cypress/assertion-before-screenshot': 'warn',
      'cypress/no-force': 'warn',
      'no-unused-vars': 'warn',
      'no-console': 'warn'
    }
  }
];