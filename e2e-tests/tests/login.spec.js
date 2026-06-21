import { test, expect } from "@playwright/test";

test("Valid Login", async ({ page }) => {
  await page.goto("http://localhost:5173");

  await page.locator('button[name="login"]').click();

  await page
    .locator('input[name="email"]')
    .type("test@gmail.com", { delay: 100 });
  await page.locator('input[name="password"]').type("test", { delay: 100 });

  await page.locator('button[type="submit"]').click();

  // await page.waitForTimeout(5000);

  await expect(page).toHaveURL("http://localhost:5173");

  await page.locator('img[alt="profile"]').hover();

  await page.locator('li[name="logout"]').click();

  await expect(page).toHaveURL("http://localhost:5173");
});
