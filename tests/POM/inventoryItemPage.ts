import { Page, Locator } from "@playwright/test";
import { BasePage } from "./basePage";

export class InventoryItemPage extends BasePage {
  readonly inventoryItemName: Locator;
  readonly inventoryItemPrice: Locator;
  readonly CoRatingBadge: Locator;
  readonly inventoryItemDescription: Locator;
  readonly addToFavoritesButton: Locator;
  readonly addToCartButton: Locator;
  readonly plusButton: Locator;
  readonly minusButton: Locator
  

  constructor(page: Page) {
    super(page, page.url());
    this.inventoryItemName = page.locator('[data-test="product-name"]');
    this.inventoryItemPrice = page.locator('[data-test="unit-price"]');
    this.CoRatingBadge = page.locator('[data-test="co2-rating-badge"]');
    this.inventoryItemDescription = page.locator('[data-test="product-description"]');
    this.addToFavoritesButton = page.locator('#btn-add-to-favorites');
    this.addToCartButton = page.locator('#btn-add-to-cart');
    this.plusButton = page.locator("[data-icon='plus']");
    this.minusButton = page.locator("[data-icon='minus']");   

  }

  async addToFavorites() {
    await this.addToFavoritesButton.click();
  }
  
  async addToCart() {
    await this.addToCartButton.click();    
  }

  async increaseQuantity() {
    await this.plusButton.click();
  }

  async decreaseQuantity() {
    await this.minusButton.click();
  }

}

