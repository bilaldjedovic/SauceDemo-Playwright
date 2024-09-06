import {test} from '@playwright/test';
import { PageManager } from '../../core/page-objects/page-manager';

test.beforeEach(async ({page})=>{

    const pageManager = new PageManager(page);

    await pageManager.loginPage().openSauceDemo();

});


test('Testing that user can view cart after adding all items from product page', async ({page})=>{

    const pageManager = new PageManager(page);

    await pageManager.loginPage().loginToThePageUsingStandardUserCredentials();
    await pageManager.productItemPage().addAllItemsFromProductItemPage();
    await pageManager.allItemsPage().checkIfAllButtonsAreClicked();
    await pageManager.allItemsPage().checkIfAllItemsAreAddedOnCartSpan(pageManager.productItemPage().countAddedItemsFromProductPages)    
    await pageManager.allItemsPage().openCart();
    await pageManager.cartPage().validateAddedItemsToCart(pageManager.productItemPage().countAddedItemsFromProductPages)
});