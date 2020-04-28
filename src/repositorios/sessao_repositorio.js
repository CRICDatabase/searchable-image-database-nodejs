"use strict";

const Sequelize = require("sequelize");

const SessaoUsuarioModel = require("../models/SessaoUsuarioModel");
const db = require("../database");

module.exports = {

    async criarRegistroDeSessao(email, token_autenticacao) {

        return await SessaoUsuarioModel.create({
            email: email,
            token_autenticacao: token_autenticacao
        });
    },

    async validarTokenAutenticacao(token) {

        return SessaoUsuarioModel.findAll({
            where: {
                token_autenticacao: {
                    [Sequelize.Op.eq]: token
                }
            }
        });
    },

    async anularRegistroDeSessao(token_autenticacao) {

        let resultado;
        const token_nulo = "--------------------------------------------------";
        const sqlQuery = `            
            UPDATE sessao_usuario
            SET token_autenticacao = '${token_nulo}'
            WHERE token_autenticacao = '${token_autenticacao}'`;

        await db.query(
            sqlQuery,
            {
                type: Sequelize.QueryTypes.UPDATE
            }
        )
            .then((results) => {
                resultado = results;
            });

        return resultado;
    },

    async excluirRegistroDeSessao(token_autenticacao) {

        return await SessaoUsuarioModel.destroy({
            where: {
                token_autenticacao: token_autenticacao
            }
        });
    }
};