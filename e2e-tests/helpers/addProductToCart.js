import { expect } from "@playwright/test";
import { CartPage } from "../tests/pages/CartPage.js";

export async function addProductToCart(page, productName) {
  const cartPage = new CartPage(page);

  await cartPage.clickProductImage(productName);

  await expect(page).toHaveURL(/product/);

  await cartPage.addToCart();

  await expect(page.getByText("Item added to cart")).toBeVisible();
}
