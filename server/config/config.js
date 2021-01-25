/// puerto
process.env.PORT = process.env.PORT || 3000;


/// entorno
//Esto es para que si la variable no existe, quiere decir que estoy en desarrollo, localmente
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

///Base de datos
let urlDB;
if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    //MONGO_URI= variable que se crea con heroku config para camuflar el usuario y contraseña de atlas
    urlDB = process.env.MONGO_URI;
}

//Esta variable la utilizamos en el server.js para conectarnos a la db
process.env.URLDB = urlDB;