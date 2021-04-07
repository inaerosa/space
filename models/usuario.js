const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const usuarioSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    email: {
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
            type: String
        },
        nome_livro:{
            type: String,
            required: true
        },
        textarea:{
            type: String,
        },
        livro: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Livro'
        }
    }], 
    livros:[{
        novo_livro:{
            type: String
        }, 
        lendo:{
            type: String
        },
        lido:{
            type: String
        }
    }]
    
    
})

usuarioSchema.plugin(passportLocalMongoose);

const Usuario = mongoose.model("Usuario", usuarioSchema);

module.exports = Usuario;
