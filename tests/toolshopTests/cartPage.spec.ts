
import { expect } from "@playwright/test";
import { toolshopData } from "../testData.ts";
import { test } from "../../fixtures/custom-fixture.ts";

test.describe("Cart page Tests", () => {
 
    test.beforeEach( async ({ toolShop, page }) => {
    await toolShop.basePage.navigate();
    await expect(page).toHaveURL("https://practicesoftwaretesting.com/");
    await toolShop.inventoryPage.inventoryCards
        .first()
        .locator(".card-body .card-title")
        .innerText();
    await Promise.all([
      page.waitForURL(/\/product\//),
      toolShop.inventoryPage.openInventoryCard(),
    ]);
  }); 

   test("check item appears in the cart page after adding to cart", async ({ toolShop }) => {
    const itemName = (await toolShop.inventoryItemPage.inventoryItemName.textContent())?.trim() || "";
    await toolShop.inventoryItemPage.addToCart();
    await toolShop.layout.openCart();
    await toolShop.cartPage.cartItemNames.first().waitFor({ state: "visible" });  
    const isItemInCart = await toolShop.cartPage.verifyItemInCart(itemName);
    expect(isItemInCart).toBe(true);
    console.log(itemName);
    
  });
 
  test("check empty cart after item removed", async ({ toolShop }) => {
    await toolShop.inventoryItemPage.addToCart();
    await toolShop.layout.openCart();
    await toolShop.cartPage.removeItemByIndex(0);
    await toolShop.layout.cartBadge.waitFor({ state: "hidden" });
    const isCartEmpty = await toolShop.cartPage.isCartEmpty();
    expect(isCartEmpty).toBe(true);
  });

  test("check checkout page opens from cart page", async ({ toolShop,page }) => {
    await toolShop.inventoryItemPage.addToCart();
    await toolShop.layout.openCart();
    await toolShop.cartPage.checkoutButton.waitFor({ state: "visible" });
    await toolShop.cartPage.proceedToCheckout();
    await expect(page.locator('.step-indicator').nth(1)).toHaveCSS("background-color", "rgb(128, 128, 128)");
  }
  );

  test("check product catalog page opens from cart page", async ({ toolShop,page }) => {
    await toolShop.inventoryItemPage.addToCart();
    await toolShop.layout.openCart();
    await toolShop.cartPage.continueShoppingButton.waitFor({ state: "visible" });
    await toolShop.cartPage.continueShoppingButton.click();
    expect(page.url()).toBe("https://practicesoftwaretesting.com/");
   }
  );

   test("check checkout page opens contain sign in form if user is not logged in", async ({ toolShop,page }) => {
    await toolShop.inventoryItemPage.addToCart();
    await toolShop.layout.openCart();
    await toolShop.cartPage.checkoutButton.waitFor({ state: "visible" });
    await toolShop.cartPage.proceedToCheckout();
    await expect(page.locator("#signin-tab")).toBeVisible();
   });

   test("check return to cart from checkout page", async ({ toolShop,page }) => {
    await toolShop.inventoryItemPage.addToCart();
    await toolShop.layout.openCart();
    await toolShop.cartPage.checkoutButton.waitFor({ state: "visible" });
    await toolShop.cartPage.proceedToCheckout();
    await page.locator('.step-indicator').nth(0).click();
    await expect(toolShop.cartPage.checkoutButton).toBeVisible();
   }
    );
   
 });
 