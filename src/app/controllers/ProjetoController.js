const express = require("express");
//MIDDLE PARA VALIDAR SE O USUÁRIO ESTÁ AUTENTICADO
const autenticacao_middleware = require("../middlewares/autenticacao");
const Projeto = require("../models/Projeto");

const Produto = require("../models/Projeto");
const Tarefa = require("../models/Tarefa");

//ESTA ROTA AQUI É SÓ PARA PROJETO SÓ USADO AQUI DENTRO
const rota = express.Router();

//FALO PARA A ROTA PASSAR NO MIDDLE ANTES
rota.use(autenticacao_middleware);

rota.get("/", async (req, res) => {
    //ESTE req.idUsuario É LA DO MIDDLEWARE 
    return res.send({ ok: true, usuario: req.idUsuario });
});

rota.get("/:id", async (req, res) => {
    return res.send({ ok: true, usuario: req.idUsuario });
});

//ROTA PARA CRIAR
rota.post("/", async (req, res) => {
    try {
        console.log(req.body);
        console.log("CRIAR UM NOVO PROJETO");
        const projeto = await Projeto.create(req.body);
        return res.send({ projeto });
    } catch (erro) {
        console.log(erro)
        return res.status(400).send({ error: "Erro ao criar novo projeto" })
    }
});

rota.put("/:id", async (req, res) => {
    return res.send({ ok: true, usuario: req.idUsuario });
});

rota.delete("/:id", async (req, res) => {
    return res.send({ ok: true, usuario: req.idUsuario });
});

//PARA RECUPERAR O (app) PASSADO LA NO INDEX
// module.exports RECEBE O (app) LA DO INDEX E RETORNA O app.use("/projeto", rota)
//PRA CHAMR ISSO AQUI ENTÃO FICA http://localhost:3000/projeto
module.exports = (app) => app.use("/projeto", rota);