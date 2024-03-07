import { dataSynth } from "../utility";

class HomePage {
	get changeLocationButton() { return cy.get(dataSynth("button--delocalise")); }
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
