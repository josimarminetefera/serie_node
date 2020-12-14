const mongoose = require("mongoose");

const UsuarioSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true
    },
    senha: {
        type: DOMStringList,
        required: true,
        select: false
    },
    data: {
        type: Date,
        default: Date.now
    },
});

//REGISTRAR O MODEL NA APLICAÇÃO COM A BASE DE DADOS
//TODA A APLICAÇÃO VAI SABER QUE EXISTE UM MODEL QUE POSSUI ESTAS PROPRIEDADES AQUI 
mongoose.model('Usuario', UsuarioSchema);