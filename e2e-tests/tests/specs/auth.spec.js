import { test, expect } from "@playwright/test";
import { RegisterPage } from "../pages/RegisterPage";
import { LoginPage } from "../pages/LoginPage";
import { SellerLoginPage } from "../pages/SellerLoginPage";
import testData from "../data/credentials.env.json";

test.describe("Authentication Testing Suite", () => {
  const baseUrl = testData.baseUrl;

  // Test for user registration
  test(`Should register user: ${testData.registerUser.email} @register`, async ({
    page,
  }) => {
    const registerPage = new RegisterPage(page);
    await registerPage.navigate(baseUrl);

    const uniqueEmail = testData.registerUser.email.replace(
      "@",
      `_${Date.now()}@`,
    );

    await registerPage.registerUser(
      testData.registerUser.name,
      uniqueEmail,
      testData.registerUser.password,
    );

    // Assert redirection or success state
    await expect(page).toHaveURL(baseUrl);

    const toastMessage = await page.getByText("User registered successfully");

    await expect(toastMessage).toBeVisible();
    await expect(toastMessage).toHaveText("User registered successfully");
    await expect(toastMessage).toBeHidden();
  });

  // Test for user login
  test("Should @login existing user credentials", async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.navigate(baseUrl);

    console.log("email", testData.user.email);
    console.log("password", testData.user.password);

    // Start listening for the login API response BEFORE clicking Login
    const loginResponsePromise = page.waitForResponse((response) =>
      response.url().includes("/api/user/login"),
    );

    // This clicks the Login button
    await loginPage.login(testData.user.email, testData.user.password);

    // Wait for the API response
    const loginResponse = await loginResponsePromise;

    console.log("Status:", loginResponse.status());
    console.log("Body:", await loginResponse.text());

    // Now check whether the page redirected
    await expect(page).toHaveURL(baseUrl);

    const toastMessage = page.getByText("User logged in successfully");
    await expect(toastMessage).toBeVisible();
  });

  test("Should @seller-login seller credentials securely", async ({ page }) => {
    const sellerLoginPage = new SellerLoginPage(page);
    await sellerLoginPage.navigate(baseUrl);
    await sellerLoginPage.login(
      testData.seller.email,
      testData.seller.password,
    );

    // Assert user lands on the seller specific dashboard
    await expect(page).toHaveURL(`${baseUrl}/seller`);
    await expect(page.getByText("Hi! Seller")).toBeVisible();
  });
});

// npx playwright test -g "@seller-login" --headed
