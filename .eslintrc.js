module.exports = {
  root: true,
  extends: ['@react-native', 'prettier'],
  rules: {
    '@typescript-eslint/no-shadow': 'off',
    'react/no-unstable-nested-components': 'off',
    'react/react-in-jsx-scope': 'off',
    'react-native/no-inline-styles': 'off',
    'react-hooks/exhaustive-deps': 'off',
    'prettier/prettier': ['error', { printWidth: 120 }]
  }
}
