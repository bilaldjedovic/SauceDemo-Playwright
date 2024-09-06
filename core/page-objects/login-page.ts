import { Page, expect } from "@playwright/test";
import StandardUserCredentials from '../data/standard-user-credentials.json'
import url from '../data/urls.json'

export class LoginPage {
    
    private readonly page: Page;

    constructor(page:Page){

        this.page = page;
    }

    async openSauceDemo(){
        await this.page.goto(url.homePage);
    }

    async loginToThePageUsingStandardUserCredentials(){

        await this.page.getByRole('textbox', {name:'Username'}).fill(StandardUserCredentials.username);
        await this.page.getByRole('textbox', {name:'Password'}).fill(StandardUserCredentials.password);

        await this.page.getByRole('button',{name:'Login'}).click();

        expect(await this.page.url()).toEqual(url.allItemsPage);
    }

    
    

}