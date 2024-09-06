import {test} from '@playwright/test';
import { PageManager } from '../../core/page-objects/page-manager';

test.beforeEach(async ({page})=>{

    const pageManager = new PageManager(page);

    await pageManager.loginPage().openSauceDemo();
});


test('Testing all filter options', async ({page})=>{

    const pageManager = new PageManager(page);

    await pageManager.loginPage().loginToThePageUsingStandardUserCredentials();
    await pageManager.navigationMenu().allItemsPage();
    await pageManager.allItemsPage().applyAllFilterOptions();
})