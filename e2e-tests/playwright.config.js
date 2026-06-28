// @ts-check
import { defineConfig, devices } from "@playwright/test";

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: "./tests",
  /* Global timeout for the whole test run configuration */
  timeout: 60 * 1000, 
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: "html",
  
  /* Shared settings for all the projects below. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: 'http://localhost:5173',
    /* Collect trace when retrying the failed test. */
    trace: "on-first-retry",
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 1366, height: 768 },
      },
    },
  ],

  /* Multi-webserver setup for full-stack testing */
  webServer: [
    {
      command: 'node server.js', 
      cwd: '../backend', 
      url: 'http://localhost:4000',
      reuseExistingServer: !process.env.CI,
      timeout: 120 * 1000, 
    },
    {
      command: 'npm run dev', 
      cwd: '../frontend',
      url: 'http://localhost:5173', 
      reuseExistingServer: !process.env.CI,
    }
  ],
});


