const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    user: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    senha: {
        type: String,
        required: true
    },
    confirme: {
        type: String,
        required: true
    }
    
})

const Usuario = mongoose.model("Usuario", usuarioSchema);

module.exports = Usuario;