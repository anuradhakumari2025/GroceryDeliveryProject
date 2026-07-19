import { expect } from "@playwright/test";
import { CheckoutPage } from "../tests/pages/CheckoutPage";
import { addProductToCart } from "./addProductToCart";

const address = {
  firstName: "John",
  lastName: "Doe",
  email: "john@gmail.com",
  street: "123 Main St",
  city: "New York",
  state: "NY",
  zipCode: "10001",
  country: "USA",
  phoneNumber: "1234567890",
};

export async function placeOrder(page, baseUrl, productName) {
  await page.goto(baseUrl);

  await addProductToCart(page, productName);

  const checkoutPage = new CheckoutPage(page);

  await checkoutPage.clickCartButton();

  await checkoutPage.clickChangeButton();

  await checkoutPage.clickAddAddressButton();

  await expect(page).toHaveURL(`${baseUrl}/add-address`);

  await checkoutPage.fillAddressForm(address);

  await checkoutPage.submitAddressForm();

  await expect(
    page.getByText("Address added successfully")
  ).toBeVisible();

  await page.waitForURL(`${baseUrl}/cart`);

  await page.waitForLoadState("networkidle");

  await expect(
    page.getByRole("button", {
      name: /Place Order|Proceed to Checkout/,
    })
  ).toBeVisible();

  await checkoutPage.clickPlaceOrderButton();

  await expect(
    page.getByText("Order placed successfully")
  ).toBeVisible();
}