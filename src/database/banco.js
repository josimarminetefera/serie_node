const mongoose = require("mongoose");

//INICIANDO O BANCO DE DADOS
mongoose.connect('mongodb://localhost:27017/noderest', { useNewUrlParser: true, useUnifiedTopology: true, useMongoClient: true });

//INDICA QUAL A CLASSE DE PROMISE QUE O MONGOOSE VAI USAR 
mongoose.Promise = global.Promise;

