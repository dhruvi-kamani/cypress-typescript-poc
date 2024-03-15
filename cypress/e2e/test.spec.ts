import basketPage from "../pages/basketPage";
import modifyOrderModel from "../models/modifyOrderModel";
import orderNavigationPage from "../pages/orderNavigationPage";
import orderPastaPage from "../pages/orderPastaPage";
import orderPizzaPage from "../pages/orderPizzaPage";

describe("Testing pizza hut application", () => {

	before(() => {
		orderNavigationPage.pizzaMenuButton.click();
	});

	// This test case selects the first available pizza from the pizza menu
	it("Should select and verify item", () => {
		orderPizzaPage.pizzaCards.eq(0)
			.within(() => {
				// This step exacts the pizza name from the first available pizza card and stored it as alias
				orderPizzaPage.pizzaNameInCard
					.then($element => {
						cy.wrap($element.contents()[0].textContent).as("pizzaName")
					});

				// This step exacts the pizza price from the first available pizza card and stored it as alias
				orderPizzaPage.pizzaPriceInCard
					.invoke("text")
					.as("pizzaPrice");

				// This step basically adds the selected pizza to cart
				orderPizzaPage.pizzaAddButtonInCard.click();
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

		modifyOrderModel.addToppingButton.eq(0).click();
		modifyOrderModel.modifiedPrice.then(($span) => {
			cy.wrap($span.contents()[1].textContent).as("pizzaPrice");
		});
		modifyOrderModel.addToBasketButton.click();

		cy.get("@pizzaPrice").then((price) => {
			basketPage.subTotalValue.should("contain.text", price);
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
