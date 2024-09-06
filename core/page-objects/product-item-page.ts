import {Page,expect} from '@playwright/test';


export class ProductItemPage{

    private readonly page:Page;

    constructor(page:Page){
        this.page = page;
    }


    async addSauceLabsBackpackFromProductDetailsPage(){
         
        expect(await this.page.locator('.inventory_details .inventory_details_desc_container .inventory_details_name').textContent()).toContain('Sauce Labs Backpack');

        await this.page.getByRole('button',{name:'Add to cart'}).click();

        expect(await this.page.locator('.inventory_details .inventory_details_desc_container button').textContent()).toEqual('Remove');

    }

    async openCart(){
        await this.page.locator('.shopping_cart_link').click();
    }

    countAddedItemsFromProductPages:number = 0;

    async addAllItemsFromProductItemPage(){
        let titles = this.page.locator('.inventory_item_name');

        for(let title of await titles.all()){

            await title.click();
            await this.page.getByRole('button',{name:'Add to cart'}).click();
            
            this.countAddedItemsFromProductPages++;
            
            await this.page.getByRole('button',{name:'Back to products'}).click();
        }

    }
}