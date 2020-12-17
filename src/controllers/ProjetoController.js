const express = require("express");
//MIDDLE PARA VALIDAR SE O USUÁRIO ESTÁ AUTENTICADO
const autenticacao_middleware = require("../middlewares/autenticacao");

//ESTA ROTA AQUI É SÓ PARA PROJETO SÓ USADO AQUI DENTRO
const rota = express.Router();

//FALO PARA A ROTA PASSAR NO MIDDLE ANTES
rota.use(autenticacao_middleware);

rota.get("/", (req, res) => {
    res.send({ ok: true });
});

//PARA RECUPERAR O (app) PASSADO LA NO INDEX
// module.exports RECEBE O (app) LA DO INDEX E RETORNA O app.use("/projeto", rota)
//PRA CHAMR ISSO AQUI ENTÃO FICA http://localhost:3000/projeto
module.exports = (app) => app.use("/projeto", rota);