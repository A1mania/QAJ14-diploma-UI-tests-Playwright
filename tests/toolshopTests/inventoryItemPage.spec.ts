import { expect } from "@playwright/test";
import { test } from "../../fixtures/custom-fixture";
import { toolshopData } from "../testData";

test.describe("Inventory item page Tests", () => {
  test.beforeEach(async ({ toolShop, page }) => {
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

  test("product params are visible on product item page", async ({
    toolShop,
  }) => {
    await expect(toolShop.inventoryItemPage.inventoryItemName).toBeVisible();
    await expect(toolShop.inventoryItemPage.inventoryItemPrice).toBeVisible();
    await expect(
      toolShop.inventoryItemPage.inventoryItemDescription,
    ).toBeVisible();
    await expect(toolShop.inventoryItemPage.CoRatingBadge).toBeVisible();
  });

  test("product added to cart from product item page", async ({ toolShop }) => {
    await toolShop.inventoryItemPage.addToCartButton.click();
    await toolShop.layout.cartBadge.waitFor({ state: "visible" });
    await expect(toolShop.layout.cartQuantityBadge).toHaveText("1");
  });

  test("check product quantity increased by 1", async ({ toolShop }) => {
    await toolShop.inventoryItemPage.increaseQuantity();
    await toolShop.inventoryItemPage.addToCartButton.click();
    await toolShop.layout.cartBadge.waitFor({ state: "visible" });
    await expect(toolShop.layout.cartQuantityBadge).toHaveText("2");
  });

  test("check add to favorites is restricted for not signed in user", async ({
    toolShop,
  }) => {
    await toolShop.inventoryItemPage.addToFavoritesButton.click();
    await expect(toolShop.layout.toastContainer).toBeVisible();
    await expect(toolShop.layout.toastContainer).toHaveText(
      "Unauthorized, can not add product to your favorite list.",
    );
  });
});
