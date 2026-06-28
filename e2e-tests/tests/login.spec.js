import { test, expect } from "@playwright/test";

//use smaller viewport for testing responsive design
test.use({ viewport: { width: 700, height: 600 } });

test("Valid Login", async ({ page }) => {
  await page.goto("http://localhost:5173");

 const loginButton =  await page.locator('button[name="login"]');

   // 3. Get the initial background color BEFORE hovering
  const baseColor = await loginButton.evaluate((element) => {
    return window.getComputedStyle(element).backgroundColor;
  });
  // console.log("Base Background Color:", baseColor);

   // 4. Perform the Hover action
  await loginButton.hover();

  // 5. Get the new background color AFTER hovering
  const hoverColor = await loginButton.evaluate((element) => {
    return window.getComputedStyle(element).backgroundColor;
  });
  // console.log("Hover Background Color:", hoverColor);

  // 6. ASSERT: The background color MUST have changed
  expect(hoverColor).not.toBe(baseColor);

  loginButton.click();

  // console.log(await page.viewportSize().width);
  // console.log(await page.viewportSize().height);



  await page.locator('button[type="submit"]').click();

  // await page.waitForTimeout(5000);

  await expect(page).toHaveURL("http://localhost:5173");

  await page.locator('img[alt="profile"]').hover();

  await page.locator('li[name="logout"]').click();

  await expect(page).toHaveURL("http://localhost:5173");
});
