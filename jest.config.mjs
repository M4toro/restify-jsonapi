export default {
  automock: false,
  browser: false,
  clearMocks: true,
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: [
    '/node_modules/',
  ],
  maxWorkers: '50%',
  moduleFileExtensions: [
    'js',
  ],
  roots: [
    'jest',
  ],
  testEnvironment: 'node',
};
