import { dataSynth } from "../utility";

class ModifyOrderPage {
    get addToppingButton() { return cy.get(".add-icon"); }
    get modifiedPrice() { return cy.get(".button__right"); }
    get addToBasketButton() { return cy.get(dataSynth("button--add-to-basket")); }

};

export default new ModifyOrderPage();