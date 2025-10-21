const baseConfig = require('./jest.config.cjs');

module.exports = {
  ...baseConfig,
  testMatch: ['**/tests/unit/**/*.spec.ts'],
};
