const express = require('express');
const bodyParser = require('body-parser');
const { Sequelize } = require('sequelize');
require('./.env').config();

const app = express();
app.use(bodyParser.json());

// Configuración de Sequelize
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'postgres', // O 'mysql' según tu base de datos
});

// Sincronizar la base de datos
sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log('Microservicio de Clientes corriendo en el puerto 3001');
  });
}).catch(err => {
  console.error('Error al sincronizar la base de datos:', err);
});
