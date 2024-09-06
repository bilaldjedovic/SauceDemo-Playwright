import { Page,expect } from "@playwright/test";
import url from '../data/urls.json'

export class NavigationMenu{

    private readonly page:Page;

    constructor(page:Page){
        this.page = page;
    }


    async logOutFromPage(){

        if(await this.page.locator('.bm-menu-wrap').getAttribute('aria-hidden') === 'true'){
            await this.page.locator('#react-burger-menu-btn').click();
        }
        await this.page.getByText('Logout').click();

        expect(await this.page.url()).toEqual(url.homePage);
    }

    async allItemsPage(){
        if(await this.page.locator('.bm-menu-wrap').getAttribute('aria-hidden') === 'true'){
            await this.page.locator('#react-burger-menu-btn').click();
        }   
        await this.page.getByText('All Items').click();

        if(await this.page.locator('.bm-menu-wrap').getAttribute('aria-hidden') === 'false'){
            await this.page.locator('#react-burger-cross-btn').click();
        }   


        expect(await this.page.url()).toEqual(url.allItemsPage);
    }

    async aboutPage(){
        if(await this.page.locator('.bm-menu-wrap').getAttribute('aria-hidden') === 'true'){
            await this.page.locator('#react-burger-menu-btn').click();
        }

        await this.page.getByText('About').click();

        expect(await this.page.url()).toEqual(url.aboutPage);

        await this.page.goBack();

        expect(await this.page.url()).toEqual(url.allItemsPage);
    }

    async resetAppState(){
        if(await this.page.locator('.bm-menu-wrap').getAttribute('aria-hidden') === 'true'){
            await this.page.locator('#react-burger-menu-btn').click();
        }
    
        await this.page.getByText('Reset App State').click();
    }

}