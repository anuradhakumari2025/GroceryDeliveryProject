import { test, expect } from "@playwright/test";

test("Verify Error Msg", async ({ page }) => {
  await page.goto("http://localhost:5173");

  await page.locator('button[name="login"]').click();

  await page.locator('input[name="email"]').fill("test@gmail.com");
  await page.locator('input[name="password"]').fill("tst");

  await page.locator('button[type="submit"]').click();

  const toastMessage =await page.getByText("Invalid credentials");

  await expect(toastMessage).toBeVisible();
  
  await expect(toastMessage).toHaveText("Invalid credentials");
});
