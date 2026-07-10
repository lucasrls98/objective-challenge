const { defineConfig } = require("cypress");

module.exports = defineConfig({
  allowCypressEnv: false,
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    charts: true,
    reportPageTitle: 'Relatório ServeRest - QA Objective',
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
  },
  expose: {
    apiUrl: "https://serverest.dev"
  },
  e2e: {
    baseUrl: "https://front.serverest.dev",
    defaultCommandTimeout: 10000,
    video: false, 
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
      return config;
    },
  },
});