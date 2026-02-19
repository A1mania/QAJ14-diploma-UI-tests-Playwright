import { test as baseTest } from "@playwright/test";
import { ToolShop  } from "../tests/POM/pageFactory";

type MyFixture = {
    toolShop: ToolShop;
}

export const test = baseTest.extend<MyFixture>({
        toolShop: async ({ page }, use) => {
        await use(new ToolShop(page));
    }

});

