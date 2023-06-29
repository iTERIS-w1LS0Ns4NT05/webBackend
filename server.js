const express = require('express');
const { sequelize, User, MagicCard } = require('./models');
const { createUser } = require('./controllers/userController');
const { createCard } = require('./controllers/cardController');
const { getUsers } = require('./controllers/show-userController');
const { getCardById, getCardByParams } = require('./controllers/show-cardController');
const { checkUserRole } = require('./middlewares/authUser');

const app = express();
const port = 3000;

// Middlewares, rotas e outras configurações do Express.js
app.post('/addUsers', checkUserRole, createUser);
app.post('/addCards', checkUserRole, createCard);
app.get('/users', getUsers);
app.get('/cards', getCardByParams);
app.get('/cards/:id', getCardById);




// Inicie o servidor
app.listen(port, async () => {
  console.log(`Server rodando na porta ${port}`);

  try {
    // Inicio da conexão com o banco de dados do Sequelize
    await sequelize.authenticate();
    console.log('Conectado ao banco');

    // Sincroniza os modelos com o banco de dados
    await sequelize.sync();
    console.log('Modelos sincronizados');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
});
