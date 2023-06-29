const express = require('express');
const { sequelize, User, MagicCard } = require('./models');

const app = express();
const port = 3000;

// Middlewares, rotas e outras configurações do Express.js

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
