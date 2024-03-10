import ITranslation from "./ITranslation";
import EnglishTranslation from "./englishTranslation";

class TranslationProvider {
    private texts: ITranslation;

    get translation(): ITranslation {
        if (this.texts === undefined) {
            switch (Cypress.env('language')) {
                case "en":
                    this.texts = EnglishTranslation;
                    break;
                default:
                    throw new Error("Not implemented.")
            };
        }
        return this.texts;
    }
};

export default new TranslationProvider();