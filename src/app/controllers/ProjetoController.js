const express = require("express");
//MIDDLE PARA VALIDAR SE O USUÁRIO ESTÁ AUTENTICADO
const autenticacao_middleware = require("../middlewares/autenticacao");

const Projeto = require("../models/Projeto");
const Tarefa = require("../models/Tarefa");

//ESTA ROTA AQUI É SÓ PARA PROJETO SÓ USADO AQUI DENTRO
const rota = express.Router();

//FALO PARA A ROTA PASSAR NO MIDDLE ANTES
rota.use(autenticacao_middleware);

//ROTA PARA LISTAR 
rota.get("/", async (req, res) => {
    //ESTE req.idUsuario É LA DO MIDDLEWARE 
    //return res.send({ ok: true, usuario: req.idUsuario });
    try {
        //igerload é quando eu quero trazer o usuário de um projeto
        //se eu quero trazer o suário de todos projetos fazendo apenas uma consulta tem que usar o populate()
        //populate("usuario") serve para carregar de todos resultados o usuário
        const produtos = await Projeto.find().populate(["usuario", "tarefa"]);
        return res.send({ produtos });
    } catch (erro) {
        return res.status(400).send({ error: "Erro ao listar os projetos." });
    }
});

//ROTA PARA VISUALIZAR
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
        const { titulo, descricao, tarefa } = req.body;
        //...req.body INDICA QUE SERÃO ADICIONADOS VÁRIOS PARAMETROS
        //req.idUsuario vem la do middlewar
        //const projeto = await Projeto.create({ ...req.body, usuario: req.idUsuario });
        const projeto = await Projeto.create({
            titulo,
            descricao,
            usuario: req.idUsuario
        });

        //await Promise.all VAI ESPERAR GRAVAR CADA UMA DAS TAREFAS PRA SÓ DEPOIS CONTINUAR O SISTEMA
        await Promise.all(
            //TENHO QUE PERCORRER CADA UMA DAS TAREFAS PARA GUARDAR ELA DENTRO DO PROJETO
            tarefa.map(async tarefa => {
                //new Tarefa .save() CRIA A TAREFA PORÉM NÃO GRAVA NO MESMO MOMENTO IGUAL O Tarefa.create()
                //...tarefa SIGNIFICA QUE ELE VAI PEGAR TODOS PARAMETROS QUE ESTÃO DENTRO
                const projeto_tarefa = new Tarefa({ ...tarefa, projeto: projeto._id });

                await projeto_tarefa.save();

                //PEGO CADA TAREFA E ADICIONO DENTRO DO PROJETO
                projeto.tarefa.push(projeto_tarefa);
            })
        );

        //ISSO AQUI É PARA ATUALIZAR DEPOIS QUE EU ADICIONO AS TAREFAS
        await projeto.save();

        return res.send({ projeto });
    } catch (erro) {
        console.log(erro)
        return res.status(400).send({ error: "Erro ao criar novo projeto" })
    }
});

rota.put("/:id", async (req, res) => {
    try {
        console.log(req.body);
        console.log("ALTERAR UM PROJETO");
        const { titulo, descricao, tarefa } = req.body;
        //...req.body INDICA QUE SERÃO ADICIONADOS VÁRIOS PARAMETROS
        //req.idUsuario vem la do middlewar
        //const projeto = await Projeto.create({ ...req.body, usuario: req.idUsuario });
        const projeto = await Projeto.findByIdAndUpdate(
            req.params.id,
            {
                $set: {
                    titulo,
                    descricao,
                }
            },
            { new: true }//PARA RETORNAR O PROJETO ATUALIZADO
        );

        //DELETAR TODAS TAREFAS ANTES DE FAZER ELAS NOVAMENTE
        projeto.tarefa = [];
        //DELETAR TODAS TAREFAS
        const resposta = await Tarefa.remove({ projeto: projeto._id });
        console.log("total de itens removidos: " + resposta.deletedCount);

        //await Promise.all VAI ESPERAR GRAVAR CADA UMA DAS TAREFAS PRA SÓ DEPOIS CONTINUAR O SISTEMA
        await Promise.all(
            //TENHO QUE PERCORRER CADA UMA DAS TAREFAS PARA GUARDAR ELA DENTRO DO PROJETO
            tarefa.map(async tarefa => {
                //new Tarefa .save() CRIA A TAREFA PORÉM NÃO GRAVA NO MESMO MOMENTO IGUAL O Tarefa.create()
                //...tarefa SIGNIFICA QUE ELE VAI PEGAR TODOS PARAMETROS QUE ESTÃO DENTRO
                const projeto_tarefa = new Tarefa({ ...tarefa, projeto: projeto._id });

                await projeto_tarefa.save();

                //PEGO CADA TAREFA E ADICIONO DENTRO DO PROJETO
                projeto.tarefa.push(projeto_tarefa);
            })
        );

        //ISSO AQUI É PARA ATUALIZAR DEPOIS QUE EU ADICIONO AS TAREFAS
        await projeto.save();

        return res.send({ projeto });
    } catch (erro) {
        console.log(erro)
        return res.status(400).send({ error: "Erro ao alterar novo projeto" })
    }
});

//ROTA PARA DELETAR
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