import { expect, test } from "@playwright/test";
import { Validusers } from "../utils/parameterized tests/Validlogin";
import { BASE_URL, usernamebox, passwordbox, loginButton } from "../utils/testData";

test.describe.only("Positive Login suite", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(BASE_URL);
    })
    for (const user of Validusers) {
        test(`Login Success for All Valid Users ${user.username}`, async ({ page }) => {
            await page.locator(usernamebox).fill(user.username);
            await page.locator(passwordbox).fill(user.password);
            await page.locator(loginButton).click();
            await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
            await expect(page.locator('[data-test="title"]')).toContainText('Products');
        });
        }
    })