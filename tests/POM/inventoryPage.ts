import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "./basePage";

export class InventoryPage extends BasePage {
  readonly inventoryCards: Locator;
  readonly productName: Locator;
  readonly productPrice: Locator;
  readonly sortingDropdown: Locator;
  readonly searchInput: Locator;
  readonly previousPageButton: Locator;
  readonly nextPageButton: Locator;

  constructor(page: Page) {
    super(page, "https://practicesoftwaretesting.com/");
    this.inventoryCards = page.locator("a.card");
    this.productName = page.locator(".card-body .card-title");
    this.productPrice = page.locator(".card-body .card-price");
    this.sortingDropdown = page.locator('[data-test="sort"]');
    this.searchInput = page.locator("#search-query");
    this.previousPageButton = page.locator("li.page-item").first();
    this.nextPageButton = page.locator('[aria-label="Next"]');
  }

  async getInventoryCardsCount(): Promise<number> {
    return await this.inventoryCards.count();
  }

  async openInventoryCard() {
    await this.inventoryCards.first().click();
  }

  async getSortingOptions(): Promise<string[]> {
    await this.sortingDropdown.click();
    return await this.sortingDropdown.locator("option").allInnerTexts();
  }

  async searchForProduct(query: string) {
    query = query.trim();
    await this.searchInput.fill(query);
    await this.searchInput.press("Enter");
  }

  async selectCategory(category: string) {
    await this.page.getByLabel(category).check();
  }

  async expectSubcategoriesChecked(subcategories: string[]) {
    for (const sub of subcategories) {
      await expect(this.page.getByLabel(sub)).toBeChecked();
    }
  }
}
