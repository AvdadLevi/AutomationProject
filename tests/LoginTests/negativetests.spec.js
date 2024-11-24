import { expect, test } from "@playwright/test";
import { blankcombinations1, fillCombinations, blankcombinations2 } from "../utils/invalidlogin";

test.describe.only("negative login suite", () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto("https://www.saucedemo.com/");
  })
  //locked out user login
  test("Locked-Out User Authentication Failure", async ({ page }) => {
    await page.goto("https://www.saucedemo.com/");
    await page.locator('[data-test="username"]').fill("locked_out_user");
    await page.locator('[data-test="password"]').fill("secret_sauce");
    await page.locator('[data-test="login-button"]').click();
    await expect(page.locator('[data-test="error"]')).toContainText(
      "Epic sadface: Sorry, this user has been locked out."
    );
  });
  //fill in combinations
  for (const { username, password, expectedError } of fillCombinations) {
    test(`Authentication Failure with Invalid Username or Password: "${username}" and password: "${password}"`, async ({ page }) => {
      await page.locator('[data-test="username"]').fill(username);
      await page.locator('[data-test="password"]').fill(password);
      await page.locator('[data-test="login-button"]').click();
      await expect(page.locator('[data-test="error"]')).toContainText(expectedError);
    });
  }
  // half empty combinations
  for (const { username, password, expectedError } of blankcombinations1) {
    test(`Empty Username or Password Submission: "${username}" and password: "${password}"`, async ({ page }) => {
      await page.locator('[data-test="username"]').fill(username);
      await page.locator('[data-test="password"]').fill(password);
      await page.locator('[data-test="login-button"]').click();
      await expect(page.locator('[data-test="error"]')).toContainText(expectedError);
    })
  }
  //empty combination
  for (const { username, password, expectedError } of blankcombinations2) {
    test(`Blank Username and Password Submission "${username}" and password: "${password}"`, async ({ page }) => {
      await page.locator('[data-test="username"]').fill(username);
      await page.locator('[data-test="password"]').fill(password);
      await page.locator('[data-test="login-button"]').click();
      await expect(page.locator('[data-test="error"]')).toContainText(expectedError);
    })
  }
})

