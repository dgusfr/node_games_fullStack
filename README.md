# Node.js Games API

Uma API simples para gerenciar jogos, permitindo operações CRUD (Create, Read, Update, Delete) em um 'banco de dados' em memória utilizando Node.js e Express.

## Sumário

- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Status](#status)
- [Descrição](#descrição)
- [Documentação completa da API](#documentação-completa-da-api)
- [Como Usar](#como-usar)
- [Autor](#autor)

## Tecnologias Utilizadas

<div style="display: flex; flex-direction: row;">
  <div style="margin-right: 20px; display: flex; justify-content: flex-start;">
    <img src="img/js.png" alt="Logo JavaScript" width="220"/>
  </div>
  <div style="margin-right: 20px; display: flex; justify-content: flex-start;">
    <img src="img/node.png" alt="Logo Node.js" width="250"/>
  </div>
</div>

## Status

![Concluído](http://img.shields.io/static/v1?label=STATUS&message=CONCLUIDO&color=GREEN&style=for-the-badge)

## Descrição

Este projeto é uma API simples desenvolvida com Node.js e Express que permite gerenciar uma lista de jogos.

A API suporta operações CRUD (Create, Read, Update, Delete) em um banco de dados em memória para manipular informações de jogos, como título, ano e preço. Ela serve como um exemplo básico para entender como criar uma API REST com Node.js e Express.

#### DataBase Local:

```
const dataBase = {
  games: {
    1: { title: "Call of Duty MW", year: 2019, price: 60 },
    2: { title: "Sea of Thieves", year: 2018, price: 40 },
    3: { title: "Minecraft", year: 2012, price: 20 },
  },
};
```

## Documentação completa da API

### Endpoints

#### GET /games

Retorna a lista de todos os jogos.

- **URL**: `/games`
- **Método**: `GET`
- **Respostas de Sucesso**:
  - **Código**: 200 OK
    - **Conteúdo**: JSON com a lista de jogos.

#### GET /game/:id

Retorna os detalhes de um jogo específico pelo ID.

- **URL**: `/game/:id`
- **Método**: `GET`
- **Parâmetros de URL**:
  - `id`: ID do jogo.
- **Respostas de Sucesso**:
  - **Código**: 200 OK
    - **Conteúdo**: JSON com os detalhes do jogo.
- **Erros**:
  - **Código**: 400 Bad Request
    - **Conteúdo**: Mensagem indicando que o ID é inválido.
  - **Código**: 404 Not Found
    - **Conteúdo**: Mensagem indicando que o jogo não foi encontrado.

#### POST /games

Adiciona um novo jogo.

- **URL**: `/games`
- **Método**: `POST`
- **(Header) Cabeçalhos Requeridos**:
  - `Content-Type: application/json`
- **(Body) Dados do Corpo da requisição em JSON**:
  - `title` (string): Título do jogo.
  - `year` (number): Ano de lançamento.
  - `price` (number): Preço do jogo.
- **Respostas de Sucesso**:
  - **Código**: 201 Created
    - **Conteúdo**: JSON com mensagem de sucesso e ID do novo jogo.
- **Erros**:
  - **Código**: 400 Bad Request
    - **Conteúdo**: Mensagem indicando que os parâmetros são inválidos.

#### PUT /game/:id

Atualiza as informações de um jogo existente.

- **URL**: `/game/:id`
- **Método**: `PUT`
- **Parâmetros de URL**:
  - `id`: ID do jogo.
- **(Header) Cabeçalhos Requeridos**:
  - `Content-Type: application/json`
- **(Body) Dados do Corpo da requisição em JSON**:
  - `title` (string, opcional): Novo título do jogo.
  - `year` (number, opcional): Novo ano de lançamento.
  - `price` (number, opcional): Novo preço do jogo.
- **Respostas de Sucesso**:
  - **Código**: 200 OK
    - **Conteúdo**: Mensagem de sucesso indicando que o jogo foi atualizado.
- **Erros**:
  - **Código**: 400 Bad Request
    - **Conteúdo**: Mensagem indicando que o ID é inválido.
  - **Código**: 404 Not Found
    - **Conteúdo**: Mensagem indicando que o jogo não foi encontrado.

#### DELETE /game/:id

Deleta um jogo pelo ID.

- **URL**: `/game/:id`
- **Método**: `DELETE`
- **Parâmetros de URL**:
  - `id`: ID do jogo.
- **Respostas de Sucesso**:
  - **Código**: 200 OK
    - **Conteúdo**: Mensagem de sucesso indicando que o jogo foi deletado.
- **Erros**:
  - **Código**: 400 Bad Request
    - **Conteúdo**: Mensagem indicando que o ID é inválido.
  - **Código**: 404 Not Found
    - **Conteúdo**: Mensagem indicando que o jogo não foi encontrado.

## Como Usar

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/seu-usuario/seu-repositorio.git
   ```

2. **Instale as dependências:**

   ```bash
   cd seu-repositorio
   npm install
   ```

3. **Inicie o servidor:**

   ```bash
   node index.js
   ```

4. **O servidor será iniciado na porta 3000.**

### Teste de API

Você pode usar ferramentas como Postman ou Insomnia para fazer requisições aos endpoints da API.

Executar os testes automatizados ou pode utilizar os testes automatizados usando:

```bash
node api_tests.js
```

Isso irá executar uma série de testes para verificar se a API está funcionando corretamente.

#### Retorno esperado do teste automatizado:

```
Iniciando os testes da API...
Lista dos games: {
  '1': { title: 'Call of Duty MW', year: 2019, price: 60 },
  '2': { title: 'Sea of Thieves', year: 2018, price: 40 },
  '3': { title: 'Minecraft', year: 2012, price: 20 }
}
Detalhes do game com ID 1: { title: 'Call of Duty MW', year: 2019, price: 60 }
Novo Jogo Adicionado: { message: 'Jogo adicionado com sucesso', id: 4 }
Jogo com ID 2 Atualizado: Jogo atualizado com sucesso
Lista dos games: {
  '1': { title: 'Call of Duty MW', year: 2019, price: 60 },
  '2': { title: 'The Witcher 3: Wild Hunt', year: 2015, price: 55 },
  '3': { title: 'Minecraft', year: 2012, price: 20 },
  '4': { title: 'Medal of Honor', year: 2007, price: 250 }
}
Jogo com ID 1 removido com sucesso.
Lista dos games: {
  '2': { title: 'The Witcher 3: Wild Hunt', year: 2015, price: 55 },
  '3': { title: 'Minecraft', year: 2012, price: 20 },
  '4': { title: 'Medal of Honor', year: 2007, price: 250 }
}
Testes concluídos.
```

## Autor

Desenvolvido por Diego Franco
