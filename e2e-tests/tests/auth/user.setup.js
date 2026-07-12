import { test as setup, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import testData from "../data/credentials.env.json";

const authFile = "playwright/.auth/user.json";

setup("Authenticate @user-session", async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.navigate(testData.baseUrl);

  await loginPage.login(
    testData.user.email,
    testData.user.password
  );

  // Wait until login completes
  await expect(page).toHaveURL(testData.baseUrl);

  await page.context().storageState({
    path: authFile,
  });
});

//   // "user": {
  //   "name": "Vasim",
  //   "email": "vasim_1783100939695@gmail.com",
  //   "password": "vasim"
  // },
