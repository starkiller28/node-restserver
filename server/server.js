require('./config/config');
const express = require('express');
// se carga mongoose
const mongoose = require('mongoose');
//para hacer la carpeta pública pública
const path = require('path');

const app = express();
const bodyParser = require('body-parser');


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

//habilitar la carpeta public
app.use(express.static(path.resolve(__dirname, '../public')));

//Esto es para poder usar todas las rutas que tengamos, ya que todas se almacenan ahí
app.use(require('./routes/index'));

//para conectarme a la base de datos de mongo
// process.env.URLDB viene de congif.js 
mongoose.connect(process.env.URLDB, { useNewUrlParser: true, useCreateIndex: true }, (err, res) => {
    if (err) throw err;
    console.log('Base de datos ONLINE');
});


//esta variable viene de la carpeta config para la variable del puerto
app.listen(process.env.PORT, () => {
    console.log(`Escuchando el puerto ${process.env.PORT}`);
});