import { translated } from "../decorator";
import translation from "../translations/translation";
import { dataSynth } from "../utility";

class HomePage {
	get changeLocationButton() { return cy.get(dataSynth("button--delocalise")); }

	@translated("have.text", translation.homePageTexts.collectFromStore)
	get collectFromStoreButton() { return cy.get(dataSynth("tab--collection")); }
	get locationInput() { return cy.get(dataSynth("input--google-places")); }

	searchForLocation = (location: string) => {
		this.locationInput
			.clear()
			.type(location)
			.should("have.attr", "aria-expanded", "true")
			.type("{enter}");
	};
}

export default new HomePage();
