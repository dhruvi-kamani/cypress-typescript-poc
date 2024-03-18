import { translated } from "../decorator";
import translation from "../translations/translation";
import { dataSynth } from "../utility";

class ModifyOrderModel {
    get addToppingButton() { return cy.get(".add-icon"); }
    get modifiedPrice() { return cy.get(".button__right"); }

    @translated("contain.text", translation.modifyOrderModelTexts.addToMyBasket)
    get addToBasketButton() { return cy.get(dataSynth("button--add-to-basket")); }

};

export default new ModifyOrderModel();