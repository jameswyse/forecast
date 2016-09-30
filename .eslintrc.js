module.exports = {
  root: true,
  extends: [
    'eslint:recommended'
  ],
  plugins: [],
  settings: {
    react: {}
  },
  env: {
    es6: false,
    browser: false,
    node: true
  },
  parserOptions: {
    ecmaVersion: 5,
    sourceType: 'commonjs',
    ecmaFeatures: {
      jsx: false,
      impliedStrict: true,
      experimentalObjectRestSpread: true
    }
  },
  rules: {
    'strict': 0,
    'no-console': 0,
    'comma-dangle': [1, 'only-multiline'],
    'no-undef': 0,
    'brace-style': [2, '1tbs'],
    'eqeqeq': [2, 'smart'],
    'indent': [2, 2, {
      'VariableDeclarator': 2,
      'SwitchCase': 1
    }],
    'key-spacing': [1, {
      'beforeColon': false
    }],
    'keyword-spacing': ["error",
      {
        "before": true,
        "after": true
     }
   ],
    'no-multi-spaces': [2, {
      'exceptions': {
        'VariableDeclarator': true
      }
    }],
    'no-multiple-empty-lines': [2, {
      'max': 2
    }],
    'space-before-function-paren': [2, {
      'anonymous': 'always',
      'named': 'always'
    }],
    'spaced-comment': [2, 'always', {
      'exceptions': ['-']
    }],
    'wrap-iife': [2, 'inside'],
    'no-extra-semi': [2],
    'semi-spacing': [2, {
      'before': false,
      'after': true
    }],
  }
};
