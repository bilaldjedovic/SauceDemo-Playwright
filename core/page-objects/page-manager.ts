import { Page } from "@playwright/test";
import { LoginPage } from "./login-page";
import { NavigationMenu } from "./navigation-page";
import { CartPage } from "./cart-page";
import { CheckoutFormPage } from "./checkout-form-page";
import { CheckoutOverviewPage } from "./checkout-overview-page";
import { AllItemsPage } from "./all-items-page";
import { CheckoutCompletePage } from "./checkout-complete-page";
import { ProductItemPage } from "./product-item-page";

export class PageManager {

    private readonly page: Page;
    private readonly login: LoginPage;
    private readonly navigation: NavigationMenu;
    private readonly allItems: AllItemsPage;
    private readonly cart: CartPage;    
    private readonly checkoutComplete: CheckoutCompletePage;
    private readonly checkoutForm: CheckoutFormPage;
    private readonly checkoutOverview: CheckoutOverviewPage;
    private readonly productItem: ProductItemPage;
    
    constructor(page:Page){
        this.page = page;

        this.login = new LoginPage(this.page);
        this.navigation = new NavigationMenu(this.page);
        this.allItems = new AllItemsPage(this.page);
        this.cart = new CartPage(this.page);
        this.checkoutComplete = new CheckoutCompletePage(this.page);
        this.checkoutForm = new CheckoutFormPage(this.page);
        this.checkoutOverview = new CheckoutOverviewPage(this.page);
        this.productItem = new ProductItemPage(this.page);
    }


    loginPage(){
        return this.login;
    }

    navigationMenu(){
        return this.navigation;
    }

    allItemsPage(){
        return this.allItems;
    }

    cartPage(){
        return this.cart;
    }

    checkoutCompletePage(){
        return this.checkoutComplete;
    }

    checkoutFormPage(){
        return this.checkoutForm;
    }

    checkoutOverviewPage(){
        return this.checkoutOverview;
    }

    productItemPage(){
        return this.productItem;
    }
}