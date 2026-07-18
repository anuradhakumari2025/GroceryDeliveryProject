import { test, expect } from "@playwright/test";
import testData from "../data/credentials.env.json";
import { CheckoutPage } from "../pages/CheckoutPage";
import { addProductToCart } from "../../helpers/addProductToCart";
import productData from "../data/products.json";

test.use({
  storageState: "playwright/.auth/user.json",
});

const baseUrl = testData.baseUrl;

test("Test @checkout Flow", async ({ page }) => {
  await page.goto(`${baseUrl}`);

  await addProductToCart(page, productData.fruits.name);

  const checkoutPage = new CheckoutPage(page);

  await checkoutPage.clickCartButton();

  await checkoutPage.clickChangeButton();

  await checkoutPage.clickAddAddressButton();
  await expect(page).toHaveURL(`${baseUrl}/add-address`);

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

  await checkoutPage.fillAddressForm(address);

  await checkoutPage.submitAddressForm();

  const toastMessage1 = page.getByText("Address added successfully");
  await expect(toastMessage1).toBeVisible();

  await checkoutPage.clickPlaceOrderButton();

  await page.waitForTimeout(2000);

  const toastMessage2 = page.getByText("Order placed successfully");
  await expect(toastMessage2).toBeVisible({
    timeout: 5000,
  });
});
