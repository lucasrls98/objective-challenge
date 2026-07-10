class ProdutoAdminPage {
  get inputs() {
    return {
      cadastrarMenu: '[data-testid="cadastrarProdutos"]',
      nome: '[data-testid="nome"]',
      preco: '[data-testid="preco"]',
      descricao: '[data-testid="descricao"]',
      quantidade: '[data-testid="quantity"]',
      btnCadastrar: '[data-testid="cadastarProdutos"]' // Mantendo o typo real do ServeRest
    }
  }

  acessarFormulario() {
    cy.get(this.inputs.cadastrarMenu).click();
  }

  preencherFormulario(nome, preco, descricao, quantidade) {
    cy.get(this.inputs.nome).type(nome);
    cy.get(this.inputs.preco).type(preco);
    cy.get(this.inputs.descricao).type(descricao);
    cy.get(this.inputs.quantidade).type(quantidade);
  }

  submeter() {
    cy.get(this.inputs.btnCadastrar).click();
  }
}

export default new ProdutoAdminPage();