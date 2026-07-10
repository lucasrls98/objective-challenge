// cypress/e2e/frontend/serverest_front.cy.js
import { faker } from '@faker-js/faker';

describe('Testes de Frontend (E2E) - ServeRest', () => {
  
  context('Usuários e Autenticação', () => {
    it('Cenário 1: Cadastro de novo usuário comum com sucesso', () => {
      const nome = faker.person.fullName();
      const email = faker.internet.email();
      const password = faker.internet.password();

      // Ação: Navega e interage com a UI
      cy.visit('/cadastrar');
      cy.get('[data-testid="nome"]').type(nome);
      cy.get('[data-testid="email"]').type(email);
      cy.get('[data-testid="password"]').type(password);
      cy.get('[data-testid="cadastrar"]').click();

      // Validações
      cy.url().should('include', '/home');
      cy.contains('h1', 'Serverest Store').should('be.visible');
    });

    it('Cenário 2: Tentativa de login com senha inválida', () => {
      const nome = faker.person.fullName();
      const email = faker.internet.email();
      const passwordValida = faker.internet.password();

      // Preparação: Cria usuário via API para garantir que ele existe
      cy.apiCriarUsuario(nome, email, passwordValida, 'false');

      // Ação: Interage com a UI tentando logar com senha errada
      cy.visit('/login');
      cy.get('[data-testid="email"]').type(email);
      cy.get('[data-testid="senha"]').type('senhaInvalida123');
      cy.get('[data-testid="entrar"]').click();

      // Validação
      cy.contains('span', 'Email e/ou senha inválidos').should('be.visible');
    });
  });

  context('Fluxos de Compra e Administração', () => {
    it('Cenário 3: Adicionar produto ao carrinho', () => {
      const nome = faker.person.fullName();
      const email = faker.internet.email();
      const password = faker.internet.password();

      // Preparação: Cria usuário e faz login via API (bypass do login de UI para ganhar velocidade)
      cy.apiCriarUsuario(nome, email, password, 'false');
      
      // O ServeRest salva o token no localStorage, podemos injetar isso via script
      cy.apiLogin(email, password).then((response) => {
        const token = response.body.authorization;
        
        // Entrando na página já autenticado
        cy.visit('/home', {
          onBeforeLoad(win) {
            win.localStorage.setItem('serverest/userToken', token);
          }
        });
      });

      // Ação: Na tela inicial, clica no primeiro botão de adicionar à lista
      cy.get('[data-testid="adicionarNaLista"]').first().click();

      // Validação
      cy.url().should('include', '/minhaListaDeProdutos');
      cy.contains('h1', 'Lista de Compras').should('be.visible');
    });

    it('Cenário 4: Cadastro de novo produto (Fluxo Administrador)', () => {
      const nomeAdmin = faker.person.fullName();
      const emailAdmin = faker.internet.email();
      const passwordAdmin = faker.internet.password();

      const nomeProduto = faker.commerce.productName() + ' ' + faker.string.uuid();
      
      // Preparação: Cria um ADMIN via API e faz bypass no login
      cy.apiCriarUsuario(nomeAdmin, emailAdmin, passwordAdmin, 'true');
      cy.apiLogin(emailAdmin, passwordAdmin).then((response) => {
        const token = response.body.authorization;
        cy.visit('/admin/home', {
          onBeforeLoad(win) {
            win.localStorage.setItem('serverest/userToken', token);
          }
        });
      });

      // Ação: Navega e preenche formulário de produto
      cy.get('[data-testid="cadastrarProdutos"]').click();
      cy.get('[data-testid="nome"]').type(nomeProduto);
      cy.get('[data-testid="preco"]').type('250');
      cy.get('[data-testid="descricao"]').type('Produto exclusivo automatizado');
      cy.get('[data-testid="quantidade"]').type('15');
      
      cy.get('[data-testid="cadastrarProduto"]').click();

      // Validação
      cy.url().should('include', '/admin/listarprodutos');
      cy.contains('td', nomeProduto).should('be.visible');
    });
  });
});