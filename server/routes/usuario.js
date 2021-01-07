const express = require('express');

//para poder encriptar las contraseñas
const bcrypt = require('bcrypt');

//para que en el put al actualizar retorne solo los valores que yo quiera que se pueden actualizar
const _ = require('underscore');

//el modelo de la base de datos models/usuario.js
const Usuario = require('../models/usuario');

const app = express();

//esta es la petición get

app.get('/usuario', (req, res) => {
    res.json('get usuario local');
});

//-----------------------------------------para crear nuevos registros
app.post('/usuario', (req, res) => {
    let body = req.body;

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        // con esto se encripta la contraseña
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    });

    //guarda el registro en la DB
    usuario.save((err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        // usuarioDB.password = null;

        res.json({
            ok: true,
            usuario: usuarioDB

        });
    });
});


//--------------------------------put es para actualizar registros
app.put('/usuario/:id', (req, res) => {
    //se coge el id porque con ese se buscará para actualizarlo
    let id = req.params.id;

    //el body es lo que va a ser actualizado
    //la función pick es para poner los valores del modelo que si serán permitidos actualizar
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);
    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            usuario: usuarioDB
        });
    });
});

//--------------------------------delete
app.delete('/usuario', (req, res) => {
    res.json('delete usuario');
});

module.exports = app;