import basketPage from "../pages/basketPage";
import modifyOrderModel from "../models/modifyOrderModel";
import orderNavigationPage from "../pages/orderNavigationPage";
import orderPastaPage from "../pages/orderPastaPage";
import orderPizzaPage from "../pages/orderPizzaPage";
import TranslationProvider from "../translations/translationProvider";

describe("Testing pizza hut application", () => {

	let { orderPizzaMenuTexts, orderPizzaPageTexts, modifyOrderModelTexts } = TranslationProvider.translation;

	before(() => {
		orderNavigationPage.pizzaMenuButton
			.should("have.text", orderPizzaMenuTexts.pizzas)
			.click();
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
					.should("contain.text", orderPizzaPageTexts.add)
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

		modifyOrderModel.addToppingButton.eq(0).click();
		modifyOrderModel.modifiedPrice.then(($span) => {
			cy.wrap($span.contents()[1].textContent).as("pizzaPrice");
		});
		modifyOrderModel.addToBasketButton
			.should("contain.text", modifyOrderModelTexts.addToMyBasket)
			.click();

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
		orderNavigationPage.pastaMenuButton
			.should("have.text", orderPizzaMenuTexts.pastas)
			.click();
		orderPastaPage.pasteCards.its("length").then(length => {
			cy.wrap(length).as("preFilteredLength");
		});
		orderNavigationPage.vegetarianToggle
			.should("have.text", orderPizzaMenuTexts.vegetarian)
			.click({ force: true });
		orderPastaPage.pasteCards.its("length").then(filteredLength => {
			cy.get("@preFilteredLength").should("be.gt", filteredLength);
		})
		orderPastaPage.nonVegIcons.should("have.length", 0);
		orderNavigationPage.vegetarianToggle.click({ force: true });
	});
});
