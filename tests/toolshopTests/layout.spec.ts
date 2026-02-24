import { expect } from "@playwright/test";
import { test } from "../../fixtures/custom-fixture";
import { toolshopData } from "../testData";

test.describe("Layout Tests", () => {
  test.beforeEach("navigate to home page", async ({ toolShop, page }) => {
    await toolShop.basePage.navigate();
    await expect(page).toHaveURL("https://practicesoftwaretesting.com/");
  });

  test("contact page opens from header", async ({ page, toolShop }) => {
    await toolShop.layout.openContactPage();
    await expect(page).toHaveURL("https://practicesoftwaretesting.com/contact");
  });

  test("signin page opens from header", async ({ page, toolShop }) => {
    await toolShop.layout.signInLink.click();
    await expect(page).toHaveURL(
      "https://practicesoftwaretesting.com/auth/login",
    );
  });

  test("check home page opens from header by clicking Home link", async ({
    page,
    toolShop,
  }) => {
    await toolShop.layout.openContactPage();
    await expect(page).toHaveURL("https://practicesoftwaretesting.com/contact");
    await toolShop.layout.goHome();
    await expect(page).toHaveURL("https://practicesoftwaretesting.com");
  });

  test("check home page opens from header by clicking app logo", async ({
    page,
    toolShop,
  }) => {
    await toolShop.layout.openContactPage();
    await expect(page).toHaveURL("https://practicesoftwaretesting.com/contact");
    await toolShop.layout.clickAppLogo();
    await expect(page).toHaveURL("https://practicesoftwaretesting.com");
  });

  test("check categories list in header dropdown", async ({
    page,
    toolShop,
  }) => {
    await toolShop.layout.openCategories();
    const categories = await page
      .locator("[aria-label='nav-categories'] .dropdown-item")
      .allInnerTexts();
    expect(categories).toEqual(Object.keys(toolshopData.categories));
  });

  test("check category page opens from header dropdown", async ({
    page,
    toolShop,
  }) => {
    await toolShop.layout.openCategories();
    await page
      .locator("[aria-label='nav-categories'] .dropdown-item")
      .nth(0)
      .click();
    await expect(page).toHaveURL(
      "https://practicesoftwaretesting.com/category/hand-tools",
    );
  });

  test("check language list in header dropdown", async ({ page, toolShop }) => {
    await toolShop.layout.clickLanguageDropdown();
    const languages = await page
      .locator("[aria-labelledby='language'] .dropdown-item")
      .allInnerTexts();
    expect(languages).toEqual(toolshopData.languages);
  });

  test("check language changes from header dropdown", async ({ toolShop }) => {
    await toolShop.layout.clickLanguageDropdown();
    await toolShop.layout.selectLanguage("ES");
    await expect(toolShop.layout.navBar).toContainText("Inicio");
  });

  test("check gitHub page opens from footer", async ({ page, toolShop }) => {
    const [newPage] = await Promise.all([
      page.waitForEvent("popup"),
      toolShop.layout.clickGitHubLink(),
    ]);
    await newPage.waitForLoadState("domcontentloaded");
    await expect(newPage).toHaveURL(
      "https://github.com/testsmith-io/practice-software-testing",
    );
  });

  test("check policy page opens from footer", async ({ page, toolShop }) => {
    (await toolShop.layout.clickPolicyLink(),
      await page.waitForLoadState("domcontentloaded"));
    await expect(page).toHaveURL("https://practicesoftwaretesting.com/privacy");
  });
});
