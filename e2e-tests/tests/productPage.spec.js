import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto("http://localhost:5173/");
  await page.getByRole("button", { name: "Login" }).click();

  await page.locator('input[name="email"]').fill("test@gmail.com");
  await page.locator('input[name="password"]').fill("test");

  await page.locator('button[type="submit"]').click();

  await page.getByRole("link", { name: "All Products" }).click();
});
