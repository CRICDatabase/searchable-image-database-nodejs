"use strict";

const SessaoUsuarioModel = require("../models/SessaoUsuarioModel");

module.exports = {

    async criarRegistroDeSessao(email, token_autenticacao) {

        return await SessaoUsuarioModel.create({
            email: email,
            token_autenticacao: token_autenticacao
        });
    },

    async validarTokenAutenticacao(token_autenticacao) {

        return SessaoUsuarioModel.findOne({
            where: {
                token_autenticacao: token_autenticacao
            }
        });
    },

    async anularRegistroDeSessao(token_autenticacao) {
        await SessaoUsuarioModel.destroy(
            {
                where: {
                    token_autenticacao: token_autenticacao
                }
            }
        );
    },

    async excluirRegistroDeSessao(token_autenticacao) {

        return await SessaoUsuarioModel.destroy({
            where: {
                token_autenticacao: token_autenticacao
            }
        });
    }
};
