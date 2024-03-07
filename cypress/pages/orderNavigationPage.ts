import { dataSynth } from "../utility";

class OrderNavigationPage {
	get pizzaMenuButton() { return cy.get(dataSynth("link--pizzas--side")); }
	get pastaMenuButton() { return cy.get(dataSynth("link--pastas--side")); }
	get vegetarianToggle() { return cy.get(".side-menu [role='button']"); }
}

export default new OrderNavigationPage();