//======================
// puerto
//======================
process.env.PORT = process.env.PORT || 3000;

//======================
// entorno
//======================
//Esto es para que si la variable no existe, quiere decir que estoy en desarrollo, localmente
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//======================
// vencimiento del token
//======================
process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;

//======================
// SEED de autenticación del token
//======================
//SEED: variable creada desde el shell con heroku config:set 
process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo'

//======================
// Base de datos
//======================

let urlDB;
if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    //MONGO_URI= variable que se crea con heroku config para camuflar el usuario y contraseña de atlas
    urlDB = process.env.MONGO_URI;
}

//Esta variable la utilizamos en el server.js para conectarnos a la db
process.env.URLDB = urlDB;

//======================
// Google client ID
//======================
process.env.CLIENT_ID = process.env.CLIENT_ID || '896017711533-0qgckaodoopa75u0ndp7crra2kr97kva.apps.googleusercontent.com';