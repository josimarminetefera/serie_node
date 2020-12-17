const fs = require("fs");
const path = require("path");

module.exports = (app) => {
    //fs.readdirSync INDICA QUE SERÁ LIDO O DIRETÓRIO __dirname (O QUE ESTOU AGORA)
    fs
        .readdirSync(__dirname)
        .filter(file => ((file.indexOf('.')) != 0 && (file != "index.js"))) //PROCURA TODOS ARQUIVOS QUE NÃO SÃO INDEX E QUE NÃO COMEÇA COM PONTO
        .forEach(file => require(path.resolve(__dirname, file))(app)); //PERCORRO CADA ARQUIVO DANDO REQUIRE EM CADA UM DELES 
};