import { dataSynth } from "../utility";

class BasketPage {
	get basketItems() { return cy.get(dataSynth("basket-deal-item")); }
	get basketItemName() { return cy.get(dataSynth("basket-item-type--pizza")); }
	get basketItemModifyOrderButton() { return cy.get("a"); }
	get basketItemPrice() { return cy.get(".basket-item-product-price"); }
	get basketItemRemoveButton() { return cy.get(".icon-close"); }
	get subTotalValue() { return cy.get(".subtotal"); }
}

export default new BasketPage();
