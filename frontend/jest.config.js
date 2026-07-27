export default {
  testEnvironment: "jsdom",

  setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"],

  transform: {
    "^.+\\.(js|jsx)$": "babel-jest",
  },

  moduleFileExtensions: ["js", "jsx"],

  moduleNameMapper: {
    "\\.(css|scss)$": "identity-obj-proxy",
  },

  testMatch: ["**/src/tests/**/*.test.jsx"],

  clearMocks: true,
};