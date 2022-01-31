## Microsserviço de autenticação de usuário com NodeJs

### Dependências e bibliotecas

- Typescript
- Express
- PostGresql
- JWT (jsonwebtoken)

### Ferramentas externas

- [ElephantSQL]
- [Postman]
- [JWT.IO]

### Composição do projeto

_Endpoints_ do projeto:
Usuários

- GET /users
- GET /users/:uuid
- POST /users
- PUT /users/:uuid
- DELETE /users/:uuid

_Endpoints_ de autenticação

- POST /token
- POST /token/validate

[elephantsql]: https://www.elephantsql.com/
[postman]: https://www.postman.com/
[jwt.io]: https://jwt.io/
