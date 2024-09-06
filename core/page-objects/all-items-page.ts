import { Page, expect } from "@playwright/test";
import { FilterOptions } from "../helpers/filter-options";


export class AllItemsPage {

  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async addSauceLabsBackPackToTheCart(): Promise<void> {
    await this.page.locator('#add-to-cart-sauce-labs-backpack').click();
    expect(await this.page.locator('#remove-sauce-labs-backpack')).toBeVisible();
    expect(await this.page.locator('.shopping_cart_badge').textContent()).toEqual('1');
  }

  async checkIfAllItemsAreAddedOnCartSpan(count:number){
    expect(Number(await this.page.locator('.shopping_cart_badge').textContent())).toEqual(count);

  }
  async openCart(): Promise<void> {
    await this.page.locator('.shopping_cart_link').click();
  }

  async openSauceLabsBackpackItem(): Promise<void> {
    await this.page.getByText('Sauce Labs Backpack').click();
  }

  async sortAllPrices(): Promise<number[]> {
    const prices = await this.page.locator('.inventory_item_price').allTextContents();
    const priceArray: number[] = [];

    for (let price of prices) {
      let newPrice = price.slice(1);
      priceArray.push(Number(newPrice))

    }

    priceArray.sort((a, b) => {
      return a - b;
    });
    return priceArray;
  }


  async getSortedPricesLow() {
    let priceArray = await this.sortAllPrices();
    const sortedPricesWithDollarSign = priceArray.map((price) => `$${price}`);
    return sortedPricesWithDollarSign;
  }

  async getSortedPricesHigh() {
    let priceArray = await this.sortAllPrices();
    priceArray.reverse();
    const sortedPricesWithDollarSign = priceArray.map((price) => `$${price}`);
    return sortedPricesWithDollarSign;
  }

  async sortAllTitlesZA() {
    let titlesArray = await this.sortAllTitlesAZ();
    return titlesArray.reverse();
  }

  async sortAllTitlesAZ() {
    let titles = await this.page.locator('.inventory_item_name').allTextContents();
    const titlesArray: string[] = [];

    for (let title of titles) {

      titlesArray.push(title);
    }

    return titlesArray.sort();
  }

  async applyAllFilterOptions() {
    const dropdown = await this.page.$('select.product_sort_container');
    if (dropdown) {
      const options = await dropdown.$$eval('option', (options) => {
        return options.map((option) => option.value);
      });

      for (let option in options) {
        await this.page.locator('.product_sort_container').selectOption(options[option]);

        let firstTitle = await this.page.locator('.inventory_item_name').first().textContent();
        let firstPrice = await this.page.locator('.inventory_item_price').first().textContent();

        let lowToHigh = await this.getSortedPricesLow();
        let highToLow = await this.getSortedPricesHigh();

        let nameToAZ = await this.sortAllTitlesAZ();
        let nameToZA = await this.sortAllTitlesZA();

        switch (true) {
          case (options[option] === FilterOptions.NAMETOZ):
            expect(firstTitle).toEqual(nameToAZ[0]);
            break;
          case (options[option] === FilterOptions.NAMETOA):
            expect(firstTitle).toEqual(nameToZA[0]);
            break;
          case (options[option] === FilterOptions.LOWTOHIGH):
            expect(firstPrice).toEqual(lowToHigh[0]);
            break;
          case (options[option] === FilterOptions.HIGHTOLOW):
            expect(firstPrice).toEqual(highToLow[0]);
            break;
          default:
            continue;

        }


      }
    }

  }

  count:number = 0;

  async clickAllAddToCartButtons(){

    const buttons = this.page.locator('.pricebar button');

    console.log(buttons);



    for(let button of await buttons.all()){

     if(await button.textContent() === 'Add to cart') {
      
      this.count++;
      await button.click();
     }

    }

  }

  async checkIfAllButtonsAreClicked(){
    const buttons = this.page.locator('.pricebar button');

    for(let button of await buttons.all()){


      expect(await button.textContent()).toEqual('Remove');
 
     }

  }


}
