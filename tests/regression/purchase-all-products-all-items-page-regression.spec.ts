import {test} from '@playwright/test';

import { PageManager } from '../../core/page-objects/page-manager';

test.beforeEach(async({page})=>{
    const pageManager = new PageManager(page);
    await pageManager.loginPage().openSauceDemo();
})

test('Purchasing all products all items page regression',async ({page}) => {

    const pageManager = new PageManager(page);

    await pageManager.loginPage().loginToThePageUsingStandardUserCredentials();

    await pageManager.allItemsPage().clickAllAddToCartButtons();
    await pageManager.allItemsPage().checkIfAllButtonsAreClicked();
    await pageManager.allItemsPage().checkIfAllItemsAreAddedOnCartSpan(pageManager.allItemsPage().count)    
    await pageManager.allItemsPage().openCart();

    await pageManager.cartPage().validateAddedItemsToCart(pageManager.allItemsPage().count)
    await pageManager.cartPage().clickCheckoutButton();

    await pageManager.checkoutFormPage().fillOutCheckoutForm();
    await pageManager.checkoutFormPage().clickContinueButton();
    await pageManager.checkoutOverviewPage().clickFinishButton();
    await pageManager.checkoutCompletePage().clickBackHomeButton();

    await pageManager.navigationMenu().logOutFromPage();

})