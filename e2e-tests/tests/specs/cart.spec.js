import { test, expect } from "@playwright/test";
import { CartPage } from "../pages/CartPage";
import testData from "../data/credentials.env.json";
import productData from "../data/products.json";

const { baseUrl } = testData;

test.use({ storageState: "playwright/.auth/user.json" });

test("Click on a dynamic database product and navigate to @cart page", async ({
  page,
}) => {
  const cartPage = new CartPage(page);

  // Navigate to your store page
  await page.goto(`${baseUrl}`);

  await page.waitForTimeout(2000);

  // Pass the dynamic alt text to the click action
  await cartPage.clickProductImage(productData.fruits.name);

  await expect(page).toHaveURL(/product/);

  await expect(
    page.getByRole("heading", {
      level: 1,
      name: productData.fruits.name,
    }),
  ).toBeVisible();

  await cartPage.addToCart();

  const toastMessage = page.getByText("Item added to cart");
  await expect(toastMessage).toBeVisible();

  await cartPage.clickCartButton();

  await cartPage.openCart(baseUrl);
  await expect(page).toHaveURL(`${baseUrl}/cart`);

  await cartPage.verifyProductInCart(productData.fruits.name);
});
