"use strict";

// eslint-disable-next-line no-unused-vars
const debug = require("debug")("database.cric:get_user_middleware");

const SessaoRepositorio = require("../repositorios/sessao_repositorio");
const UsuarioRepositorio = require("../repositorios/usuario_repositorio");

module.exports = {

    async from_session(req, res, next) {
        const authorization = req.get("Authorization");
        res.locals.user = undefined;

        if (typeof authorization !== "undefined") {
            const session = await SessaoRepositorio.validarTokenAutenticacao(
                authorization
            );

            if (session !== null) {
                const user = await UsuarioRepositorio.obterUsuarioBasePorEmail(
                    session.dataValues.email
                );

                if (user !== null) {
                    res.locals.user = user.dataValues;
                }
            }
        }

        next();
    }
};
