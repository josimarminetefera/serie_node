const express = require("express");

//ESTA ROTA AQUI É SÓ PARA PROJETO SÓ USADO AQUI DENTRO
const rota = express.Router();

rota.get("/", (req, res) => {
    res.send({ ok: true });
});

//PARA RECUPERAR O (app) PASSADO LA NO INDEX
// module.exports RECEBE O (app) LA DO INDEX E RETORNA O app.use("/projeto", rota)
//PRA CHAMR ISSO AQUI ENTÃO FICA http://localhost:3000/projeto
module.exports = (app) => app.use("/projeto", rota);