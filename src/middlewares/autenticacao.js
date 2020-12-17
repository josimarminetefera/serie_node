const jsonwebtoken = require("jsonwebtoken");
//IMPORTAR JSON DE CONFIGURACAO
const autenticacao_configuracao = require("../configs/autenticacao.json");

//ISSO AQUI SERVE PARA INTERSEPTAR A REQUISIÇÃO PARA NÃO ENTRAR NO CONTROLLER CASO NAO RESPEITE AS REGRAS.

//ANTES DE CHAMAR O CONTROLLER ELE PASSA POR AQUI ANTES
// SÓ CHAMAMOS O next QUANDO PODE SER CARREGADO O CONTROLLER
module.exports = (req, res, next) => {
    const autenticacao_header = req.headers.autorizacao;

    //VERIFICAR SE O TOKEN FOI INFORMADO 
    if (autenticacao_header) {
        //VERIFICAR SE O TOKEM ESTÁ NO FORMATO CORRETO.
        //Bearer hash do token
        const partes = autenticacao_header.split(' ');
        if (partes.length === 2) {
            //ISSO AQUI É UMA DESESTRUTURAÇÃO AI EU RECEBO ISSO CRIA DUAS VARIAVEIS [] DENTRO DE CHAVE PORQUE É UM ARRAY
            const [schema, token] = partes;
            ///^Bearer$/ ^ = inicio, $ = fim, i=case sensitive
            if (/^Bearer$/i.test(schema)) {
                //verify(token da requisicao, a chave, calback(poder ser um erro, e id do usuário))
                jsonwebtoken.verify(token, autenticacao_configuracao.key, (erro, decoded) => {
                    if (!erro) {
                        //TEM A INFORMAÇÃO DO USER ID
                        //TEM QUE PASSAR ESTE USER ID PARA O CONTROLLER
                        //decoded.id TEM HAVER COM O AUTENTICACAO "token: gerarToken({ id: usuario.id })" e também "params = {}"
                        //req.userId PODE SER USADO EM QUALQUER FUNÇÃO DO CONTROLLER QUE ESTEJA AUTENTICADO
                        req.idUsuario = decoded.id;
                        //POSSO IR PARA O CONTROLADOR
                        return next();
                    } else {
                        return res.status(401).send({ error: "Token informado está incorreto" });
                    }
                });
            } else {
                return res.status(401).send({ error: "Token está escrito errado em Bearer" })
            }
        } else {
            return res.status(401).send({ error: "Token tem que ter dois parametros" })
        }
    } else {
        res.status(401).send({ error: "Token não encontrado" });
    }
}