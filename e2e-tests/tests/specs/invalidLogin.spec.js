// e2e-tests/tests/specs/login-invalid.spec.js
const { test, expect } = require("@playwright/test");
const { LoginPage } = require("../pages/LoginPage"); // 👈 Adjust if your login POM file name is different
const testData = require("../data/credentials.env.json");

test.describe("Authentication - Negative Login Testing Suite", () => {
  const baseUrl = testData.baseUrl;

  // Loop through an array of invalid users from your test data file
  testData.invalidLoginUsers.forEach((user) => {
    test(`Should show error for: ${user.description}`, async ({ page }) => {
      const loginPage = new LoginPage(page);
      await loginPage.navigate(baseUrl);

      // 1. Attempt login with bad credentials using your existing POM method
      await loginPage.login(user.email, user.password);

      // 2. Assert that the error toast or text appears correctly
      const toastMessage = page.getByText(user.expectedError);
      await expect(toastMessage).toBeVisible();
      await toastMessage.waitFor({ state: 'hidden' });
    });
  });
});
