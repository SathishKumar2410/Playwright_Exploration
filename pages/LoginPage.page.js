const { expect } = require('@playwright/test');
class LoginPage {

    constructor(page) {
        this.page = page;
        this.usernameTextbox = page.getByPlaceholder('Username');
        this.passwordTextbox = page.getByPlaceholder("Password");
        this.errorPopupCloseButton = page.locator('.error-button');
        this.submitButton = page.locator("#login-button");
    }

    async navigate(url) {
        await this.page.goto(url);
    }

    async enterUsername(username) {
        console.log(this.usernameTextbox);
        await this.usernameTextbox.fill(username);
    }

    async enterPassword(password) {
        await this.passwordTextbox.fill(password);
    }

    async submit() {
        await this.submitButton.click();
    }
    async closeErrorPopup() {
        await this.errorPopupCloseButton.click();
    }
}
module.exports = LoginPage;
