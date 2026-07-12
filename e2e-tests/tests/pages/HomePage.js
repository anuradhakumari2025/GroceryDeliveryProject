import { expect } from "@playwright/test";

export class HomePage {
  constructor(page) {
    this.page = page;

    this.searchInput = page.locator('input[placeholder*="Search Products"]');
  }

  async searchProduct(productName) {
    await this.searchInput.fill(productName);
    await this.page.keyboard.press("Enter");
  }

  async scrollToProduct(productName) {
    const product = this.page.getByText(productName, { exact: false });

    while (!(await product.isVisible())) {
      await this.page.mouse.wheel(0, 800);
      await this.page.waitForTimeout(500);
    }
  }

  async openProduct(productName) {
    await this.page.getByText(productName, { exact: false }).click();
  }

  async verifyProductVisible(productName) {
    await expect(
      this.page.getByText(productName, { exact: false })
    ).toBeVisible();
  }
}