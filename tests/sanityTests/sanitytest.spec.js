import { expect, test } from "@playwright/test";
import { BASE_URL, usernamebox, passwordbox, loginButton, Inventory_URL } from "../utils/testData";


test.describe("sanity suite", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
})
  test("User Journey: Login, Add to Cart, and Complete Order", async ({ page }) => {
    await page.goto(BASE_URL, Inventory_URL);
    //log in
    await page.locator(usernamebox).fill("standard_user");
    await page.locator(passwordbox).fill("secret_sauce");
    await page.locator(loginButton).click();
    //url validation
    await expect(page).toHaveURL(Inventory_URL);
    //adding to shopping cart
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
    await expect(page.locator('[data-test="shopping-cart-link"]')).toContainText('2');
    await page.locator('[data-test="shopping-cart-link"]').click();
    //validate and checkout
    await expect(page).toHaveURL("https://www.saucedemo.com/cart.html");
    await expect(page.locator('[data-test="secondary-header"]')).toContainText("Your Cart");
    await expect(page.locator('[data-test="inventory-item"]')).toHaveCount(2);
    await page.locator('[data-test="checkout"]').click();
    //checkout page
    await expect(page).toHaveURL("https://www.saucedemo.com/checkout-step-one.html");
    await expect(page.locator('[data-test="secondary-header"]')).toContainText("Checkout: Your Information");
    await page.locator('[data-test="firstName"]').fill('Oded');
    await page.locator('[data-test="lastName"]').fill('Levi-Shafran');
    await page.locator('[data-test="postalCode"]').fill('3086000');
    await page.locator('[data-test="continue"]').click();
    //checkout overview
    await expect(page).toHaveURL("https://www.saucedemo.com/checkout-step-two.html");
    await expect(page.locator('[data-test="title"]')).toContainText("Checkout: Overview");
    await page.locator('[data-test="finish"]').click();
    //checkout complete
    await expect(page).toHaveURL("https://www.saucedemo.com/checkout-complete.html")
    await expect(page.locator('[data-test="title"]')).toContainText("Checkout: Complete!");
    await expect(page.locator('[data-test="complete-header"]')).toContainText("Thank you for your order!");
    await expect(page.locator('[data-test="complete-text"]')).toContainText("Your order has been dispatched, and will arrive just as fast as the pony can get there!");
  });
});
