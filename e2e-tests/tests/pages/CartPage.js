export class CartPage {
  constructor(page) {
    this.page = page;
    this.url = "/cart";
    this.productImage = page.locator('img[alt="Product Image"]');
    this.cartButton = page.locator('img[alt="cart"]');
    this.addToCartButton = page.locator('button:has-text("Add to Cart")');
  }
  
  // Dynamically find the product image based on its unique alt text
  async getProductImage(productAltText) {
    const locator = this.page.locator(`img[alt="${productAltText}"]`);

    return locator;
  }

  async clickProductImage(productAltText) {
    const productImage = await this.getProductImage(productAltText);

    await productImage.click();
  }

  async addToCart() {
    await this.addToCartButton.click();
  }

  async clickCartButton() {
    await this.cartButton.click();
  }

  async openCart(baseUrl) {
    await this.cartButton.click();
  }

  async verifyProductInCart(productName) {
    await this.page.getByText(productName, { exact: true });
  }
}