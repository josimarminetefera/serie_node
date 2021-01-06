console.log("models Tarefa.js - INICIADO MODEL TAREFA");
const mongoose = require("../../database/banco");
const bcryptjs = require("bcryptjs");
const { model } = require("./Projeto");

const TarefaSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true,
    },
    descricao: {
        type: String,
    },
    usuario: {
        type: mongoose.Schema.Types.ObjectId, //FORMA QUE O MONGO GRAVA O ID DENTRO DO BANCO
        ref: "Usuario",
    },
    projeto: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Projeto",
    },
    completa: {
        type: Boolean,
        default: false,
    },
    data: {
        type: Date,
        default: Date.now,
    }
});

//REGISTRAR O MODEL NA APLICAÇÃO COM A BASE DE DADOS
//TODA A APLICAÇÃO VAI SABER QUE EXISTE UM MODEL QUE POSSUI ESTAS PROPRIEDADES AQUI 
const Tarefa = mongoose.model("Tarefa", TarefaSchema);

//EXPORTAR PARA FORA DESTA CLASS
module.exports = Tarefa;