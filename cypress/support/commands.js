Cypress.Commands.add('apiCriarUsuario', (nome, email, password, administrador = 'false') => {
  return cy.request({
    method: 'POST',
    url: `${Cypress.expose('apiUrl')}/usuarios`,
    body: {
      nome,
      email,
      password,
      administrador
    },
    failOnStatusCode: false
  });
});

Cypress.Commands.add('apiLogin', (email, password) => {
  return cy.request({
    method: 'POST',
    url: `${Cypress.expose('apiUrl')}/login`,
    body: { email, password },
    failOnStatusCode: false
  });
});