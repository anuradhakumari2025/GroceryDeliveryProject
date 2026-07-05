import { test as setup, expect } from "@playwright/test";
import { SellerLoginPage } from "../pages/SellerLoginPage";
import testData from "../data/credentials.env.json";

// Define where the authenticated session cookie/storage file will live
const sellerAuthFile = "playwright/.auth/seller.json";

setup("Authenticate @seller-session", async ({ page }) => {
  const baseUrl = testData.baseUrl;
  const sellerLoginPage = new SellerLoginPage(page);
  
  await sellerLoginPage.navigate(baseUrl);
  await sellerLoginPage.login(
    testData.seller.email,
    testData.seller.password
  );

  // Validate successful login before saving state
  await expect(page).toHaveURL(`${baseUrl}/seller`);
  await expect(page.getByText('Hi! Seller')).toBeVisible();

  // Save cookies and storage state to the JSON file
  await page.context().storageState({ path: sellerAuthFile });
});
