const mongoose = require('mongoose');

//variable para validar valores únicos como el email
const uniqueValidator = require('mongoose-unique-validator');

let rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    //mensaje de error
    message: '{VALUE} no es un rol válido'
};

let Schema = mongoose.Schema;

let usuarioSchema = new Schema({
    nombre: {
        type: String,
        //mensaje que saldrá si el nombre no es ingresado
        required: [true, 'El nombre es necesario']
    },
    email: {
        type: String,
        //debe de estar esto para poder utilizar la variable  uniqueValidator
        unique: true,
        required: [true, 'El correo es necesario']
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    img: {
        type: String,
        required: false
    },
    role: {
        type: String,
        default: 'USER_ROLE',
        //esto evalúa que el rol enviado si sea uno de los dos que declaramos en el objeto rolesValidos
        enum: rolesValidos
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});

//con esto no se imprimirá la contraseña ni la key de ese objeto llamada 'password' en el archivo routes/usuario.js
usuarioSchema.methods.toJSON = function() {
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;
    return userObject;
}

//con esto le podemos poner un mensaje para que aparezca al mandar un email que ya esté en la DB
usuarioSchema.plugin(uniqueValidator, { message: '{PATH} debe de ser único' });

//para exportar este modelo
module.exports = mongoose.model('Usuario', usuarioSchema);