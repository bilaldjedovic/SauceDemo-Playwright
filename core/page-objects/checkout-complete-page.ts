import {Page, expect} from '@playwright/test';
import url from '../data/urls.json'


export class CheckoutCompletePage{

    private readonly page:Page;


    constructor(page:Page){

        this.page = page;
    }

    async clickBackHomeButton(){
        await this.page.getByRole('button',{name:'Back Home'}).click();

        expect(await this.page.url()).toEqual(url.allItemsPage);
    }
}