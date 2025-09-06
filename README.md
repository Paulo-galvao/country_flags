# flags-new

<p>Projeto simples desenvolvido para fins educativos com intuito de praticar minhas habildades em desenvolvimento fullstack.</p>

<p>Ferramentas utilizadas:</p>

- NodeJS para desenvolver as API e conectar com o banco de dados
- Postgresql como SGBD
- Sequelize para interagir com o banco de dados
- React para frontend

<p>Caso você queira testar:</p>

- clone o repositorio
- instale as depêndencias na pasta server e também na pasta client
- defina as variáveis de ambiente:

  DB_HOST<br>
  DB_PORT<br>
  DB_USER=postgres<br>
  DB_PASSWORD<br>
  DB_NAME=flags<br>
  SECRET_KEY<br>

ou:
- configure suas variáveis de ambiente em server/src/config/database.js
- defina a variavel secret_key em server/src/middlewares/authMiddleware.js
<br>

- em seguida:
- defina em client/src/pages/Signup.jsx a variável api_url com o local onde o servidor está rodando
- inicie separadamente em cada pasta(client, server) 'npm run dev'

<p>Funcionalidades:</p>

- faça login ou crie um usuário
- na área de dashboard pode criar, editar ou excluir os posts
- somente os seus posts podem ser editados ou excluidos
- em home você pode ver as postagens de todos os usuários
- e pode acessar cada postagem individualmente
- em header você pode pesquisar a bandeira pelo seu nome 

 
