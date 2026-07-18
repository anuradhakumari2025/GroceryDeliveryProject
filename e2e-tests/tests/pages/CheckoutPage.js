export class CheckoutPage {
  constructor(page) {
    this.page = page;
    this.url = "/cart";
    this.cartButton = page.locator('img[alt="cart"]');
    this.changeButton = page.locator('button:has-text("Change")');
    this.addAddressButton = page.locator('p:has-text("Add Address")');
    this.firstNameInput = page.locator('input[name="firstName"]');
    this.lastNameInput = page.locator('input[name="lastName"]');
    this.emailInput = page.locator('input[name="email"]');
    this.streetInput = page.locator('input[name="street"]');
    this.cityInput = page.locator('input[name="city"]');
    this.stateInput = page.locator('input[name="state"]');
    this.zipCodeInput = page.locator('input[name="zipcode"]');
    this.countryInput = page.locator('input[name="country"]');
    this.phoneNumberInput = page.locator('input[name="phone"]');
    this.saveAddressButton = page.locator('button:has-text("Save Address")');
    this.placeOrderButton = page.locator('button:has-text("Place Order")');
  }

  async clickCartButton() {
    await this.cartButton.click();
  }

  async clickChangeButton() {
    await this.changeButton.click();
  }

  async clickAddAddressButton() {
    await this.addAddressButton.click();
  }

  async fillAddressForm(address) {
    await this.firstNameInput.fill(address.firstName);
    await this.lastNameInput.fill(address.lastName);
    await this.emailInput.fill(address.email);
    await this.streetInput.fill(address.street);
    await this.cityInput.fill(address.city);
    await this.stateInput.fill(address.state);
    await this.zipCodeInput.fill(address.zipCode);
    await this.countryInput.fill(address.country);
    await this.phoneNumberInput.fill(address.phoneNumber);
  }

  async submitAddressForm() {
    await this.saveAddressButton.click();
  }

  async clickPlaceOrderButton() {
    await this.placeOrderButton.click();
  }
}
