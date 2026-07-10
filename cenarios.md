# Planejamento de Testes Automatizados - ServeRest

Este documento descreve os cenários de testes mapeados e automatizados para a plataforma ServeRest (Frontend e API), cobrindo fluxos principais e alternativos para usuários comuns e administradores.

## 💻 Cenários de Frontend (E2E)

**Cenário 1: Cadastro de novo usuário comum com sucesso (Fluxo Principal)**
- **Dado** que acesso a página de cadastro do ServeRest
- **Quando** preencho os dados válidos para um novo usuário comum
- **E** clico no botão de cadastrar
- **Então** devo ser redirecionado para a página inicial
- **E** devo ver a mensagem de boas-vindas com o meu nome

**Cenário 2: Tentativa de login com senha inválida (Cenário Alternativo)**
- **Dado** que possuo um usuário previamente cadastrado
- **Quando** acesso a página de login
- **E** preencho o campo de e-mail corretamente
- **Mas** preencho o campo de senha com um valor incorreto
- **Então** o sistema deve bloquear o acesso
- **E** exibir a mensagem de erro "Email e/ou senha inválidos"

**Cenário 3: Adicionar produto ao carrinho (Fluxo Principal - Usuário Comum)**
- **Dado** que estou logado no sistema como usuário comum
- **Quando** pesquiso por um produto existente na lista
- **E** clico em "Adicionar na lista"
- **Então** o produto deve ser incluído no meu carrinho de compras com sucesso

**Cenário 4: Cadastro de novo produto (Fluxo Principal - Administrador)**
- **Dado** que estou logado no sistema com um perfil de Administrador
- **Quando** acesso a página de cadastro de produtos
- **E** preencho o formulário com dados válidos do novo produto
- **E** clico no botão "Cadastrar"
- **Então** o produto deve ser listado na tabela de produtos
- **E** o sistema deve exibir uma mensagem de sucesso

---

## ⚙️ Cenários de API (Backend)

**Cenário 1: Autenticação de usuário com sucesso (Fluxo Principal)**
- **Endpoint:** `POST /login`
- **Dado** que possuo credenciais válidas de um usuário ativo
- **Quando** envio uma requisição de login com esses dados
- **Então** a API deve retornar o Status Code `200 OK`
- **E** o corpo da resposta deve conter uma mensagem de sucesso e um token de autorização

**Cenário 2: Tentativa de criar usuário com e-mail já cadastrado (Cenário Alternativo)**
- **Endpoint:** `POST /usuarios`
- **Dado** que existe um usuário cadastrado com o e-mail "teste@qa.com.br"
- **Quando** envio uma requisição para criar um novo usuário utilizando o mesmo e-mail
- **Então** a API deve retornar o Status Code `400 Bad Request`
- **E** o corpo da resposta deve conter a mensagem "Este email já está sendo usado"

**Cenário 3: Listagem de produtos filtrada por ID (Busca Específica)**
- **Endpoint:** `GET /produtos`
- **Dado** que tenho o ID de um produto previamente cadastrado
- **Quando** envio uma requisição de listagem passando o ID como _query parameter_ (`?_id=X`)
- **Então** a API deve retornar o Status Code `200 OK`
- **E** a lista de produtos na resposta deve conter apenas o item correspondente ao ID informado

**Cenário 4: Cadastro de produto via API (Fluxo Principal - Administrador)**
- **Endpoint:** `POST /produtos`
- **Dado** que possuo um token de autorização válido de um usuário Administrador
- **Quando** envio uma requisição com os dados de um novo produto
- **Então** a API deve retornar o Status Code `201 Created`
- **E** o corpo da resposta deve confirmar o cadastro com a mensagem "Cadastro realizado com sucesso"