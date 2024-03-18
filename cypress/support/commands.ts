/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

Cypress.Commands.add("interceptApi", (alias, times = 1, path = "") => {
	cy.intercept({ times }).as(alias);
});

Cypress.Commands.add("waitForApi", (alias, times = 1) => {
	Cypress._.times(times, (number) => {
		cy.wait(alias);
	});
});

Cypress.Commands.add("getAliases", (names) => {
	const values: any[] = [];

	for (const arg of names) {
		cy.get(arg).then((value) => values.push(value));
	}

	return cy.wrap(values);
});

Cypress.Commands.add("ifExist", (selector, callback) => {
	let length = Cypress.$(selector).length;
	if (length) {
		callback(cy.get(selector));
	}
});



declare global {
	namespace Cypress {
		interface Chainable {
			interceptApi(
				alias: string,
				times?: number,
				path?: string
			): Chainable<void>;
			waitForApi(alias: string, times?: number): Chainable<void>;
			getAliases(names: string[]): Chainable<any[]>
			ifExist(selector: string, callback: (element: Chainable<JQuery<HTMLElement>>) => void)
		}
	}
}

export { };
