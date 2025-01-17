console.log("database banco.js - INICIADO BANCO DE DADOS");
const mongoose = require("mongoose");

//INDICA QUAL A CLASSE DE PROMISE QUE O MONGOOSE VAI USAR 
mongoose.Promise = global.Promise;

//INICIANDO O BANCO DE DADOS useMongoClient: true
//mongoose.connect('mongodb://localhost:27017/noderest', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connect("mongodb://localhost:27017/noderest", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
});

//ENVIAR O MONGOOSE PARA FORA
module.exports = mongoose;