const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    charts: true,
    reportPageTitle: 'Relatório ServeRest - QA Objective',
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
  },
  e2e: {
    baseUrl: "https://front.serverest.dev",
    env: {
      apiUrl: "https://serverest.dev"
    },
    defaultCommandTimeout: 10000,
    video: false, 
    setupNodeEvents(on, config) {
      // Habilita o plugin de relatórios
      require('cypress-mochawesome-reporter/plugin')(on);
      return config;
    },
  },
});