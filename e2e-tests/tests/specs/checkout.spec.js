import { test, expect } from "@playwright/test";
import testData from "../data/credentials.env.json";
import { CheckoutPage } from "../pages/CheckoutPage";
import { addProductToCart } from "../../helpers/addProductToCart";
import productData from "../data/products.json";

test.use({
  storageState: "playwright/.auth/user.json",
});

const baseUrl = testData.baseUrl;

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

test("Test @checkout Flow", async ({ page }) => {
  
  /*
  page.on("console", async (msg) => {   
    console.log("================================");
    console.log("Browser Log Type:", msg.type());
    console.log("Browser Log:", msg.text());

    for (const arg of msg.args()) {
      try {
        console.log(await arg.jsonValue());
      } catch {
        // ignore values that can't be serialized
      }
    }
  });

  page.on("pageerror", (error) => {
    console.log("PAGE ERROR:", error.message);
  });

  page.on("requestfailed", (request) => {
    console.log("REQUEST FAILED:", request.url(), request.failure()?.errorText);
  });
  */
  

  await page.goto(`${baseUrl}`);

  await addProductToCart(page, productData.fruits.name);

  const checkoutPage = new CheckoutPage(page);

  await checkoutPage.clickCartButton();

  await checkoutPage.clickChangeButton();

  await checkoutPage.clickAddAddressButton();
  await expect(page).toHaveURL(`${baseUrl}/add-address`);

  await checkoutPage.fillAddressForm(address);

  await checkoutPage.submitAddressForm();

  const toastMessage1 = page.getByText("Address added successfully");
  await expect(toastMessage1).toBeVisible();
  await page.waitForURL(`${baseUrl}/cart`);
  await page.waitForLoadState("networkidle");

  await expect(
    page.getByRole("button", { name: /Place Order|Proceed to Checkout/ }),
  ).toBeVisible();
  await checkoutPage.clickPlaceOrderButton();

  const toastMessage2 = page.getByText("Order placed successfully");
  await expect(toastMessage2).toBeVisible();
});
