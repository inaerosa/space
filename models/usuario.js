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
    },
    metas: {
        meta:{
            type: Number
        },
        lido: {
            type: Number
        }
    }, 
    anotacoes: [ {
        autor:{
            type: [String]
        },
        nome_livro:{
            type: [String],
            required: true
        },
        textarea:{
            type: [String],
        }
    }]
    
    
})

const Usuario = mongoose.model("Usuario", usuarioSchema);

module.exports = Usuario;
