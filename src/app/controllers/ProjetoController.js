const express = require("express");
//MIDDLE PARA VALIDAR SE O USUÁRIO ESTÁ AUTENTICADO
const autenticacao_middleware = require("../middlewares/autenticacao");

const Projeto = require("../models/Projeto");
const Tarefa = require("../models/Tarefa");

//ESTA ROTA AQUI É SÓ PARA PROJETO SÓ USADO AQUI DENTRO
const rota = express.Router();

//FALO PARA A ROTA PASSAR NO MIDDLE ANTES
rota.use(autenticacao_middleware);

rota.get("/", async (req, res) => {
    //ESTE req.idUsuario É LA DO MIDDLEWARE 
    //return res.send({ ok: true, usuario: req.idUsuario });
    try {
        //igerload é quando eu quero trazer o usuário de um projeto
        //se eu quero trazer o suário de todos projetos fazendo apenas uma consulta tem que usar o populate()
        //populate("usuario") serve para carregar de todos resultados o usuário
        const produtos = await Projeto.find().populate("usuario");
        return res.send({ produtos });
    } catch (erro) {
        return res.status(400).send({ error: "Erro ao listar os projetos." });
    }
});

rota.get("/:id", async (req, res) => {
    try {
        //req.params É PARA PEGAR OS PARAMETROS
        const projeto = await Projeto.findById(req.params.id).populate("usuario");
        return res.send({ projeto });
    } catch (erro) {
        return res.status(400).send({ error: "Erro ao visualizar o projeto" });
    }
});

//ROTA PARA CRIAR
rota.post("/", async (req, res) => {
    try {
        console.log(req.body);
        console.log("CRIAR UM NOVO PROJETO");
        //...req.body INDICA QUE SERÃO ADICIONADOS VÁRIOS PARAMETROS
        //req.idUsuario vem la do middlewar
        const projeto = await Projeto.create({ ...req.body, usuario: req.idUsuario });
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
    try {
        await Projeto.findByIdAndRemove(req.params.id);
        return res.send();
    } catch (erro) {
        return res.status(400).send({ erro: "Erro ao deletar o projeto" })
    }
});

//PARA RECUPERAR O (app) PASSADO LA NO INDEX
// module.exports RECEBE O (app) LA DO INDEX E RETORNA O app.use("/projeto", rota)
//PRA CHAMR ISSO AQUI ENTÃO FICA http://localhost:3000/projeto
module.exports = (app) => app.use("/projeto", rota);