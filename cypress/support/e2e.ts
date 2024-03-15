// ***********************************************************
// This example support/e2e.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import 'cypress-mochawesome-reporter/register';
import homePage from "../pages/homePage";
import storePage from "../pages/storePage";
import { dataSynth } from "../utility";
import "./commands";
import translation from '../translations/translation';

// Alternatively you can use CommonJS syntax:
// require('./commands')

before(() => {
	cy.interceptApi("loadPageRequests", 8);
	cy.visit("/");
	cy.waitForApi("@loadPageRequests", 8);

	cy.ifExist(dataSynth("button--delocalise"), ($element) => {
		$element.click();
	});

	homePage.collectFromStoreButton.should("be.visible").click();
	homePage.locationInput.should("have.attr", "placeholder", translation.homePageTexts.enterYourCollectionLocation);
	cy.fixture("storeDetails").then(storeDetails => {
		homePage.searchForLocation(storeDetails.location);
	})
	cy.interceptApi("loadStoresRequest", 5);
	storePage.orderButton.click()
	cy.waitForApi("@loadStoresRequest", 5);
});
