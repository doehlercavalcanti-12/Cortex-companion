module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'standard',
    'plugin:react/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:security/recommended'
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  plugins: ['react', 'jsx-a11y', 'security'],
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.jsx'] }],
    'react/react-in-jsx-scope': 'off',
    'security/detect-object-injection': 'off'
  },
  overrides: [
    {
      files: ['**/__tests__/**/*', '**/*.test.jsx'],
      env: {
        jest: true,
      },
    },
  ],
};
