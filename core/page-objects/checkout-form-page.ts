import {Page, expect} from '@playwright/test';
import {faker} from '@faker-js/faker';
import url from '../data/urls.json'

export class CheckoutFormPage {

    private readonly page:Page;

    constructor(page:Page){
        this.page = page;
    }

    async fillOutCheckoutForm(){
        await this.page.getByRole('textbox', {name:'First Name'}).fill(faker.person.firstName());
        await this.page.getByRole('textbox',{name:'Last Name'}).fill(faker.person.lastName());
        await this.page.getByRole('textbox',{name:'Zip/Postal Code'}).fill(faker.location.zipCode());
    }

    async clickContinueButton(){
        await this.page.getByRole('button', {name:'Continue'}).click();
        expect(await this.page.url()).toEqual(url.checkoutOverviewPage);

    }

    async clickCancelButton(){
        await this.page.getByRole('button', {name:'Cancel'}).click();
        expect(await this.page.url()).toEqual(url.cartPage);

    }


}