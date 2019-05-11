module.exports = {
  parserOptions: {
    ecmaFeatures: {
      legacyDecorators: true,
    },
  },
  extends: 'eslint-config-zcool',
  rules: {
    'react/jsx-filename-extension': 0,
    'object-curly-spacing': ['error', 'always'],
    'lines-between-class-members': [
      'error',
      'always',
      { exceptAfterSingleLine: true },
    ],
    'import/newline-after-import': ['error', { count: 1 }],
  },
  settings: {
    react: {
      version: '16.8.6', // React version, default to the latest React stable release
    },
  },
}
