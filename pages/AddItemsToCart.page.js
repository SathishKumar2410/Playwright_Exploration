const { expect } = require('@playwright/test');

class AddItemsToCart {

    constructor(page) {
        this.page = page;
        this.sauceLabsBackpackElement = page.getByText('Sauce Labs Backpack');
        this.addToCartButton = page.locator('#add-to-cart');
        this.removeButton = page.locator('#remove');
        this.productCountInCartElement = page.locator('#shopping_cart_container a span');
        this.cartIconElement = page.locator('#shopping_cart_container a');
        this.checkoutButton = page.getByText('Checkout');
    }

    async clickSauceLabsBackPack() {
        await expect(this.sauceLabsBackpackElement).toHaveText('Sauce Labs Backpack');
        await this.sauceLabsBackpackElement.click();

    }

    async clickAddToCartButton() {
        await expect(this.addToCartButton).toBeVisible();
        await this.addToCartButton.click();
    }

    async verifyRemoveButtonIsVisible() {
        await expect(this.removeButton).toBeVisible();
        await this.page.waitForTimeout(5000);
    }

    async verifyCartIconDisplayed() {
        return await expect(this.cartIconElement).toBeVisible();
    }

    async verifyCartCountBannerIsDisplayed() {
        return await expect(this.productCountInCartElement).toHaveText('1');
    }

    async clickCartIcon() {
        await this.cartIconElement.click();
    }

    async clickCheckoutButton() {
        await expect(this.checkoutButton).toBeVisible();
        await this.checkoutButton.click();
    }
}
module.exports = AddItemsToCart;