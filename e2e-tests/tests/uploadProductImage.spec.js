import { test, expect } from "@playwright/test";

test("Add Product Image Upload", async ({ page }) => {
  await page.goto("http://localhost:5173/seller");

  await page.locator('input[type="email"]').fill("admin@gmail.com");
  await page.locator('input[type="password"]').fill("admin123");
  await page.locator('button[type="submit"]').click();

  await expect(page).toHaveURL("http://localhost:5173/seller");

  const fileInput = await page.locator("#image0");

  await fileInput.setInputFiles("/Users/Anuradha/Downloads/butterfly.jfif");

    // 3. Find the sibling img element within the same label container
  const uploadedImagePreview = page.locator('label[for="image0"] img[name="product-image"]');

  // 4. Assert that the src attribute has changed to a local blob URL
  await expect(uploadedImagePreview).toHaveAttribute('src', /^blob:/);
  await page.waitForTimeout(2000); // Wait for 2 seconds to observe the change
});
