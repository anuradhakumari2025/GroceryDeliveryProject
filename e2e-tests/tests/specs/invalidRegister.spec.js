const { test, expect } = require("@playwright/test");
const { RegisterPage } = require("../pages/RegisterPage"); 
const testData = require("../data/credentials.env.json");
// const { MongoClient } = require('mongodb');

test.describe("Authentication - Negative Registration Testing Suite", () => {
  const baseUrl = testData.baseUrl;

  // Loop through each invalid registration scenario dynamically
  testData.invalidRegisterUsers.forEach((user) => {
    // Dynamic naming so your GitHub Action reports are crystal clear
    test(`Register Negative Test - Should block registration for: ${user.description}`, async ({
      page,
    }) => {
      const registerPage = new RegisterPage(page);

      // Navigate to the registration page
      await registerPage.navigate(baseUrl);

      // 1. Fill out form using your existing Register Page Object Model method
      await registerPage.registerUser(
        user.name,
        user.email,
        user.password,
      );

      // 2. Assert that the specific error message is visible on the screen
      const errorMessage = page.getByText(user.expectedError);
      await expect(errorMessage).toBeVisible();
    });
  });
});
