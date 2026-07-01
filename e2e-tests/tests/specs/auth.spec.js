import { test, expect } from "@playwright/test";
import { RegisterPage } from "../pages/RegisterPage";
import { LoginPage } from "../pages/LoginPage";
import { SellerLoginPage } from "../pages/SellerLoginPage";
import testData from "../data/credentials.env.json";

test.describe("Authentication Testing Suite", () => {
  const baseUrl = testData.baseUrl;

  // Loop through each user dataset dynamically
  testData.registrationUsers.forEach((user) => {
    test(`Should register user: ${user.email} @register`, async ({ page }) => {
      const registerPage = new RegisterPage(page);
      await registerPage.navigate(baseUrl);

      const uniqueEmail = user.email.replace("@", `_${Date.now()}@`);

      await registerPage.registerUser(user.name, uniqueEmail, user.password);

      // Assert redirection or success state
      await expect(page).toHaveURL(baseUrl);

      const toastMessage = await page.getByText("User registered successfully");

      await expect(toastMessage).toBeVisible();
      await expect(toastMessage).toHaveText("User registered successfully");
      await expect(toastMessage).toBeHidden();
    });
  });

  test("Should @login existing user credentials", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate(baseUrl);
    await loginPage.login(testData.user.email, testData.user.password);

    // Validate dashboard state
    await expect(page).toHaveURL(baseUrl);

    const toastMessage = await page.getByText("User logged in successfully");

    await expect(toastMessage).toBeVisible();
    await expect(toastMessage).toHaveText("User logged in successfully");
    await expect(toastMessage).toBeHidden();
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
