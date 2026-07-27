export default {
  testEnvironment: "node",

  roots: ["<rootDir>/src/tests"],

  testMatch: ["**/*.test.js"],

  setupFilesAfterEnv: ["<rootDir>/src/tests/setup.js"],

  collectCoverageFrom: [
    "src/controllers/**/*.js",
    "src/routes/**/*.js",
  ],

  verbose: true,

  detectOpenHandles: true,

  clearMocks: true,
};