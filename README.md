**Backend - API Node.js/Express com PostgreSQL

**Descrição

Este projeto é a API backend desenvolvida em Node.js utilizando Express para um sistema de gerenciamento de usuários e cargos. A API permite:

- Cadastro, listagem, atualização e desativação de usuários e cargos.
- Vinculação de usuários a cargos.
- Autenticação via JWT com token expirando em 60 minutos.
- Renovação de token (refresh token).
  
O banco de dados utilizado é PostgreSQL.

---

**Tecnologias

- Node.js
- Express
- PostgreSQL
- Sequelize (ou outro ORM/Query Builder, conforme implementação)
- JWT para autenticação

---

**Pré-requisitos

- Node.js v16+ instalado
- PostgreSQL instalado e configurado

---

**Instalação

1. Clone este repositório:

```bash
git clone <URL_DO_REPOSITORIO_BACKEND>
cd backend


2.Instale as dependências:
npm install

3.Configure o banco de dados PostgreSQL:
DB_HOST=localhost
DB_PORT=5432
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=nome_do_banco
JWT_SECRET=sua_chave_secreta


4.Inicie a aplicação:
npm run dev

A API estará disponível em http://localhost:3000

Usuário e senha para acessar o sistema:
E-mail:joao3@example.com
Senha:senha_secreta