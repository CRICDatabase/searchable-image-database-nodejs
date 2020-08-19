"use strict";

// eslint-disable-next-line no-unused-vars
const debug = require("debug")("database.cric:auth_middleware");

const HttpStatus = require("http-status-codes");

const ObjetoExcecao = require("./enumeracoes/controle_de_excecoes");

module.exports = {

    check_loose_ownership(item, user) {
        if (item.id_usuario !== 1) {
            if (!user) {
                ObjetoExcecao.status = HttpStatus.UNAUTHORIZED;
                throw ObjetoExcecao;
            }

            if (user.admin === false && item.id_usuario !== user.id) {
                ObjetoExcecao.status = HttpStatus.FORBIDDEN;
                throw ObjetoExcecao;
            }
        }
    },

    check_strict_ownership(item, user) {
        if (!user) {
            ObjetoExcecao.status = HttpStatus.UNAUTHORIZED;
            throw ObjetoExcecao;
        }
        
        if (user.admin === false && item.id_usuario !== user.id) {
            ObjetoExcecao.status = HttpStatus.FORBIDDEN;
            throw ObjetoExcecao;
        }
    }
};
