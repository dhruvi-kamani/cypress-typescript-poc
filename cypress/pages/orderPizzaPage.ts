import { partialDataSynth } from "../utility";

class OrderPizzaPage {
	get pizzaCards() { return cy.get(".list-item--pizza"); }
	get pizzaNameInCard() { return cy.get(".list-item__name"); }
	get pizzaAddButtonInCard() { return cy.get(partialDataSynth("button--")); }
	get pizzaPriceInCard() { return cy.get(`${partialDataSynth("button--")} .w-auto`); }
}

export default new OrderPizzaPage();