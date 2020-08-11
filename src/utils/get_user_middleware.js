"use strict";

// eslint-disable-next-line no-unused-vars
const debug = require("debug")("database.cric:get_user_middleware");

const HttpStatus = require("http-status-codes");

const Excecao = require("./enumeracoes/mensagem_excecoes");
const ObjetoExcecao = require("./enumeracoes/controle_de_excecoes");
const SessaoRepositorio = require("../repositorios/sessao_repositorio");
const UsuarioRepositorio = require("../repositorios/usuario_repositorio");

module.exports = {

    async from_session(req, res, next) {
        if (!req.get("Authorization")) {
            res.locals.user = undefined;
            next();
        }

        let session = await SessaoRepositorio.validarTokenAutenticacao(
            req.get("Authorization")
        );

        if (session === null) {
            res.locals.user = undefined;
            next();
        }

        let user = await UsuarioRepositorio.obterUsuarioBasePorEmail(
            session.dataValues.email
        );
        if (user === null) {
            res.locals.user = undefined;
            next();
        }

        res.locals.user = user;
        next();
    }
};
