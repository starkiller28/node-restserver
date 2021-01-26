const express = require('express');

const app = express();

//Esto es para usar el archivo usuario.js
app.use(require('./usuario'));
//Esto es para usar el archivo login.js
app.use(require('./login'));

module.exports = app;