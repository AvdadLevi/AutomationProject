import {expect, test} from '@playwright/test'
import {invalidUsersDetails} from '../utils/parameterizedData/invalidLogin.js'
import {usernameBox, passwordBox, loginButton, baseURL} from '../utils/testData'

test.describe('negative login suite', () => {
    test.beforeEach(async ({page}) => {
        await page.goto(baseURL)
    })
    //locked out user login
    test('Locked-Out User Authentication Failure', async ({page}) => {
        await page.locator(usernameBox).fill('locked_out_user')
        await page.locator(passwordBox).fill('secret_sauce')
        await page.locator(loginButton).click()
        await expect(page.locator('[data-test="error"]')).toContainText(
            'Epic sadface: Sorry, this user has been locked out.',
        )
    })
    //fill in combinations
    for (const {username, password, expectedError} of invalidUsersDetails) {
        test(`Authentication Failure with Invalid Username or Password: "${username}" and password: "${password}"`, async ({
            page,
        }) => {
            await page.locator(usernameBox).fill(username)
            await page.locator(passwordBox).fill(password)
            await page.locator(loginButton).click()
            await expect(page.locator('[data-test="error"]')).toContainText(
                expectedError,
            )
        })
    }
})
