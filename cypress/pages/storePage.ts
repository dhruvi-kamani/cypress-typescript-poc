import { translated } from "../decorator";
import translation from "../translations/translation";

class StorePage {
	@translated("have.text", translation.storePageTexts.order)
	get orderButton() { return cy.get(".button.button--primary"); }
}

export default new StorePage();