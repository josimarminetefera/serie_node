const mongoose = require("../database/banco");

const UsuarioSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    senha: {
        type: String,
        required: true,
        select: false
    },
    data: {
        type: Date,
        default: Date.now,//DATA ATUAL QUE O REGISTRO FOI CRIADO 
    },
})

//REGISTRAR O MODEL NA APLICAÇÃO COM A BASE DE DADOS
//TODA A APLICAÇÃO VAI SABER QUE EXISTE UM MODEL QUE POSSUI ESTAS PROPRIEDADES AQUI 
const Usuario = mongoose.model('Usuario', UsuarioSchema);

//EXPORTAR PARA FORA DESTA CLASS
module.exports = Usuario;