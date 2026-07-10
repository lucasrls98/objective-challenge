class LoginPage {
  get inputs() {
    return {
      email: '[data-testid="email"]',
      senha: '[data-testid="senha"]',
      btnEntrar: '[data-testid="entrar"]'
    }
  }

  acessar() {
    cy.visit('/login');
  }

  fazerLogin(email, senha) {
    cy.get(this.inputs.email).type(email);
    cy.get(this.inputs.senha).type(senha);
    cy.get(this.inputs.btnEntrar).click();
  }
}

export default new LoginPage();