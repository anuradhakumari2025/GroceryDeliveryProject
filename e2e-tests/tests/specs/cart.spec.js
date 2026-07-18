import { test, expect } from "@playwright/test";
import { CartPage } from "../pages/CartPage";
import testData from "../data/credentials.env.json";
import productData from "../data/products.json";
import { addProductToCart } from "../../helpers/addProductToCart.js";

const { baseUrl } = testData;

test.use({ storageState: "playwright/.auth/user.json" });

test("Click on a dynamic database product and navigate to @cart page", async ({
  page,
}) => {
  const cartPage = new CartPage(page);

  await page.goto(baseUrl);

  await addProductToCart(page,productData.fruits.name);

  await cartPage.clickCartButton();
  await cartPage.openCart(baseUrl);

  await expect(page).toHaveURL(`${baseUrl}/cart`);
  await cartPage.verifyProductInCart(productData.fruits.name);
});
