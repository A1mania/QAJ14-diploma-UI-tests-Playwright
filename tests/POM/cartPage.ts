import { Page, Locator } from "@playwright/test";
import { BasePage } from "./basePage";

export class CartPage extends BasePage {
readonly checkoutButton: Locator;
readonly continueShoppingButton: Locator;
readonly cartItemNames: Locator;
readonly cartItemPrices: Locator;
readonly cartItemQuantityInputs: Locator;
readonly removeButtons: Locator;

    constructor(page: Page) {
        super(page, page.url());
        this.checkoutButton = page.locator('[data-test="proceed-1"]');
        this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
        this.cartItemNames = page.locator('.product-title');
        this.cartItemPrices = page.locator('.product-price');
        this.cartItemQuantityInputs = page.locator('.product-quantity');
        this.removeButtons = page.locator('[data-icon="xmark"]');
    }

    async getItemNames(): Promise<string[]> {
        const names = await this.cartItemNames.allTextContents();
        return names.map(name => name.trim());
    }

    async getItemPrices(): Promise<string[]> {
        return await this.cartItemPrices.allTextContents();
    }

    fillQuantityByIndex(itemIndex: number, quantity: number) {
        const input = this.cartItemQuantityInputs.nth(itemIndex);
        return input.fill(quantity.toString());        
    }

    async proceedToCheckout() {
        await this.checkoutButton.click();
    }

    async continueShopping() {
        await this.continueShoppingButton.click();
    }

    async removeItemByIndex(itemIndex: number) {
        await this.removeButtons.nth(itemIndex).click();       
    }

    async verifyItemInCart(itemName: string): Promise<boolean> {
        const itemNames = await this.getItemNames();
        return itemNames.includes(itemName);
    }
    
    async isCartEmpty(): Promise<boolean> {
        return await this.cartItemNames.count() === 0;
    }
}