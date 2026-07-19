import { expect } from "@playwright/test";

export class AddProductPage {
  constructor(page) {
    this.page = page;
    this.url = "/seller";
    this.fileInput = page.locator("#image0");
    this.nameInput = page.locator("#product-name");
    this.priceInput = page.locator("#product-price");
    this.offerPriceInput = page.locator("#product-offerPrice");
    this.descriptionInput = page.locator("#product-description");
    this.categorySelect = page.locator("#product-category");
    this.submitButton = page.locator('button[type="submit"]');
    this.loader = page.locator(".animate-spin").first();
    this.successToast = page.getByText("Product added successfully");
  }

  async navigate(baseUrl) {
    await this.page.goto(`${baseUrl}${this.url}`);
  }

  async fillProductDetails(product, imagePath) {
    await this.fileInput.setInputFiles(imagePath);
    await this.nameInput.fill(product.name);
    await this.priceInput.fill(product.price.toString());
    await this.offerPriceInput.fill(product.offerPrice.toString());
    await this.descriptionInput.fill(product.description);
    await this.categorySelect.selectOption({ label: product.category });
  }

  async submitForm() {
    await this.submitButton.click();
  }

  async verifySuccessState() {
    await this.page.waitForResponse(
      (response) =>
        response.url().includes("/product/add") &&
        response.request().method() === "POST" &&
        response.status() === 200,
      { timeout: 15000 },
    );

    await expect(this.successToast).toBeVisible({ timeout: 15000 });
    await expect(this.submitButton).toBeEnabled({ timeout: 15000 });
  }
}
