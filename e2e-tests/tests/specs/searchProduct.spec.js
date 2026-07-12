import { test } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import testData from "../data/credentials.env.json";
import productData from "../data/products.json";

// Already logged in
test.use({
  storageState: "playwright/.auth/user.json",
});

test.describe("Search Product Suite", () => {
  test("Should @search-product successfully", async ({ page }) => {
    const homePage = new HomePage(page);

    await page.goto(testData.baseUrl);

    await homePage.searchProduct(productData.fruits.name);

    await homePage.verifyProductVisible(productData.fruits.name);
  });
});
