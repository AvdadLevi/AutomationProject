import {expect, test} from '@playwright/test'
import {
    baseURL, inventoryURL
} from '../utils/testData.js'
import { usernameBox, passwordBox, loginButton } from '../utils/locators.js'
import {validUsers} from '../utils/parameterizedData/validLogin.js'

test.describe('Positive Login suite', () => {
    test.beforeEach(async ({page}) => {
        await page.goto(baseURL)
    })
    for (const {username, password} of validUsers) {
        test(`Login Success for All Valid Users ${username}`, async ({
            page,
        }) => {
            await page.locator(usernameBox).fill(username)
            await page.locator(passwordBox).fill(password)
            await page.locator(loginButton).click()
            await expect(page).toHaveURL(inventoryURL)
            await expect(page.locator('[data-test="title"]')).toContainText(
                'Products',
            )
        })
    }
})
