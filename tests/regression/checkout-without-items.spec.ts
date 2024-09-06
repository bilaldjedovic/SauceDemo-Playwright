import {test} from '@playwright/test';

import { PageManager } from '../../core/page-objects/page-manager';

test.beforeEach(async ({page})=>{

    const pageManager = new PageManager(page);

    await pageManager.loginPage().openSauceDemo();
});


test('Checkout without items', async ({page}, testInfo)=>{

    const pageManager = new PageManager(page);

    await pageManager.loginPage().loginToThePageUsingStandardUserCredentials();

    await pageManager.allItemsPage().openCart();

    await pageManager.cartPage().validateAddedItemsToCart(0);
    await pageManager.cartPage().clickCheckoutButton();
    await pageManager.cartPage().validateThatCartPageIsOpened(testInfo.title);

})