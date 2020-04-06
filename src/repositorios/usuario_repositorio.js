'use strict';

const TipoAnalise = require('../utils/enumeracoes/tipo_analise_realizada');
const UsuarioBaseModel = require('../models/UsuarioBaseModel');
const AdministradorModel = require('../models/AdministradorModel');
const CitopatologistaModel = require('../models/CitopatologistaModel');
const VisitanteModel = require('../models/VisitanteModel');
const AnalistaModel = require('../models/AnalistaModel');
const db = require('../database');

module.exports = {

    async processarQuerySql(sqlQuery) {

        let resultado;

        await db.query(sqlQuery)
        .then(([results, metadata]) => {
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

    async cadastrarCitopatologista(id_usuario, dados) {

        return CitopatologistaModel.create({
            id: id_usuario,
            codigo_crc: dados.codigo_crc
        });
    },

    async cadastrarAnalista(id_usuario) {

        return AnalistaModel.create({
            id: id_usuario,
            total_segmentacoes: TipoAnalise.NUMERO_INICIAL_SEGMENTACOES,
            total_classificacoes: TipoAnalise.NUMERO_INICIAL_CLASSIFICACOES
        });
    },

    async cadastrarVisitante(id_usuario, dados) {

        return VisitanteModel.create({
            id: id_usuario,
            pais: dados.pais,
            estado_regiao: dados.estado_regiao,
            cidade: dados.cidade
        });
    },

    async obterUsuarioCompletoPorIdOuLogin(id_usuario, email, senhaCriptografada) {

        const OBTER_USUARIO_SQL = `
            SELECT *
            FROM usuario_base
            LEFT JOIN administrador on usuario_base.id = administrador.id
            LEFT JOIN citopatologista on usuario_base.id = citopatologista.id
            LEFT JOIN visitante on usuario_base.id = visitante.id
            LEFT JOIN analista on usuario_base.id = analista.id `;

        const OBTER_POR_ID = `
            WHERE usuario_base.id = ${id_usuario}`;

        const OBTER_PARA_LOGIN = `
            WHERE usuario_base.email = \"${email}\"
            AND usuario_base.senha = \"${senhaCriptografada}\"`;

        let resultado;
        if (id_usuario == 0) {
            await db.query(OBTER_USUARIO_SQL + OBTER_PARA_LOGIN)
            .then(([results, metadata]) => {

                if (results.length > 0) {

                    results.forEach(usuario => {

                        if (usuario.email === email) {
                            resultado = usuario;
                        }
                    });
                }                
            });
        }
        else {
            await db.query(OBTER_USUARIO_SQL + OBTER_POR_ID)
            .then(([results, metadata]) => {

                if (results.length > 0) {
                    resultado = results[0];
                }                               
            });
        }

        return resultado;
    },

    async obterUsuarioBasePorEmail(email) {

        let resultado;
        const usuarios = await UsuarioBaseModel.findAll({
            where: {
                email: email
            }
        });

        if (usuarios.length > 0) {

            usuarios.forEach(usuario => {

                if (usuario.email == email) {
                    resultado = usuario;
                }
            });
        }

        return resultado;
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

        await db.query(OBTER_ADMINISTRADOR_SQL_QUERY)
        .then(([results, metadata]) => {
            if(results.length > 0){
                administrador = results;
            }
            else{
                administrador = results;
            }            
        });

        return administrador;
    },

    async obterCitopatologistaPorId(id_usuario) {
        return CitopatologistaModel.findByPk(id_usuario);
    },

    async obterCitopatologistaCompleto(id_usuario) {

        let citopatologista;
        const OBTER_CITOPATOLOGISTA_SQL_QUERY = `
        SELECT *
        FROM usuario_base
        JOIN citopatologista on usuario_base.id = citopatologista.id
        WHERE usuario_base.id = ${id_usuario}`;

        await db.query(OBTER_CITOPATOLOGISTA_SQL_QUERY)
        .then(([results, metadata]) => {
            if(results.length > 0){
                citopatologista = results;
            }
            else{
                citopatologista = results;
            }            
        });

        return citopatologista;
    },

    async obterVisitantePorId(id_usuario) {
        return VisitanteModel.findByPk(id_usuario);
    },

    async obterVisitanteCompleto(id_usuario) {

        let visitante;
        const OBTER_VISITANTE_SQL_QUERY = `
        SELECT *
        FROM usuario_base
        JOIN visitante on usuario_base.id = visitante.id
        WHERE usuario_base.id = ${id_usuario}`;

        await db.query(OBTER_VISITANTE_SQL_QUERY)
        .then(([results, metadata]) => {

            if (results.length > 0) {
                visitante = results;
            }
            else {
                visitante = results;
            }
        });

        return visitante;
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
        LEFT JOIN citopatologista ON usuario_base.id = citopatologista.id
        LEFT JOIN visitante ON usuario_base.id = visitante.id
        WHERE usuario_base.id = ${id_usuario}`;

        await db.query(OBTER_ANALISTA_SQL_QUERY)
        .then(([results, metadata]) => {

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

    async transformarUsuarioEmCitopatologista(id_usuario, codigo_crc) {

        return CitopatologistaModel.create({
            id: id_usuario,
            codigo_crc: codigo_crc
        });
    }
};