# 🚀 ServeRest QA Challenge - Objective

**📊 Dashboard de Relatório:** [https://lucasrls98.github.io/objective-challenge/]

Este repositório contém a solução do desafio técnico para a posição de QA na Objective, utilizando **Cypress** para automação de testes E2E (Frontend) e de API (Backend). A arquitetura foi desenhada com foco em escalabilidade, fiabilidade e boas práticas de mercado.

## 🏗️ Arquitetura e Decisões Técnicas

Para garantir um código limpo e de fácil manutenção, as seguintes práticas e padrões foram adotados:
- **Page Objects Model (POM):** Implementado nos testes de Frontend para separar a camada de interação (seletores e ações) da camada de testes (validações), facilitando a manutenção face a alterações na interface.
- **Independência de Estado & API Bypass:** Uso da API para criar massas de dados dinâmicas (com `@faker-js/faker`) e injetar tokens de autenticação diretamente no `localStorage`. Isto reduz drasticamente o tempo de execução dos testes E2E e evita dependência entre cenários ou instabilidades da UI.
- **Custom Commands:** Abstração das chamadas de API repetitivas (Cadastro e Login) para reutilização e aplicação do princípio DRY.
- **Isolamento de Configuração:** Uso do `cypress.config.js` para separar a `baseUrl` do Frontend e a URL base da API nas variáveis de ambiente, acessadas de forma síncrona com `Cypress.expose`.
- **Seletores Resilientes:** Priorização do atributo `data-testid` nas interações de Frontend, mitigando quebras por refatorizações de CSS.

## ⚙️ Ferramentas e Ecossistema

- **CI/CD (GitHub Actions):** Pipeline configurado para executar a suíte de testes automaticamente em cada `push` ou `pull_request` na branch principal, com deploy automático do relatório de execução.
- **Relatórios Automatizados (Mochawesome):** Geração de relatórios HTML detalhados, com capturas de ecrã (screenshots) incorporadas nativamente em caso de falha. Os relatórios são disponibilizados online através do GitHub Pages.
- **Qualidade de Código (ESLint):** Configuração em Flat Config (`eslint.config.mjs`) com regras específicas do plugin do Cypress para garantir a padronização e prevenir anti-padrões.

---

## 📝 Cenários de Testes Mapeados

### 💻 Frontend (E2E)
1. **Cadastro de utilizador:** Valida o fluxo de inclusão de um utilizador comum (Happy Path).
2. **Login Inválido:** Bloqueia o acesso e valida a mensagem de erro ao inserir uma palavra-passe incorreta (Unhappy Path).
3. **Adição ao Carrinho:** Valida a inclusão de produtos na lista do utilizador comum logado.
4. **Cadastro de Produto:** Valida o fluxo administrativo de registo de um novo item.

### ⚙️ API (Backend)
1. **Autenticação:** Valida o endpoint `POST /login` retornando um token válido (Status 200).
2. **Conflito de E-mail:** Valida a restrição ao tentar criar um utilizador já existente `POST /usuarios` (Status 400).
3. **Busca Específica:** Valida o filtro de listagem no endpoint `GET /produtos?_id=` (Status 200).
4. **Cadastro de Produto:** Valida a criação de produto com token de administrador `POST /produtos` (Status 201).

---

## 🚀 Como executar o projeto

### Pré-requisitos
- [Node.js](https://nodejs.org/) (versão 18 ou superior).

### Instalação
Clone o repositório e instale as dependências:
```bash
npm install
```

### Executando os testes e ferramentas

**1. Executar todos os testes em modo Headless (Gera Relatório HTML):**
```bash
npm run test
```
*Atenção: Este script está configurado com um pre-hook (`pretest`) que executa o Linter automaticamente antes da suíte de testes. Após a execução, o relatório local estará disponível em `cypress/reports/html/index.html`.*

**2. Executar testes separadamente:**
```bash
npm run test:api
npm run test:e2e
```

**3. Verificar a qualidade do código (Linter):**
```bash
npm run lint
```