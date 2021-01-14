const express = require('express');

//para poder encriptar las contraseñas
const bcrypt = require('bcrypt');

//para que en el put al actualizar retorne solo los valores que yo quiera que se pueden actualizar
const _ = require('underscore');

//el modelo de la base de datos models/usuario.js
const Usuario = require('../models/usuario');

const app = express();

//-----------------------------------------esta es la petición get
app.get('/usuario', (req, res) => {

    //Esto será un parámetro opcional y se pone así "/usuario?desde=10"
    let desde = req.query.desde || 0;
    //transforma la variable en número
    desde = Number(desde);

    //Para usar más parámetros "/usuario?desde=10&limite=10"
    let limite = req.query.limite || 5;
    limite = Number(limite);

    //Con esto devuelve la lista de todos los usuarios en la DB, lo que está entre comillas es para decir que se va a ver cuando se use el get, en este caso "nombre, email, role, estado, google, img"
    Usuario.find({ estado: true }, 'nombre email role estado google img')
        //se salta los primeros números que tenda desde, si desde es 5 empezará desde el 6
        .skip(desde)
        //para poner un límite de registros si no traería todos a la vez
        .limit(limite)
        .exec((err, usuarios) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            //con esta funcion mostrará cuantos refistros hay, dentro de las llaves se pone una condición, y esta debe de ser la misma que la que esté dentro del "find" arriba
            Usuario.count({ estado: true }, (err, conteo) => {
                if (err) {
                    return res.status(400).json({
                        ok: false,
                        err
                    });
                }

                res.json({
                    ok: true,
                    conteo,
                    usuarios
                });
            })
        })
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

        res.json({
            ok: true,
            usuario: usuarioDB

        });
    });
});

//-----------------------------------put es para actualizar registros
app.put('/usuario/:id', (req, res) => {
    //se coge el id porque con ese se buscará para actualizarlo
    let id = req.params.id;

    //el body es lo que va a ser actualizado
    //la función pick es para poner los valores del modelo que si serán permitidos actualizar
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);

    // con el new retorna el nuevo valor ya actualizado, y el run validators es para que corra todas las validaciones que habíamos puesto en el models
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

//--------------------------------------delete
app.delete('/usuario/:id', (req, res) => {
    let id = req.params.id;
    //Con este código se elimina completamente
    // Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {
    //     if (err) {
    //         return res.status(400).json({
    //             ok: false,
    //             err
    //         });
    //     }

    //     if (!usuarioBorrado) {
    //         return res.status(400).json({
    //             ok: false,
    //             err: {
    //                 message: 'Usuario no encontrado'
    //             }
    //         })
    //     }

    //     res.json({
    //         ok: true,
    //         usuarioBorrado
    //     })
    // })

    let cambiaEstado = {
        estado: false
    };

    //Con esta cambiamos el valor del "estado" en la DB a false
    Usuario.findByIdAndUpdate(id, cambiaEstado, { new: true }, (err, usuarioBorrado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if (!usuarioBorrado) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario no encontrado'
                }
            })
        }

        res.json({
            ok: true,
            usuarioBorrado
        })
    });
});

module.exports = app;