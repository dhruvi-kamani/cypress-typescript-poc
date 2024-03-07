class OrderPastaPage {
    get pasteCards() { return cy.get(".list-item--side"); }
    get nonVegIcons() { return cy.get("icon-non-veg-india"); }
};

export default new OrderPastaPage();