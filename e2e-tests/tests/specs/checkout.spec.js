import { test, expect } from "@playwright/test";

test.use({
    storageState: "playwright/.auth/user.json"
});

test("Checkout Flow", async ({ page }) => {

    await page.goto("http://localhost:5173");

    // Already logged in

});