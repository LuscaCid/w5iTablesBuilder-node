# Projeto W5i Tables Builder

# Gerenciador de Banco de Dados para Adianti Framework

Este projeto é um gerenciador de banco de dados criado para facilitar a administração de bancos de dados no **Adianti Framework**. A aplicação utiliza **HTML5 Canvas** para fornecer uma interface **dinâmica** e **intuitiva**, onde é possível visualizar e manipular tabelas e suas relações de forma visual e acessível.

## Funcionalidades

- Interface gráfica para gerenciar tabelas de banco de dados.
- Manipulação visual das relações entre tabelas.
- Gerenciamento dinâmico e simplificado utilizando **HTML5 Canvas**.
- Integração com bancos de dados PostgreSQL e MongoDB.

## Pré-requisitos

- **Node.js** (>= 17.x)
- **NestJS** (framework utilizado no projeto)
- **Docker** (opcional, se preferir rodar com container)

### Este é um projeto desenvolvido utilizando o framework NestJS.

## Configurações Necessárias

Antes de iniciar o projeto, certifique-se de que você possui as seguintes configurações em seus arquivos `.env` e `firebase.json`.

### Configurações do Firebase

Você precisará de um arquivo `firebase.json` contendo o secret do Firebase Admin SDK para autenticação e gerenciamento do Firebase.

### Variáveis de Ambiente

Você também precisará configurar variáveis de ambiente no arquivo `.env`. Aqui estão as variáveis necessárias para a configuração do PostgreSQL, MongoDB e outras configurações importantes:

- `TYPE`: O tipo do banco de dados (por exemplo, `postgres`).
- `HOST`: O host do banco de dados.
- `PORT`: A porta de conexão (padrão `5432`).
- `USER`: O usuário do banco de dados.
- `PASSWORD`: A senha do banco de dados.
- `DATABASE`: O nome da base de dados.

#### MongoDB

- `CONNECTION_STRING`: A URL de conexão com o MongoDB.
- `MAIN_DATABASE`: O nome do banco de dados principal.
- `CONNECTION_NAME`: O nome da conexão MongoDB.

#### Outras Configurações

## configuracoes para rodar o projeto numa maquina linux

[Unit]
Description=Portal API - NestJS Service
After=network.target

[Service]
ExecStart=npm run start:prod caminho/para/pasta/projeto/src/main.js
WorkingDirectory=<caminho/para/pasta/do/projeto>
Restart=always
User=root
Group=root
WorkingDirectory=<caminho/para/projeto>
Environment=DATABASE_URL=mongodb://<host>:<porta>/w5i-tablesbuilder

[Install]
WantedBy=multi-user.target


