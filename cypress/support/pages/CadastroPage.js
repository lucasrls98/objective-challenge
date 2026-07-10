class CadastroPage {
  get inputs() {
    return {
      nome: '[data-testid="nome"]',
      email: '[data-testid="email"]',
      password: '[data-testid="password"]',
      btnCadastrar: '[data-testid="cadastrar"]'
    }
  }

  // Ações da página
  acessar() {
    cy.visit('/cadastrarusuarios');
  }

  preencherFormulario(nome, email, password) {
    cy.get(this.inputs.nome).type(nome);
    cy.get(this.inputs.email).type(email);
    cy.get(this.inputs.password).type(password);
  }

  submeter() {
    cy.get(this.inputs.btnCadastrar).click();
  }
}

export default new CadastroPage();