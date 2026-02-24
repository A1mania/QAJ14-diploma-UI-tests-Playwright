import { Page } from '@playwright/test'
import { BasePage } from './basePage';
import { LoginPage } from './loginPage';
import { InventoryPage } from './inventoryPage';
import { Layout } from './layout'
import { InventoryItemPage } from './inventoryItemPage';
import { CartPage } from './cartPage';

export class ToolShop  {
    readonly basePage: BasePage;
    readonly inventoryPage: InventoryPage;
    readonly inventoryItemPage: InventoryItemPage;
    readonly layout: Layout;
    readonly cartPage: CartPage;

constructor (page: Page) {
    this.basePage = new BasePage (page, 'https://practicesoftwaretesting.com/');
    this.inventoryPage = new InventoryPage(page);
    this.inventoryItemPage = new InventoryItemPage(page);
    this.layout = new Layout(page);
    this.cartPage = new CartPage(page);
}
}

