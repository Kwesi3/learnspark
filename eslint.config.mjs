// Lint the built app script (all src/js files share one global scope, so lint them joined).
import globals from 'globals';
export default [{
  files: ['dist/app.js'],
  languageOptions: {
    ecmaVersion: 2022, sourceType: 'script',
    globals: {
      ...globals.browser,
      NativeSR: 'readonly',
      // set on window by src/js/430-sol-formats.js
      SOL_TYPES: 'readonly', solFormats: 'readonly', solHas: 'readonly', _solParseNum: 'readonly',
      // set on window by src/js/006-error-catcher.js
      ERRLOG: 'readonly', APP_VERSION: 'readonly',
      // optional, always guarded with typeof
      stopAll: 'readonly',
    },
  },
  rules: {
    'no-undef': 'error',            // typo'd or missing names
    'no-dupe-keys': 'error',
    'no-unreachable': 'error',
    'no-self-assign': 'error',
    'no-dupe-else-if': 'error',
    'no-cond-assign': ['error', 'except-parens'],
    'use-isnan': 'error',
    'valid-typeof': 'error',
    'no-unsafe-finally': 'error',
    'no-sparse-arrays': 'error',
  },
}];
