const express = require('express');
const app = express();
const bodyParser = require('body-parser');


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//esta es la petición get
app.get('/', (req, res) => {
    res.json('Hello world')
});

app.get('/usuario', (req, res) => {
    res.json('get usuario')
});

// para crear nuevos registros
app.post('/usuario', (req, res) => {
    let body = req.body;
    if (body.nombre === undefined) {
        res.status(400).json({
            ok: false,
            mensaje: 'El nombre es necesario'
        });
    } else {
        res.json({
            persona: body
        });
    }
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
    res.json('delete usuario')
});

app.listen(3000, () => {
    console.log('Escuchando el puerto 3000');
});