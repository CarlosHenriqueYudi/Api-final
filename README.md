Tecnologias utilizadas:
-Node.js
-Express
-SQLite
-JWT (JSON Web Token)

Instalação
1. Clonar o projeto
git clone https://github.com/CarlosHenriqueYudi/Api-final.git
cd api-livros

2. Instalar dependências
npm install

3. Criar e popular o banco
node seed.js

4. Iniciar o servidor
node server.js


A API estará disponível em:

http://localhost:3000/api

Autenticação

A API utiliza JWT para proteger rotas sensíveis.

Login
Request
POST /api/login

{
  "usuario": "admin"
}

Response
{
  "token": "seu_token_aqui"
}


Use o token nas rotas protegidas:

Authorization: Bearer SEU_TOKEN

Rotas da API
1. Listar livros

GET /api/livros

{
  "pagina": 1,
  "limite": 5,
  "total": 5,
  "dados": [
    {
      "id": 1,
      "titulo": "Dom Casmurro",
      "autor_id": 1,
      "ano": 1899
    }
  ]
}

Filtros
Por título
GET /api/livros?titulo=harry

Por autor
GET /api/livros?autor_id=5

Por ano
GET /api/livros?ano=1997

Ordenação
GET /api/livros?sort=ano&order=desc

Paginação
GET /api/livros?page=1&limit=5

Todos os registros
GET /api/livros?limit=all

2. Buscar livro por ID

GET /api/livros/1

{
  "id": 1,
  "titulo": "Dom Casmurro",
  "autor_id": 1,
  "ano": 1899
}

404
{
  "erro": "Livro não encontrado"
}

3. Livros com autores (JOIN)

GET /api/livros-com-autores

[
  {
    "id": 1,
    "titulo": "Dom Casmurro",
    "autor": "Machado de Assis",
    "ano": 1899
  }
]

4. Criar livro

POST /api/livros

Header:

Authorization: Bearer TOKEN


Body:

{
  "titulo": "Novo Livro",
  "autor_id": 1,
  "ano": 2024
}

{
  "id": 21,
  "titulo": "Novo Livro",
  "autor_id": 1,
  "ano": 2024
}

400
{
  "erro": "Dados inválidos"
}

5. Atualizar livro

PUT /api/livros/1


Header:

Authorization: Bearer TOKEN

Body:

{
  "titulo": "Livro Atualizado",
  "autor_id": 1,
  "ano": 2025
}

{
  "id": 1,
  "titulo": "Livro Atualizado",
  "autor_id": 1,
  "ano": 2025
}

6. Deletar livro

DELETE /api/livros/1


Header:

Authorization: Bearer TOKEN

{
  "mensagem": "Livro removido"
}

Tratamento de erros
400 - Dados inválidos
{
  "erro": "Dados inválidos"
}

401 - Token não fornecido
{
  "erro": "Token não fornecido"
}

403 - Token inválido
{
  "erro": "Token inválido"
}

404 - Não encontrado
{
  "erro": "Livro não encontrado"
}

500 - Erro interno
{
  "erro": "Erro interno do servidor"
}

Rodar os testes automatizados:

npm test
