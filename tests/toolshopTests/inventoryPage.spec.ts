import { expect } from "@playwright/test";
import { test } from "../../fixtures/custom-fixture";
import { toolshopData } from "../testData";

test.describe("Inventory page Tests", () => {
  test.beforeEach("navigate to home page", async ({ toolShop, page }) => {
    await toolShop.basePage.navigate();
    await expect(page).toHaveURL("https://practicesoftwaretesting.com/");
  });

  test("each product card contains name and price", async ({ toolShop }) => {
    const cardsCount = await toolShop.inventoryPage.getInventoryCardsCount();
    for (let i = 0; i < cardsCount; i++) {
      const card = toolShop.inventoryPage.inventoryCards.nth(i);
      await expect(card.locator(".card-body .card-title")).toBeVisible();
      await expect(card.locator(".card-body .card-price")).toBeVisible();
      await expect(card.locator(".card-body .co2-rating-scale")).toBeVisible();
    }
  });

  test("check available sorting options", async ({ toolShop }) => {
    const sortingList = await toolShop.inventoryPage.getSortingOptions();
    expect(sortingList).toEqual(toolshopData.sortingOptions);
  });

  test("check sorting by name", async ({ toolShop }) => {
    const firstNameBefore = await toolShop.inventoryPage.inventoryCards
      .first()
      .locator(".card-title")
      .innerText();
    await toolShop.inventoryPage.sortingDropdown.selectOption("Name (A - Z)");
    await expect(
      toolShop.inventoryPage.inventoryCards.first().locator(".card-title"),
    ).not.toHaveText(firstNameBefore);
    const itemNames = await toolShop.inventoryPage.inventoryCards
      .locator(".card-body .card-title")
      .allInnerTexts();
    const sortedNames = [...itemNames].sort();
    expect(itemNames).toEqual(sortedNames);
  });

  test("filter by subcategory works", async ({ page, toolShop }) => {
    await page.getByLabel("Hammer").check();
    const filterResultsCount =
      await toolShop.inventoryPage.getInventoryCardsCount();
    expect(filterResultsCount).toBeGreaterThan(0);
  });

  test("filter subcategories become checked when check category", async ({
    toolShop,
  }) => {
    await toolShop.inventoryPage.selectCategory("Hand Tools");
    await toolShop.inventoryPage.expectSubcategoriesChecked(
      toolshopData.categories["Hand Tools"],
    );
  });

  test("check product detail page opens on clicking product card", async ({
    toolShop,
    page,
  }) => {
    const firstCardName = (
      await toolShop.inventoryPage.inventoryCards
        .first()
        .locator(".card-body .card-title")
        .innerText()
    )?.trim();
    await Promise.all([
      page.waitForURL(/\/product\//),
      toolShop.inventoryPage.openInventoryCard(),
    ]);
    await expect(page.locator('[data-test="product-name"]')).toHaveText(
      firstCardName,
    );
  });

  test("check searching by existing product name", async ({ toolShop }) => {
    const firstCardName = await toolShop.inventoryPage.inventoryCards
      .first()
      .locator(".card-body .card-title")
      .innerText();
    await toolShop.inventoryPage.searchForProduct(firstCardName);
    const searchResultsCount =
      await toolShop.inventoryPage.getInventoryCardsCount();
    expect(searchResultsCount).toBeGreaterThan(0);
  });

  test("check no results found when searching by product name", async ({
    toolShop,
  }) => {
    await toolShop.inventoryPage.searchForProduct("NonExistingProduct");
    await expect(
    toolShop.inventoryPage.page.locator("[data-test='no-results']")
  ).toBeVisible();
    const searchResultsCount =
      await toolShop.inventoryPage.getInventoryCardsCount();
    expect(searchResultsCount).toBe(0);
    const noResultsMessage = await toolShop.inventoryPage.page
      .locator("[data-test='no-results']")
      .innerText();
    expect(noResultsMessage).toBe("There are no products found.");
  });

  test("previous page button disbled on 1st page", async ({ toolShop }) => {
    await expect(toolShop.inventoryPage.previousPageButton).toHaveClass(
      /disabled/,
    );
  });

  test("next page opens from the 1st page", async ({ toolShop }) => {
    const firstCardName = await toolShop.inventoryPage.inventoryCards
      .first()
      .locator(".card-body .card-title");
    await toolShop.inventoryPage.nextPageButton.click();
    const newFirstCardName = await toolShop.inventoryPage.inventoryCards
      .first()
      .locator(".card-body .card-title");
    expect(firstCardName).not.toBe(await newFirstCardName.innerText());
  });
});
