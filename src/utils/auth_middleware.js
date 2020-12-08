"use strict";

// eslint-disable-next-line no-unused-vars
const debug = require("debug")("database.cric:auth_middleware");

const HttpStatus = require("http-status-codes");

const SessaoRepositorio = require("../repositorios/sessao_repositorio");
const UsuarioRepositorio = require("../repositorios/usuario_repositorio");

module.exports = {

    async get_user_from_session(req, res, next) {
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
    },

    async login_required(req, res, next) {
        if (typeof res.locals.user === "undefined") {
            return res.status(HttpStatus.UNAUTHORIZED).end();
        }
        else {
            next();
        }
    },

    async admin_required(req, res, next) {
        if (typeof res.locals.user === "undefined" || res.locals.user.admin === false) {
            return res.status(HttpStatus.UNAUTHORIZED).end();
        }
        else {
            next();
        }
    }

};
