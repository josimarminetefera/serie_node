const express = require("express");
const bcryptjs = require("bcryptjs");

//BUSCAR A CLASS USUARIO
const Usuario = require("../models/Usuario");

//ESTA ROTA AQUI É SÓ PARA USUARIO SÓ USADO AQUI DENTRO
const rota = express.Router();

rota.post("/registrar", async (req, res) => {
    try {
        //{ email } ISSO AQUI PEGA UM VALOR DENTRO DO body
        const { email } = req.body;
        if (!await Usuario.findOne({ email })) {
            //CRIAR O USUÁRIO COM TODOS ENVIADOS
            const usuario = await Usuario.create(req.body);

            //APAGA A SENHA ASSIM QUE O USUÁRIO FOR CRIADO
            usuario.senha = undefined;

            return res.send({ usuario });
        } else {
            return res.status(400).send({ error: "Usuário já cadastrado!" });
        }
    } catch (erro) {
        return res.status(400).send({ error: "Erro ao registrar." });
    }
});

rota.post('/autenticar', async (req, res) => {
    //VOU RECEBER ESTAS DUAS VARIAVEIS PARA LOGIN
    const { email, senha } = req.body;

    // PARA BUSCAR UM CAMPO QUE NÃO APARECE NO OBJECT .select('+senha')
    const usuario = await Usuario.findOne({ email }).select('+senha');

    if (usuario) {
        //VERIFICAR SE A SENHA É A MESMA CADASTRADA
        if (await bcryptjs.compare(senha, usuario.senha)) {
            
            //APAGA A SENHA ASSIM QUE O USUÁRIO FOR CRIADO
            usuario.senha = undefined;

            res.send({ usuario });
        } else {
            res.status(400).send({ erro: "Senha inválida." })
        }
    } else {
        res.status(400).send({ erro: "Usuário não encontrado." })
    }


});

//PARA RECUPERAR O (app) PASSADO LA NO INDEX
// module.exports RECEBE O (app) LA DO INDEX E RETORNA O app.use("/autenticacao", rota)
//PRA CHAMR ISSO AQUI ENTÃO FICA http://localhost:3000/autenticacao/registrar
module.exports = (app) => app.use("/autenticacao", rota);