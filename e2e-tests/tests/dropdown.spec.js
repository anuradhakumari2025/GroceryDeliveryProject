import { test, expect } from "@playwright/test";

test("Selecting option from dropdown", async ({ page }) => {
  await page.goto("http://localhost:5173/test");
  await page.locator('select[name="state"]').selectOption({ label: "Goa" }); //prefer label first

  await page.waitForTimeout(2000);

  await page.locator("select[name='state']").selectOption({ index: 4 });

  const value = await page.locator("select[name='state']").textContent();
  console.log("All values in dropdown are: ", value);

  await page.waitForTimeout(3000);

  const state = await page.$("select[name='state']");
  const allElements = await state.$$("option");

  // for (const element of allElements) {
  //   const text = await element.textContent();
  //   console.log("Dropdown values are: ", text);
  // }

  await page.locator("select[name='hobbies']").selectOption(["Reading", "Singing"]);
  await page.waitForTimeout(3000);
});
