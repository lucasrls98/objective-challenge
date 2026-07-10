// cypress/e2e/frontend/serverest_front.cy.js
import { faker } from '@faker-js/faker';
import CadastroPage from '../../support/pages/CadastroPage';
import LoginPage from '../../support/pages/LoginPage';
import ProdutoAdminPage from '../../support/pages/ProdutoAdminPage';

describe('Testes de Frontend (E2E) - ServeRest', () => {
  
  context('Usuários e Autenticação', () => {
    it('Cenário 1: Cadastro de novo usuário comum com sucesso', () => {
      const nome = faker.person.fullName();
      const email = faker.internet.email();
      const password = faker.internet.password();

      CadastroPage.acessar();
      CadastroPage.preencherFormulario(nome, email, password);
      CadastroPage.submeter();

      cy.url().should('include', '/home');
      cy.contains('h1', 'Serverest Store').should('be.visible');
    });

    it('Cenário 2: Tentativa de login com senha inválida', () => {
      const nome = faker.person.fullName();
      const email = faker.internet.email();
      const passwordValida = faker.internet.password();

      cy.apiCriarUsuario(nome, email, passwordValida, 'false');

      LoginPage.acessar();
      LoginPage.fazerLogin(email, 'senhaInvalida123');

      cy.contains('span', 'Email e/ou senha inválidos').should('be.visible');
    });
  });

  context('Fluxos de Compra e Administração', () => {
    it('Cenário 3: Adicionar produto ao carrinho', () => {
      const nome = faker.person.fullName();
      const email = faker.internet.email();
      const password = faker.internet.password();

      cy.apiCriarUsuario(nome, email, password, 'false');
      cy.apiLogin(email, password).then((response) => {
        const token = response.body.authorization;
        cy.visit('/home', {
          onBeforeLoad(win) {
            win.localStorage.setItem('serverest/userToken', token);
          }
        });
      });

      cy.get('[data-testid="adicionarNaLista"]').first().click();

      cy.url().should('include', '/minhaListaDeProdutos');
      cy.contains('h1', 'Lista de Compras').should('be.visible');
    });

    it('Cenário 4: Cadastro de novo produto (Fluxo Administrador)', () => {
      const nomeAdmin = faker.person.fullName();
      const emailAdmin = faker.internet.email();
      const passwordAdmin = faker.internet.password();
      const nomeProduto = faker.commerce.productName() + ' ' + faker.string.uuid();
      
      cy.apiCriarUsuario(nomeAdmin, emailAdmin, passwordAdmin, 'true');
      cy.apiLogin(emailAdmin, passwordAdmin).then((response) => {
        const token = response.body.authorization;
        cy.visit('/admin/home', {
          onBeforeLoad(win) {
            win.localStorage.setItem('serverest/userToken', token);
          }
        });
      });

      ProdutoAdminPage.acessarFormulario();
      ProdutoAdminPage.preencherFormulario(nomeProduto, '250', 'Produto exclusivo automatizado', '15');
      ProdutoAdminPage.submeter();

      cy.url().should('include', '/admin/listarprodutos');
      cy.contains('td', nomeProduto).should('be.visible');
    });
  });
});