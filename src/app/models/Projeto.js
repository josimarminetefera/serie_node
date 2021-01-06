console.log("models Projeto.js - INICIADO MODEL PROJETO");
const mongoose = require("../../database/banco");
const bcryptjs = require("bcryptjs");

const ProjetoSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true,
    },
    descricao: {
        type: String,
        required: true,
    },
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuario",
    },
    tarefa: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tarefa",
    }], //TERÁ VARAS TAREFAS
    data: {
        type: Date,
        default: Date.now,
    }
});

//REGISTRAR O MODEL NA APLICAÇÃO COM A BASE DE DADOS
//TODA A APLICAÇÃO VAI SABER QUE EXISTE UM MODEL QUE POSSUI ESTAS PROPRIEDADES AQUI 
const Projeto = mongoose.model('Projeto', ProjetoSchema);

//EXPORTAR PARA FORA DESTA CLASS
module.exports = Projeto;