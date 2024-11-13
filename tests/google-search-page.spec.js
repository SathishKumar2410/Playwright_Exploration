const { test, expect } = require('@playwright/test');
const { Console } = require('console');

test.describe('Search playwright in Google search', () => {
    test('should allow me to add todo items', async ({ page }) => {

        await page.goto("https://www.saucedemo.com/inventory.html");
        await page.getByPlaceholder('Username').fill('standard_user');
        await page.getByPlaceholder('Password').fill('secret_sauce');
        await page.locator('#login-button').click();
        expect(page.locator('.primary_header .header_label div')).toHaveText('Swag Labs');
        await page.getByText('Sauce Labs Backpack').click();
        await page.locator('#add-to-cart').click();
        await page.locator('#remove').isVisible();
        console.log(page.locator('#remove').innerText());
        expect(page.locator('#remove')).toHaveText('Remove');
        await page.waitForTimeout(5000);

    })
});