import { faker } from '@faker-js/faker';

describe('Testes de API - ServeRest', () => {
  context('Usuários e Autenticação', () => {
    it('Cenário 1: Autenticação de usuário com sucesso', () => {
      const nome = faker.person.fullName();
      const email = faker.internet.email();
      const password = faker.internet.password();

      cy.apiCriarUsuario(nome, email, password, 'false').then((response) => {
        expect(response.status).to.eq(201);
      });

      cy.apiLogin(email, password).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.message).to.eq('Login realizado com sucesso');
        expect(response.body.authorization).to.include('Bearer');
      });
    });

    it('Cenário 2: Tentativa de criar usuário com e-mail já cadastrado', () => {
      const nome = faker.person.fullName();
      const email = faker.internet.email();
      const password = faker.internet.password();

      cy.apiCriarUsuario(nome, email, password, 'false');

      cy.apiCriarUsuario('Outro Nome', email, 'outrasenha', 'false').then((response) => {
        expect(response.status).to.eq(400);
        expect(response.body.message).to.eq('Este email já está sendo usado');
      });
    });
  });

  context('Produtos e Administradores', () => {
    it('Cenário 3: Listagem de produtos filtrada por ID', () => {
      cy.request({
        method: 'GET',
        url: `${Cypress.expose('apiUrl')}/produtos`
      }).then((responseList) => {
        const idProduto = responseList.body.produtos[0]._id;

        cy.request({
          method: 'GET',
          url: `${Cypress.expose('apiUrl')}/produtos?_id=${idProduto}`
        }).then((responseFiltered) => {
          expect(responseFiltered.status).to.eq(200);
          expect(responseFiltered.body.produtos).to.have.length(1);
          expect(responseFiltered.body.produtos[0]._id).to.eq(idProduto);
        });
      });
    });

    it('Cenário 4: Cadastro de produto via API (Fluxo Administrador)', () => {
      const nomeAdmin = faker.person.fullName();
      const emailAdmin = faker.internet.email();
      const passwordAdmin = faker.internet.password();

      const nomeProduto = faker.commerce.productName() + ' ' + faker.string.uuid(); 
      const precoProduto = faker.number.int({ min: 10, max: 1000 });
      const descProduto = faker.commerce.productDescription();
      const qtdeProduto = faker.number.int({ min: 1, max: 100 });

      cy.apiCriarUsuario(nomeAdmin, emailAdmin, passwordAdmin, 'true');

      cy.apiLogin(emailAdmin, passwordAdmin).then((loginResponse) => {
        const token = loginResponse.body.authorization;

        cy.request({
          method: 'POST',
          url: `${Cypress.expose('apiUrl')}/produtos`,
          headers: {
            Authorization: token
          },
          body: {
            nome: nomeProduto,
            preco: precoProduto,
            descricao: descProduto,
            quantidade: qtdeProduto
          },
          failOnStatusCode: false
        }).then((response) => {
          expect(response.status).to.eq(201);
          expect(response.body.message).to.eq('Cadastro realizado com sucesso');
          expect(response.body._id).to.exist;
        });
      });
    });
  });
});