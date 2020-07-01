"use strict";

const HttpStatus = require("http-status-codes");

const Excecao = require("./enumeracoes/mensagem_excecoes");
const ObjetoExcecao = require("./enumeracoes/controle_de_excecoes");
const SessaoRepositorio = require("../repositorios/sessao_repositorio");
const UsuarioRepositorio = require("../repositorios/usuario_repositorio");

module.exports = {

    async login_required(req, requested_user_id) {
        if (!req.headers.hasOwnProperty("token_autenticacao")) {
            ObjetoExcecao.status = HttpStatus.BAD_REQUEST;
            ObjetoExcecao.title = Excecao.PARAMETROS_INVALIDOS;
            ObjetoExcecao.detail = "token_autenticacao is missing in header";
            throw ObjetoExcecao;
        }

        let session = await SessaoRepositorio.validarTokenAutenticacao(
            req.headers.token_autenticacao
        );
        
        if (session === null) {        
            ObjetoExcecao.status = HttpStatus.UNAUTHORIZED;
            ObjetoExcecao.title = Excecao.TOKEN_AUTORIZACAO_EXPIRADO;
            throw ObjetoExcecao;
        }

        let user = await UsuarioRepositorio.obterUsuarioBasePorEmail(
            session.dataValues.email
        );
        if (user === null) {        
            ObjetoExcecao.status = HttpStatus.UNAUTHORIZED;
            ObjetoExcecao.title = Excecao.TOKEN_AUTORIZACAO_EXPIRADO;
            ObjetoExcecao.detail = "Token doesn't belong to any user";
            throw ObjetoExcecao;
        }
        if (user.dataValues.ativo === false) {        
            ObjetoExcecao.status = HttpStatus.UNAUTHORIZED;
            ObjetoExcecao.title = Excecao.TOKEN_AUTORIZACAO_EXPIRADO;
            ObjetoExcecao.detail = "Token doesn't belong to active user";
            throw ObjetoExcecao;
        }
        if (requested_user_id && !(user.dataValues.admin === true || requested_user_id === user.dataValues.id)) {
            ObjetoExcecao.status = HttpStatus.UNAUTHORIZED;
            ObjetoExcecao.title = Excecao.TOKEN_AUTORIZACAO_EXPIRADO;
            ObjetoExcecao.detail = "Token doesn't belong to required user";
            throw ObjetoExcecao;
        }
    },

    async admin_required(req) {
        if (!req.headers.hasOwnProperty("token_autenticacao")) {
            ObjetoExcecao.status = HttpStatus.BAD_REQUEST;
            ObjetoExcecao.title = Excecao.PARAMETROS_INVALIDOS;
            ObjetoExcecao.detail = "token_autenticacao is missing in header";
            throw ObjetoExcecao;
        }
        
        let session = await SessaoRepositorio.validarTokenAutenticacao(
            req.headers.token_autenticacao
        );
        
        if (session === null) {        
            ObjetoExcecao.status = HttpStatus.UNAUTHORIZED;
            ObjetoExcecao.title = Excecao.TOKEN_AUTORIZACAO_EXPIRADO;
            throw ObjetoExcecao;
        }

        let user = await UsuarioRepositorio.obterUsuarioBasePorEmail(
            session.dataValues.email
        );
        if (user === null) {        
            ObjetoExcecao.status = HttpStatus.UNAUTHORIZED;
            ObjetoExcecao.title = Excecao.TOKEN_AUTORIZACAO_EXPIRADO;
            ObjetoExcecao.detail = "Token doesn't belong to any user";
            throw ObjetoExcecao;
        }
        if (user.dataValues.ativo === false) {        
            ObjetoExcecao.status = HttpStatus.UNAUTHORIZED;
            ObjetoExcecao.title = Excecao.TOKEN_AUTORIZACAO_EXPIRADO;
            ObjetoExcecao.detail = "Token doesn't belong to active user";
            throw ObjetoExcecao;
        }
        if (user.dataValues.admin === false) {        
            ObjetoExcecao.status = HttpStatus.UNAUTHORIZED;
            ObjetoExcecao.title = Excecao.TOKEN_AUTORIZACAO_EXPIRADO;
            ObjetoExcecao.detail = "Token doesn't belong to user with admin rights";
            throw ObjetoExcecao;
        }
    }
};
