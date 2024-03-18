import ITranslation from "./ITranslation"
import englishTranslation from "./englishTranslation";

let translationObj: ITranslation;

const translation = new Proxy<ITranslation>(englishTranslation, {
    get: (target, key) => {
        translationObj = translationObj || (() => {
            switch (Cypress.env('language')) {
                // case "hn": return hindiTranslation;
                default: return target;
            }
        })();
        return key in translationObj ? translationObj[key as keyof ITranslation] : undefined;
    },
});

export default translation;