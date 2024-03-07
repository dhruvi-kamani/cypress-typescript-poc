import { defineConfig } from "cypress";

export default defineConfig({
	e2e: {
		baseUrl: "https://www.pizzahut.co.in/",
		specPattern: "cypress/e2e/**/*.{spec,cy}.ts",
		testIsolation: false,
		setupNodeEvents(on, config) {
			// implement node event listeners here
		},
	},
});
