const baseConfig = require('./jest.config.cjs');

module.exports = {
  ...baseConfig,
  testMatch: ['**/tests/integration/**/*.spec.ts'],
  setupFilesAfterEnv: ['<rootDir>/tests/integration/setup.ts'],
};
