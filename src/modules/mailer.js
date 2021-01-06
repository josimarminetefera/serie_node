console.log("modules mailer.js - INICIADO MAILLER");
const nodemailer = require("nodemailer");
const nodemailer_express_handlebars = require("nodemailer-express-handlebars");
const path = require("path");

//IMPORTAR OS DADOS DO mailer.json
//{ISSO AQUI É DESESTRUTURAÇÃO} ISSO AQUI EVITA QUE EU CRIE UMA variavel.host, variavel.port
const { host, port, user, pass } = require("../configs/mailer.json");

var transport = nodemailer.createTransport({
  host,
  port,
  auth: { user, pass }
});

transport.use("compile", nodemailer_express_handlebars({
  viewEngine: "handlebars",//QUAL CODIGO ELA VAI USAR 
  viewPath: path.resolve("./src/resources/mail"), //ONDE VAI FICAR OS TEMPLATES (AQUI SEMPRE PARTE DA RAIZ DO PROJETO)
  extName: ".html",
}));

//MANDAR PARA FORA DESTA CLASS
module.exports = transport;