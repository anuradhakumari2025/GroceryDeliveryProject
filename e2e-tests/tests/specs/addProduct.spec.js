import { test, expect } from "@playwright/test";
import testData from "../data/credentials.env.json";
import productData from "../data/products.json";
import path from "path";

// Test file to use the logged-in seller cookies
test.use({ storageState: "playwright/.auth/seller.json" });

test("Should successfully @add-product", async ({ page }) => {
  const product = productData.newProduct;

  await page.goto(`${testData.baseUrl}/seller`);

  const guavaImagePath = path.resolve(__dirname, "../../assets/lotus.jfif");

  await page.locator("#image0").setInputFiles(guavaImagePath);

  await page.locator("#product-name").fill(product.name);

  await page.locator("#product-price").fill(product.price.toString());

  await page.locator("#product-offerPrice").fill(product.offerPrice.toString());

  await page.locator("#product-description").fill(product.description);

  await page
    .locator("#product-category")
    .selectOption({ label: product.category });

  await page.locator('button[type="submit"]').click();

  const loader = page.locator(".animate-spin").first();

  await expect(loader).toBeVisible();
  await expect(loader).toBeHidden();

  const toastMessage = await page.getByText("Product added successfully");

  await expect(toastMessage).toBeVisible();

  await expect(toastMessage).toBeHidden();
});
