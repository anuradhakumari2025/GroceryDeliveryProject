// await ordersPage.openOrders();

// await ordersPage.verifyOrder("Apple");

export class OrdersPage {
  constructor(page) {
    this.page = page;
    // this.url = "/cart";
    this.profileImg = page.locator('img[alt="profile"]');
    this.myOrders = page.locator('li:has-text("My Orders")');
  }

  async hoverProfileImg() {
    await this.profileImg.hover();
  }

  async clickOrderButton() {
    await this.myOrders.click();
  }

  // async verifyProductIn(productName) {
  //   await this.page.getByText(productName, { exact: true });
  // }
}