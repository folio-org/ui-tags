// eslint-disable-next-line import/no-extraneous-dependencies
const path = require('path');

const esModules = ['@folio'].join('|');

module.exports = {
  collectCoverageFrom: [
    '**/(lib|src)/**/*.{js,jsx}',
    '!**/node_modules/**',
    '!**/test/jest/**',
  ],
  coverageDirectory: './artifacts/coverage-jest/',
  coverageReporters: ['lcov', 'text'],
  reporters: ['jest-junit', 'default'],
  transform: { '^.+\\.(js|jsx)$': path.join(__dirname, './test/jest/jest-transformer.js') },
  transformIgnorePatterns: [`/node_modules/(?!${esModules})`],
  moduleNameMapper: {
    '^.+\\.(css)$': 'identity-obj-proxy',
    '^.+\\.(svg)$': 'identity-obj-proxy',
    'ky': 'ky/umd',
  },
  testEnvironment: 'jsdom',
  testMatch: ['**/settings/?(*.)test.{js,jsx}'],
  testPathIgnorePatterns: ['/node_modules/'],
  setupFiles: [path.join(__dirname, './test/jest/setup-tests.js')],
  setupFilesAfterEnv: [path.join(__dirname, './test/jest/jest.setup.js')],
};
