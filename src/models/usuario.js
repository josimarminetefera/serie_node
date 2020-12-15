const mongoose = require("../database/banco");
const bcryptjs = require("bcryptjs");

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

//pre INDICA QUE VAI FAZER ALGO ANTES DE SALVAR
UsuarioSchema.pre("save", async function (next) {
    //this SE REFERE AO OBJETO QUE ESTA SENDO SALVADO 
    //hash(campo para criptografar, quantas vezes que o hash vai ser gerado mais forte maior)
    const hash = await bcryptjs.hash(this.senha, 10);
    this.senha = hash;
    next();
});

//REGISTRAR O MODEL NA APLICAÇÃO COM A BASE DE DADOS
//TODA A APLICAÇÃO VAI SABER QUE EXISTE UM MODEL QUE POSSUI ESTAS PROPRIEDADES AQUI 
const Usuario = mongoose.model('Usuario', UsuarioSchema);

//EXPORTAR PARA FORA DESTA CLASS
module.exports = Usuario;