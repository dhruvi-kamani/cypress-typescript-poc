export function translated(translatedCondition: "have.text" | "contain.text", value: string) {
    return (target: any, key: string, descriptor: PropertyDescriptor) => {
        let originalGet = descriptor.get;
        if (!Cypress.env("skipTranslation")) {
            descriptor.get = () => {
                return originalGet().should(translatedCondition, value);
            }
        }
        return descriptor;
    }
}