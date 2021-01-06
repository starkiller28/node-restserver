const express = require('express');
const Usuario = require('../models/usuario');

const app = express();

//esta es la petición get

app.get('/usuario', (req, res) => {
    res.json('get usuario local');
});

// para crear nuevos registros
app.post('/usuario', (req, res) => {
    let body = req.body;

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: body.password,
        role: body.role
    });

    usuario.save((err, usuarioDB) => {
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

    // if (body.nombre === undefined) {
    //     res.status(400).json({
    //         ok: false,
    //         mensaje: 'El nombre es necesario'
    //     });
    // } else {
    //     res.json({
    //         persona: body
    //     });
    // }
});


//put es para actualizar registros
app.put('/usuario/:id', (req, res) => {
    let id = req.params.id;
    res.json({
        id
    });
});

// delete
app.delete('/usuario', (req, res) => {
    res.json('delete usuario');
});

module.exports = app;