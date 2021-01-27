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
                err: {
                    message: 'Token no válido'
                }
            })
        }

        req.usuario = decoded.usuario;
        //para que el código siguiente se ejecute
        next();
    });
};

//======================
// verificar admin role
//======================
let verificaAdmin_role = (req, res, next) => {
    let usuario = req.usuario;
    if (usuario.role === 'ADMIN_ROLE') {
        next();
    } else {
        return res.json({
            ok: false,
            err: {
                message: 'El usuario no es administrador'
            }
        })
    }
};

module.exports = {
    verificaToken,
    verificaAdmin_role
}