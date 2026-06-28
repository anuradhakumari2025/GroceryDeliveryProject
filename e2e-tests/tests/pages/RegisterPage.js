export class RegisterPage {
  constructor(page) {
    this.page = page;
    this.url = '/register';
    this.nameInput = page.locator('input[name="name"]');
    this.emailInput = page.locator('input[name="email"]');
    this.passwordInput = page.locator('input[name="password"]');
    this.submitButton = page.locator('button[type="submit"]');
  }

  async navigate(baseUrl) {
    await this.page.goto(`${baseUrl}${this.url}`);
  }

  async registerUser(name, email, password) {
    await this.nameInput.fill(name);
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }
}
