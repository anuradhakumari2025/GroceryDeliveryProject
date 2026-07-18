import { test, expect } from "@playwright/test";
import testData from "../data/credentials.env.json";
import { OrdersPage } from "../pages/OrdersPage";

const { baseUrl } = testData;

test.use({ storageState: "playwright/.auth/user.json" });

test("Check @orders page", async ({ page }) => {
  const ordersPage = new OrdersPage(page);

  await page.goto(baseUrl);

  await ordersPage.hoverProfileImg();

  await ordersPage.clickOrderButton();

  await expect(page).toHaveURL(`${baseUrl}/my-orders`);
});
