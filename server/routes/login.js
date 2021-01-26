const express = require('express');

//para poder encriptar las contraseñas
const bcrypt = require('bcrypt');

//para generar el token
const jwt = require('jsonwebtoken');

//el modelo de la base de datos models/usuario.js
const Usuario = require('../models/usuario');

const app = express();

app.post('/login', (req, res) => {
    //optiene los datos enviados
    let body = req.body;

    //con esto se verifica que el email si esté registrado
    Usuario.findOne({ email: body.email }, (err, usuarioDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        // si el usuario no se encuentra en la DB
        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario o contraseña incorrectos'
                }
            });
        }

        //Si la contraseña es incorrecta
        if (!bcrypt.compareSync(body.password, usuarioDB.password)) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario o contraseña incorrectos'
                }
            });
        }
        //expiresIn los primeros 60 son segundos luego minutos, luego horas y luego días                                                                            
        let token = jwt.sign({ usuario: usuarioDB }, process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN });
        res.json({
            ok: true,
            usuarioDB,
            token
        });
    });
});

module.exports = app;