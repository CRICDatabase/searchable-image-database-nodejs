"use strict";

const config = require("config");
const HttpStatus = require("http-status-codes");
const nodemailer = require("nodemailer");
const debug = require("debug")("database.cric:ForgetPasswordService");

const Excecao = require("../../utils/enumeracoes/mensagem_excecoes");
const ObjetoExcecao = require("../../utils/enumeracoes/controle_de_excecoes");
const Criptografia = require("../../utils/criptografia");
const UsuarioRepositorio = require("../../repositorios/usuario_repositorio");

module.exports = {

    async Executar(req) {
        validarRequisicao(req);

        const new_password = String(
            Math.floor(Math.random() * 100000001)
        );

        let usuario = await UsuarioRepositorio.change_password(
            req.body.email,
            Criptografia.criarCriptografiaMd5Utf8(
                new_password
            )
        );

        if (!usuario) {
            ObjetoExcecao.status = HttpStatus.NOT_FOUND;
            ObjetoExcecao.title = Excecao.USUARIO_BASE_NAO_ENCONTRATO;
            ObjetoExcecao.detail = "Failed to find user";
            throw ObjetoExcecao;
        }


        const smtp_info = config.get("nodemailer");

        var transporter = nodemailer.createTransport(smtp_info);

        var mailOptions = {
            from: smtp_info.auth.user,
            to: usuario.dataValues.email,
            subject: "Your Password for CRIC",
            text: new_password
        };

        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                debug(error);
            }
            else {
                debug(`Email sent: ${info.response}`);
            }
        });
    }
};

function validarRequisicao(req) {
    if (!(req.body.email)) {
        ObjetoExcecao.status = HttpStatus.BAD_REQUEST;
        ObjetoExcecao.title = Excecao.PARAMETROS_INVALIDOS;
        throw ObjetoExcecao;
    }
}
