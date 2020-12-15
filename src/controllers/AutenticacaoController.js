const express = require("express");

//BUSCAR A CLASS USUARIO
const Usuario = require("../models/Usuario");

//ESTA ROTA AQUI É SÓ PARA USUARIO
const rota = express.Router();

rota.post("/registrar", async (req, res) => {
    try {
        const usuario = await Usuario.create(req.body);

        return res.send(usuario);
    } catch (erro) {
        return res.status(400).send({ error: "Erro ao registrar." });
    }
});

//PARA RECUPERAR O (app) PASSADO LA NO INDEX
// module.exports RECEBE O (app) LA DO INDEX E RETORNA O app.use("/autenticacao", rota)
//PRA CHAMR ISSO AQUI ENTÃO FICA /autenticacao/registrar
module.exports = (app) => app.use("/autenticacao", rota);