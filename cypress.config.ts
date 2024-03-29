import { defineConfig } from "cypress";

export default defineConfig({
	reporter: 'cypress-mochawesome-reporter',
	e2e: {
		baseUrl: "https://www.pizzahut.co.in/",
		specPattern: "cypress/e2e/**/*.{spec,cy}.ts",
		testIsolation: false,
		setupNodeEvents(on, config) {
			require('cypress-mochawesome-reporter/plugin')(on);
		},
	},
});