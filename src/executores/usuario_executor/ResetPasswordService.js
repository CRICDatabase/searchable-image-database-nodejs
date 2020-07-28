"use strict";

// eslint-disable-next-line no-unused-vars
const debug = require("debug")("database.cric:ResetPasswordService");

const HttpStatus = require("http-status-codes");
const config = require("config");
const nodemailer = require("nodemailer");

const UsuarioRepositorio = require("../../repositorios/usuario_repositorio");

const Criptografia = require("../../utils/criptografia");
const Excecao = require("../../utils/enumeracoes/mensagem_excecoes");
const ObjetoExcecao = require("../../utils/enumeracoes/controle_de_excecoes");

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

        const email_body = `Hey,

Your new password is

${new_password}

Visit https://database.cric.com.br to login using your new password.

CRIC Searchable Image Database`;

        const smtp_info = config.get("nodemailer");
        let transporter = nodemailer.createTransport(smtp_info);
        let mailOptions = {
            from: smtp_info.auth.user,
            to: usuario.dataValues.email,
            subject: "Your New Password for CRIC Searchable Image Database",
            text: email_body
        };

        transporter.sendMail(
            mailOptions,
            (error, info) => {
                if (error) {
                    debug(error);
                }
                else {
                    debug(`Email sent: ${info.response}`);
                }
            }
        );
    }
};

function validarRequisicao(req) {
    if (!(req.body.email)) {
        ObjetoExcecao.status = HttpStatus.BAD_REQUEST;
        ObjetoExcecao.title = Excecao.PARAMETROS_INVALIDOS;
        throw ObjetoExcecao;
    }
}
