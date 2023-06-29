const express = require('express');
const { sequelize, User, MagicCard } = require('./models');
const { createUser, updatedUser } = require('./controllers/userController');
const { createAdminUser, updateUser, deleteUser } = require('./controllers/adminController');
const { createCard, updateCard, deleteCard, getCollection } = require('./controllers/cardController');
const { getUsers } = require('./controllers/show-userController');
const { getCardById, getCardByParams } = require('./controllers/show-cardController');
const { login } = require('./controllers/authController');
const { installDatabase } = require('./controllers/databaseController');
const { checkUserRole } = require('./middlewares/authUser');
const { authToken } = require('./middlewares/authToken');

const app = express();
const port = 3000;

// Middlewares, rotas e outras configurações do Express.js
app.get('/install/', installDatabase);

app.post('/', login);

app.use(authToken);

app.delete('/cards/:id', checkUserRole, deleteCard);
app.delete('/users/:id', checkUserRole, deleteUser);

app.put('/users/:id', checkUserRole, updateUser);
app.put('/cards/:id', checkUserRole, updateCard);
app.put('/addUsers/:id', updatedUser);

app.get('/users', getUsers);
app.get('/cards', getCardByParams);
app.get('/cards/:id', getCardById);
app.get('/cards/:cardId/collection', getCollection);

app.post('/users/admin', checkUserRole, createAdminUser);
app.post('/addUsers', createUser);
app.post('/addCards', checkUserRole, createCard);





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
