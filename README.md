# 🚀 ServeRest QA Challenge - Objective

Este repositório contém a solução do desafio técnico para a posição de QA na Objective, utilizando **Cypress** para automação de testes E2E (Frontend) e de API (Backend).

## 🏗️ Arquitetura e Decisões Técnicas

Para garantir um código limpo, escalável e de fácil manutenção, as seguintes práticas foram adotadas:
- **Independência de Estado:** Uso da API para criar massas de dados dinâmicas (com `@faker-js/faker`) e injetar tokens de autenticação diretamente no `localStorage`, reduzindo o tempo de execução dos testes E2E e evitando dependência entre cenários.
- **Custom Commands:** Abstração das chamadas de API repetitivas (Cadastro e Login) para reutilização.
- **Isolamento de Configuração:** Uso do `cypress.config.js` para separar a `baseUrl` do Frontend e a URL base da API nas variáveis de ambiente.
- **Seletores Resilientes:** Priorização do atributo `data-testid` nas interações de Frontend.

---

## 📝 Cenários de Testes Mapeados

### 💻 Frontend (E2E)
1. **Cadastro de usuário:** Valida o fluxo de inclusão de um usuário comum (Happy Path).
2. **Login Inválido:** Bloqueia o acesso e valida a mensagem de erro ao inserir senha incorreta (Unhappy Path).
3. **Adição ao Carrinho:** Valida a inclusão de produtos na lista do usuário comum logado.
4. **Cadastro de Produto:** Valida o fluxo administrativo de cadastro de um novo item.

### ⚙️ API (Backend)
1. **Autenticação:** Valida o endpoint `POST /login` retornando token válido (Status 200).
2. **Conflito de E-mail:** Valida a restrição ao tentar criar um usuário já existente `POST /usuarios` (Status 400).
3. **Busca Específica:** Valida o filtro de listagem no endpoint `GET /produtos?_id=` (Status 200).
4. **Cadastro de Produto:** Valida a criação de produto com token de administrador `POST /produtos` (Status 201).

---

## ⚙️ Como executar o projeto

### Pré-requisitos
- [Node.js](https://nodejs.org/) instalado.

### Instalação
Clone o repositório e instale as dependências:
```bash
npm install