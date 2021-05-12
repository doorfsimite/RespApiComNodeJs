# RespApiComNodeJs
Desenvolvi essa API simples de agendamento de atendimentos seguindo um curso da alura para praticar a criação de uma Rest API com nodeJs

Possui as rotas
- `POST localhost:3000/atendimentos`

Deve receber no corpo da requisição um objeto json ou no formato x-www-form-urlencoded com os seguintes campos: client, pet, servico, status, observacoes, data.

- `GET localhost:3000/atendimentos`

Lista todos os atendimentos do banco de dados

- `GET localhost:3000/atendimentos/:id`

Retorna um agendamento com o id passado como parametro da requisição

- `PATCH localhost:3000/atendimentos/:id`

Altera um campo específico enviado no corpo da requisição do registro com id passado no parametro

A API tem integração com MySQL para manter a persistencia dos dados. Além de utilizar as bibliotecas **consign** e **moment** para da suporte a algumas funcionalidades

Basicamente é isso :)
