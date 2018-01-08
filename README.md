# Teste Prático - Amigo Secreto

Teste prático de Full Stack para resolver o seguinte problema proposto:

> Um programa que simule uma festa de Amigo Secreto, cadastrando os participantes, realizando o sorteio e enviando e-mails comunicando aos participantes quem foi sorteado.


## Back-end

Todo o back-end encontra-se na pasta `server`.


### Tecnologias Utilizadas

- Node.js;  
- Hapi.js;  
- MongoDB;  
- Mongoose;  
- Nodemailer.


## Front-end

Todo o front-end encontra-se na pasta `client`.


### Tecnologias Utilizadas

- Angular.js 1.x;  
- Bootstrap;
- SASS-SCSS.


## Instalação Local

Para rodar localmente em seu computador, é necessário ter instalado algumas depedências globais:

- Node.js;  
- NPM;  
- MongoDB;  
- node-sass;  
- live-server;  
- nodemon.

Após ter as dependências supracitadas instaladas de forma global em seu computador, siga os passos abaixo.

1. Em uma aba do terminal, execute o comando `npm run devServer` para executar o servidor do projeto, com o back-end.  
2. Abra uma nova aba no terminal, e, executa o comando `npm run devClient` para executar a interface do projeto, com o front-end.


## NPM Scripts

Por padrão, o projeto possui alguns **NPM Scripts** para facilitar, sendo:


### `devServer`

Script responsável por executar o servidor, com o back-end.


### `devClient`

Script responsável por executar a interface do projeto, com o front-end.


### `sassWatch`

Script responsável por compilar o SCSS do projeto. Esse comando fica assistindo (*watch*) todas as modificações nos arquivos SCSS do projeto para realizar a compilação.

Tal script é recomendado utilizar enquanto estiver em fase de desenvolvimento, para mudanças CSS serem aplicadas em tempo real.


### `sassBuild`

Script responsável por compilar o SCSS final do projeto.


## Endpoints

A documentação da API do projeto será descrita a seguir.

Também, na raiz do projeto, é possível encontrar o arquivo `K121_08012018_1339.json`. Ele, é possível importá-lo no Postman, para realizar testes nas endpoints do projeto.

A URI base para a API é: `http://localhost:4040/api/v1`.


### 1. Nova Festa de Amigo Secreto - POST
#### URI: `http://localhost:4040/api/v1/party`

Aqui criamos uma nova festa de amigo secreto. É através dela que iremos vincular os participantes, bem como a data do evento e quantidade de participantes.

Basta realizar uma requisição do tipo POST, enviando um JSON como o exemplo a seguir:

```js  
{
  "dataEvento": "Thu Jan 13 2018 00:00:00 GMT-0200 (-02)",
  "numPessoas": 4
}
```


### 2. Adicionar participante - POST
#### URI: `http://localhost:4040/api/v1/lottery/:id_party`

Aqui adicionamos os participantes da festa de Amigo Secreto.

Fazendo uma requisição do tipo POST, passando como parâmetro na URI o ID da festa do Amigo Secreto, e, um JSON como o exemplo a seguir:

```js  
{
  "nome": "Fulano da Silva",
  "email": "fulano@da.silva"
}
```


### 3. Realizar sorteio - GET
#### URI: `http://localhost:4040/api/v1/lottery/:id_party/sendMail`

Aqui realizamos o sorteio do Amigo Secreto. Basta enviar uma requisição do tipo GET, enviando como parâmetro na URI o ID da festa do Amigo Secreto.


### 4. Enviar e-mails - GET
#### URI: `http://localhost:4040/api/v1/lottery/:id_party/sort`

E por fim, enviamos os e-mails com o `nodemailer` para os participantes com o nome do seu participante sorteado.

Basta enviar uma requisição do tipo GET, enviando como parâmetro na URI o ID da festa do Amigo Secreto.
