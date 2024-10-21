# Projeto W5i Tables Builder

# Introdução Esta aplicação tem como objetivo ser um gerenciador de banco de dados voltado para o Adiant Framework, proporcionando uma maneira dinâmica e intuitiva de gerenciar e visualizar tabelas e suas relações. Utilizando o HTML5 Canvas, a interface permite a criação e manipulação de tabelas dinâmicas diretamente na tela, tornando a interação com o banco de dados mais visual e acessível.

## O sistema oferece uma experiência fluida, onde os usuários podem desenhar, modificar e interconectar tabelas facilmente, sem a necessidade de interações complexas ou comandos manuais. Com isso, o objetivo é facilitar a administração de bases de dados no Adianti Framework, tornando as operações de gerenciamento mais eficazes e visualmente compreensíveis.

### Esta introdução reflete o propósito da aplicação, destacando suas funcionalidades principais de forma clara e acessível.

### Este é um projeto desenvolvido utilizando o framework NestJS.

## Configurações Necessárias

Antes de iniciar o projeto, certifique-se de que você possui as seguintes configurações em seus arquivos `.env` e `firebase.json`.

### Configurações do Firebase

Você precisará de um arquivo `firebase.json` contendo o secret do Firebase Admin SDK para autenticação e gerenciamento do Firebase.

### Variáveis de Ambiente

Você também precisará configurar variáveis de ambiente no arquivo `.env`. Aqui estão as variáveis necessárias para a configuração do PostgreSQL, MongoDB e outras configurações importantes:

#### PostgreSQL

Configure as informações de conexão com o PostgreSQL:

