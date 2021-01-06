require('./config/config');
const express = require('express');
// se carga mongoose
const mongoose = require('mongoose');

const app = express();
const bodyParser = require('body-parser');


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

//Esto es para usar el archivo usuario.js
app.use(require('./routes/usuario'));

//para conectarme a la base de datos
mongoose.connect('mongodb://localhost:27017/cafe', (err, res) => {
    if (err) throw err;
    console.log('Base de datos ONLINE');
});

//esta variable viene de la carpeta config para la variable del puerto
app.listen(process.env.PORT, () => {
    console.log(`Escuchando el puerto ${process.env.PORT}`);
});