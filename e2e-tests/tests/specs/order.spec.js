import { test, expect } from "@playwright/test";
import { OrdersPage } from "../pages/OrdersPage";
import { placeOrder } from "../../helpers/placeOrder";
import productData from "../data/products.json";
import testData from "../data/credentials.env.json";

const { baseUrl } = testData;

test.use({ storageState: "playwright/.auth/user.json" });

test("Verify product appears in My @orders", async ({ page }) => {
  await placeOrder(page, baseUrl, productData.fruits.name);
  await expect(page).toHaveURL(`${baseUrl}/my-orders`);

  const ordersPage = new OrdersPage(page);

  await page.goto(baseUrl);

  await ordersPage.hoverProfileImg();

  await ordersPage.clickOrderButton();
  await expect(page).toHaveURL(`${baseUrl}/my-orders`);

  await expect(page.getByText(productData.fruits.name)).toBeVisible();
});
