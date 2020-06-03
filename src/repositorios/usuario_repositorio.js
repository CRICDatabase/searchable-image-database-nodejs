"use strict";

const Sequelize = require("sequelize");

const TipoAnalise = require("../utils/enumeracoes/tipo_analise_realizada");
const UsuarioBaseModel = require("../models/UsuarioBaseModel");
const AdministradorModel = require("../models/AdministradorModel");
const AnalistaModel = require("../models/AnalistaModel");
const db = require("../database");

module.exports = {

    async processarQuerySql(sqlQuery) {

        let resultado;

        await db.query(
            sqlQuery,
            {
                type: Sequelize.QueryTypes.SELECT
            }
        )
            .then((results) => {
                resultado = results;
            });

        return resultado;
    },


    async cadastrarUsuarioBase(usuario, senhaCriptografada, status) {

        return UsuarioBaseModel.create({
            primeiro_nome: usuario.primeiro_nome,
            ultimo_nome: usuario.ultimo_nome,
            email: usuario.email,
            senha: senhaCriptografada,
            ativo: status
        });
    },

    async cadastrarAdministrador(id_usuario, dados) {

        return AdministradorModel.create({
            id: id_usuario,
            nivel_acesso: dados.nivel_acesso,
            api_key: dados.api_key
        });
    },

    async cadastrarAnalista(id_usuario) {

        return AnalistaModel.create({
            id: id_usuario,
            total_segmentacoes: TipoAnalise.NUMERO_INICIAL_SEGMENTACOES,
            total_classificacoes: TipoAnalise.NUMERO_INICIAL_CLASSIFICACOES
        });
    },

    async obterUsuarioCompletoPorLogin(email, senhaCriptografada) {

        const OBTER_USUARIO_SQL = `
            SELECT *
            FROM usuario_base
            LEFT JOIN administrador on usuario_base.id = administrador.id
            LEFT JOIN analista on usuario_base.id = analista.id `;

        const OBTER_PARA_LOGIN = `
            WHERE usuario_base.email = "${email}"
            AND usuario_base.senha = "${senhaCriptografada}"`;

        let resultado;
        await db.query(
            OBTER_USUARIO_SQL + OBTER_PARA_LOGIN,
            {
                type: Sequelize.QueryTypes.SELECT
            }
        )
            .then((results) => {

                if (results.length > 0) {

                    results.forEach(usuario => {

                        if (usuario.email === email) {
                            resultado = usuario;
                        }
                    });
                }                
            });

        return resultado;
    },

    async obterUsuarioBasePorEmail(email) {
        return await UsuarioBaseModel.findOne({
            where: {
                email: email
            }
        });
    },

    async obterUsuarioBasePorId(id_usuario) {
        return UsuarioBaseModel.findByPk(id_usuario);
    },

    async obterAdministradorPorId(id_usuario) {
        return AdministradorModel.findByPk(id_usuario);
    },

    async obterAdministradorCompleto(id_usuario) {

        let administrador;
        const OBTER_ADMINISTRADOR_SQL_QUERY = `
        SELECT *
        FROM usuario_base
        JOIN administrador on usuario_base.id = administrador.id
        WHERE usuario_base.id = ${id_usuario}`;

        await db.query(
            OBTER_ADMINISTRADOR_SQL_QUERY,
            {
                type: Sequelize.QueryTypes.SELECT
            }
        )
            .then((results) => {
                if(results.length > 0){
                    administrador = results;
                }
                else{
                    administrador = results;
                }            
            });

        return administrador;
    },

    async obterAnalistaPorId(id_usuario) {
        return AnalistaModel.findByPk(id_usuario);
    },

    async obterAnalistaCompleto(id_usuario) {

        let analista;
        const OBTER_ANALISTA_SQL_QUERY = `
        SELECT *
        FROM usuario_base
        LEFT JOIN analista ON usuario_base.id = analista.id
        WHERE usuario_base.id = ${id_usuario}`;

        await db.query(
            OBTER_ANALISTA_SQL_QUERY,
            {
                type: Sequelize.QueryTypes.SELECT
            }
        )
            .then((results) => {

                if(results.length > 0){
                    analista = results;
                    analista[0].id = id_usuario;
                }
                else{
                    analista = results;
                }            
            });

        return analista;
    },

    async verificarEmailExistente(email) {

        if (await this.obterUsuarioBasePorEmail(email)) {
            return true;
        }
        return false;
    },

    async ListarTodosUsuarios() {
        return UsuarioBaseModel.findAll();
    },

    async change_password(email, new_hashed_password) {
        var user =  await UsuarioBaseModel.findOne({
            where: {
                email: email
            }
        });
        user.senha = new_hashed_password;
        user.save();

        return user;
    }
};
