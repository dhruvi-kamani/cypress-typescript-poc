import basketPage from "../pages/basketPage";
import modifyOrderPage from "../pages/modifyOrderPage";
import orderNavigationPage from "../pages/orderNavigationPage";
import orderPastaPage from "../pages/orderPastaPage";
import orderPizzaPage from "../pages/orderPizzaPage";

describe("Testing pizza hut application", () => {
	before(() => {
		orderNavigationPage.pizzaMenuButton.click();
	});

	it("Should select and verify item", () => {
		orderPizzaPage.pizzaCards.eq(0)
			.within(() => {
				orderPizzaPage.pizzaNameInCard
					.then($element => {
						cy.wrap($element.contents()[0].textContent).as("pizzaName")
					});
				orderPizzaPage.pizzaPriceInCard
					.invoke("text")
					.as("pizzaPrice");
				orderPizzaPage.pizzaAddButtonInCard
					.click();
			});

		cy.getAliases(["@pizzaName", "@pizzaPrice"]).then(([name, price]) => {
			basketPage.subTotalValue
				.should("contain.text", price);

			basketPage.basketItems.eq(0).within(() => {
				basketPage.basketItemName.should("contain.text", name);
				basketPage.basketItemPrice.should("have.text", price);
			});
		});
	});

	it("Should modify and verify item", () => {
		basketPage.basketItems.eq(0).within(() => {
			basketPage.basketItemModifyOrderButton.click();
		});

		modifyOrderPage.addToppingButton.eq(0).click();
		modifyOrderPage.modifiedPrice.then(($span) => {
			cy.wrap($span.contents()[1].textContent).as("pizzaPrice");
		});
		modifyOrderPage.addToBasketButton.click();

		cy.get("@pizzaPrice").then((price) => {
			basketPage.subTotalValue
				.should("contain.text", price);
		});
	});

	it("Should remove and verify item", () => {
		basketPage.basketItems.eq(0).within(() => {
			basketPage.basketItemRemoveButton.click();
		});
		basketPage.basketItems.should("have.length", 0);
	});

	it("Should filter with vegetarian options", () => {
		orderNavigationPage.pastaMenuButton.click();
		orderPastaPage.pasteCards.its("length").then(length => {
			cy.wrap(length).as("preFilteredLength");
		});
		orderNavigationPage.vegetarianToggle.click({ force: true });
		orderPastaPage.pasteCards.its("length").then(filteredLength => {
			cy.get("@preFilteredLength").should("be.gt", filteredLength);
		})
		orderPastaPage.nonVegIcons.should("have.length", 0);
		orderNavigationPage.vegetarianToggle.click({ force: true });
	});
});
