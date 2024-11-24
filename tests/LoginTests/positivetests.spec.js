import { expect, test } from "@playwright/test";
import { Validusers } from "../utils/Validlogin";

test.describe.only("Positive Login suite", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("https://www.saucedemo.com/");
    })
    for (const user of Validusers) {
        test(`Login Success for All Valid Users ${user.username}`, async ({ page }) => {
            await page.locator('[data-test="username"]').fill(user.username);
            await page.locator('[data-test="password"]').fill(user.password);
            await page.locator('[data-test="login-button"]').click();
            await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
            await expect(page.locator('[data-test="title"]')).toContainText('Products');
        });
        }
    })