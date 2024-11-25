import { expect, test } from "@playwright/test";
import { blankcombinations1, fillCombinations, blankcombinations2 } from "../utils/parameterized tests/invalidlogin";
import { BASE_URL,usernamebox, passwordbox, loginButton } from "../utils/testData";


test.describe("negative login suite", () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
  })
  //locked out user login
  test("Locked-Out User Authentication Failure", async ({ page }) => {
    await page.locator(usernamebox).fill("locked_out_user");
    await page.locator(passwordbox).fill("secret_sauce");
    await page.locator(loginButton).click();
    await expect(page.locator('[data-test="error"]')).toContainText(
      "Epic sadface: Sorry, this user has been locked out."
    );
  });
  //fill in combinations
  for (const { username, password, expectedError } of fillCombinations) {
    test(`Authentication Failure with Invalid Username or Password: "${username}" and password: "${password}"`, async ({ page }) => {
      await page.locator(usernamebox).fill(username);
      await page.locator(passwordbox).fill(password);
      await page.locator(loginButton).click();
      await expect(page.locator('[data-test="error"]')).toContainText(expectedError);
    });
  }
  // half empty combinations
  for (const { username, password, expectedError } of blankcombinations1) {
    test(`Empty Username or Password Submission: "${username}" and password: "${password}"`, async ({ page }) => {
      await page.locator(usernamebox).fill(username);
      await page.locator(passwordbox).fill(password);
      await page.locator(loginButton).click();
      await expect(page.locator('[data-test="error"]')).toContainText(expectedError);
    })
  }
  //empty combination
  for (const { username, password, expectedError } of blankcombinations2) {
    test(`Blank Username and Password Submission "${username}" and password: "${password}"`, async ({ page }) => {
      await page.locator(usernamebox).fill(username);
      await page.locator(passwordbox).fill(password);
      await page.locator(loginButton).click();
      await expect(page.locator('[data-test="error"]')).toContainText(expectedError);
    })
  }
})

