const jwt = require('jsonwebtoken');

//======================
// verificar token
//======================
let verificaToken = (req, res, next) => {
    //así se puede leer el header de la petición get de usuario en el postman
    let token = req.get('token');

    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err
            })
        }

        req.usuario = decoded.usuario;
        //para que el código siguiente se ejecute
        next();
    });
};


module.exports = {
    verificaToken
}