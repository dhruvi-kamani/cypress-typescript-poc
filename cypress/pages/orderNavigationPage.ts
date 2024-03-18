import { translated } from "../decorator";
import translation from "../translations/translation";
import { dataSynth } from "../utility";

class OrderNavigationPage {
	@translated("have.text", translation.orderPizzaMenuTexts.pizzas)
	get pizzaMenuButton() { return cy.get(dataSynth("link--pizzas--side")); }

	@translated("have.text", translation.orderPizzaMenuTexts.pastas)
	get pastaMenuButton() { return cy.get(dataSynth("link--pastas--side")); }

	@translated("have.text", translation.orderPizzaMenuTexts.vegetarian)
	get vegetarianToggle() { return cy.get(".side-menu [role='button']"); }
}

export default new OrderNavigationPage();