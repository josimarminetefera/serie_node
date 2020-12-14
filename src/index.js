const express = require("express");
//PARA TRATAR REQUISIÇÃO EM JSON E PEGAR OS PARÂMETROS
const body_parser = require("body-parser");

//PARA CRIAR A APLICAÇÃO
const app = express();

//QUANDO ENVIAR UMA REQUIZIÇÃO EM JSON
app.use(body_parser.json());

//QUANDO ENVIAR UMA REQUIZIÇÃO COM URL PARA PEGAR OS PAREMTROS
app.use(body_parser.urlencoded({ extended: false }));

//TESTAR SE O LINK ESTÁ FUNCIONANDO
app.get("/", (req, res) => {
    res.send("Oi");
});

//QUAL PORTA O APLICATIVO VAI ESCUTAR 
app.listen(3000);