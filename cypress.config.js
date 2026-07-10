const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    // A baseUrl agiliza o carregamento do frontend e limpa o código nos testes (ex: cy.visit('/login'))
    baseUrl: "https://front.serverest.dev",
    
    // Variáveis de ambiente customizadas para o projeto
    env: {
      apiUrl: "https://serverest.dev"
    },

    // Configurações recomendadas para estabilidade e CI/CD
    defaultCommandTimeout: 10000, 
    video: false, 
    screenshotOnRunFailure: true,

    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});

