const mongoose = require('mongoose');

const anotacaoSchema = new mongoose.Schema({
    nome_livro:{
        type: String,
        required: true
    },
    autor:{
        type: String,
        required: true
    },
    textarea:{
        type: String,
        required: true
    }
    
})

const Anotacao = mongoose.model("Anotacao", usuarioSchema);

module.exports = Anotacao;
