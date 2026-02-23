import { Page, Locator } from "@playwright/test";
import { BasePage } from "./basePage";

export class Layout extends BasePage {
  readonly notificationBar: Locator;
  readonly testNotificationBar: Locator;
  readonly navBar: Locator;
  readonly cartBadge: Locator;
  readonly cartQuantityBadge: Locator;
  readonly cartLink: Locator;
  readonly homeButton: Locator;
  readonly categoriesDropdown: Locator;
  readonly contactLink: Locator;
  readonly signInLink: Locator;
  readonly appLogo: Locator;
  readonly languageDropdown: Locator;
  readonly footer: Locator;
  readonly gitHubLink: Locator;
  readonly policyLink: Locator;
  readonly toastContainer: Locator;

  constructor(page: Page) {
    super(page, "https://practicesoftwaretesting.com/");
    this.notificationBar = page.locator("[data-test='notification-bar']");
    this.testNotificationBar = page.locator(".testing-notification-bar");
    this.navBar = page.locator(".navbar");
    this.cartBadge = page.locator(".nav-link [data-icon='cart-shopping']");
    this.cartQuantityBadge = page.locator("[data-test='cart-quantity']");
    this.cartLink = page.locator("[data-test='nav-cart']");
    this.homeButton = page.locator("[data-test='nav-home']");
    this.categoriesDropdown = page.locator("[data-test='nav-categories']");
    this.contactLink = page.locator("[data-test='nav-contact']");
    this.signInLink = page.locator("[data-test='nav-sign-in']");
    this.appLogo = page.locator("#Layer_1");
    this.languageDropdown = page.locator("[data-test='language-select']");
    this.footer = page.locator("app-footer .container-fluid");
    this.gitHubLink = page
      .locator("app-footer .container-fluid")
      .getByText("GitHub repo");
    this.policyLink = page
      .locator("app-footer .container-fluid")
      .getByText("Privacy Policy");
    this.toastContainer = page.locator("#toast-container");
  }

  async getCartBadgeCount(): Promise<number> {
    const text = await this.cartBadge.innerText();
    return text ? Number(text) : 0;
  }

  async isCartBadgeVisible(): Promise<boolean> {
    return await this.cartBadge.isVisible();
  }

  async openCart() {
    await this.cartLink.click();
  }

  async openCategories() {
    await this.categoriesDropdown.click();
  }

  async goHome() {
    await this.homeButton.click();
  }

  async openContactPage() {
    await this.contactLink.click();
  }

  async openSignInPage() {
    await this.signInLink.click();
  }

  async clickLanguageDropdown() {
    await this.languageDropdown.click();
  }

  async selectLanguage(lang: string) {
    await this.page.locator(`[data-test='lang-${lang.toLowerCase()}']`).click();
  }

  async clickAppLogo() {
    await this.appLogo.click();
  }

  async getFooterText(): Promise<string> {
    return await this.footer.innerText();
  }

  async clickGitHubLink() {
    await this.gitHubLink.click();
  }

  async clickPolicyLink() {
    await this.policyLink.click();
  }
}
