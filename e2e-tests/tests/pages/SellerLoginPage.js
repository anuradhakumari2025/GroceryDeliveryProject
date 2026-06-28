export class SellerLoginPage {
  constructor(page) {
    this.page = page;
    this.url = '/seller/login';
    this.emailInput = page.locator('input[name="seller-email"]');
    this.passwordInput = page.locator('input[name="seller-password"]');
    this.submitButton = page.locator('button[type="submit"]');
  }

  async navigate(baseUrl) {
    await this.page.goto(`${baseUrl}${this.url}`);
  }

  async login(email, password) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }
}
