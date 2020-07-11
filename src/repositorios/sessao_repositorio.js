"use strict";

const Sequelize = require("sequelize");

const SessaoUsuarioModel = require("../models/SessaoUsuarioModel");
const db = require("../database");

module.exports = {

    async criarRegistroDeSessao(email, Authorization) {

        return await SessaoUsuarioModel.create({
            email: email,
            Authorization: Authorization
        });
    },

    async validarTokenAutenticacao(Authorization) {

        return SessaoUsuarioModel.findOne({
            where: {
                Authorization: Authorization
            }
        });
    },

    async anularRegistroDeSessao(Authorization) {

        let resultado;
        const token_nulo = "--------------------------------------------------";
        const sqlQuery = `            
            UPDATE sessao_usuario
            SET Authorization = '${token_nulo}'
            WHERE Authorization = '${Authorization}'`;

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

    async excluirRegistroDeSessao(Authorization) {

        return await SessaoUsuarioModel.destroy({
            where: {
                Authorization: Authorization
            }
        });
    }
};
