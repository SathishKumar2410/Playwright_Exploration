import test from '@playwright/test';
import LoginPage from '../pages/LoginPage.page';
import AddItemsToCart from '../pages/AddItemsToCart.page';
import TestDataReader from '../utils/TestDataReader';

test.beforeEach('Launching URL',async ({ page }) => {
    await page.goto('https://www.saucedemo.com/inventory.html');
  });
  
test.only('Login into the application', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const testData = new TestDataReader(page);
    const test = testData.readExcelInJson('Sheet1', 'TC002');
    console.log("Username : "+ test[0].Username +", Password : "+test[0].Password);
    await loginPage.enterUsername(test[0].Username);
    await loginPage.enterPassword(test[0].Password);
    await loginPage.submit();
   // test.fail();
});

test('Add items to the cart', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const addItemsToCart = new AddItemsToCart(page);
    await loginPage.enterUsername("standard_user");
    await loginPage.enterPassword("secret_sauce");
    await loginPage.submit();

    await addItemsToCart.clickSauceLabsBackPack();
    await addItemsToCart.clickAddToCartButton();
    await addItemsToCart.verifyRemoveButtonIsVisible();

    await addItemsToCart.verifyCartIconDisplayed();
    await addItemsToCart.verifyCartCountBannerIsDisplayed();
    await addItemsToCart.clickCartIcon();
    await addItemsToCart.clickCheckoutButton();

});

test('Login into the application2', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const testData = new TestDataReader(page);
    const test = testData.getTestDataFromExcelSheet('Sheet1', 'TC002');
    await loginPage.closeErrorPopup();
    await loginPage.enterUsername(test.Username);
    await loginPage.enterPassword(test.Password);
    await page.waitForTimeout(3000);
    await loginPage.submit();
});