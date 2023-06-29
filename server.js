const express = require('express');
const cookieParser = require('cookie-parser');
const { sequelize } = require('./models');
const { createUser, updatedUser } = require('./controllers/userController');
const { createAdminUser, updateUser, deleteUser } = require('./controllers/adminController');
const { createCard, updateCard, deleteCard, getCollection } = require('./controllers/cardController');
const { getUsers } = require('./controllers/show-userController');
const { getCardById, getCardByParams } = require('./controllers/show-cardController');
const { login } = require('./controllers/authController');
const { installDatabase } = require('./controllers/databaseController');
const { checkUserRole } = require('./middlewares/authUser');
const { authToken } = require('./middlewares/authToken');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();

app.use(cookieParser());
const port = process.env.PORT || 3000;

// Middlewares, rotas e outras configurações do Express.js
app.get('/install/', installDatabase);

app.use(express.json());
app.post('/', login);
app.post('/addUsers', createUser);

// Rota para servir o arquivo login.html
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'front', 'login.html'));
});

// Rota para servir o arquivo login.js
app.get('/login.js', (req, res) => {
  res.sendFile(path.join(__dirname, 'front', 'login.js'));
});

// Rota para servir o arquivo register.html
app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'front', 'register.html'));
  });
  

// Rota para servir o arquivo registerScript.js
app.get('/registerScript.js', (req, res) => {
  res.sendFile(path.join(__dirname, 'front', 'registerScript.js'));
});

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
app.post('/addCards', checkUserRole, createCard);

// Rota para redirecionar de /dashboard para /cards
app.get('/dashboard', (req, res) => {
  res.redirect('/cards');
});

// Inicie o servidor
app.listen(port, async () => {
  console.log(`Server rodando na porta ${port}`);

  try {
    // Início da conexão com o banco de dados do Sequelize
    await sequelize.authenticate();
    console.log('Conectado ao banco');

    // Sincroniza os modelos com o banco de dados
    await sequelize.sync();
    console.log('Modelos sincronizados');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
});
