"use strict";

const HttpStatus = require("http-status-codes");

const Excecao = require("./enumeracoes/mensagem_excecoes");
const ObjetoExcecao = require("./enumeracoes/controle_de_excecoes");
const SessaoRepositorio = require("../repositorios/sessao_repositorio");
const UsuarioRepositorio = require("../repositorios/usuario_repositorio");

module.exports = {

    async validarAcessoAServicos(req) {
        let resultado = await SessaoRepositorio.validarTokenAutenticacao(
            req.headers.token_autenticacao
        );
        if (resultado === null) {        
            ObjetoExcecao.status = HttpStatus.UNAUTHORIZED;
            ObjetoExcecao.title = Excecao.TOKEN_AUTORIZACAO_EXPIRADO;
            throw ObjetoExcecao;
        }
    },

    async login_required(req) {
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
        if (user.dataValues.ativo === 0) {        
            ObjetoExcecao.status = HttpStatus.UNAUTHORIZED;
            ObjetoExcecao.title = Excecao.TOKEN_AUTORIZACAO_EXPIRADO;
            ObjetoExcecao.detail = "Token doesn't belong to active user";
            throw ObjetoExcecao;
        }
    },

    async admin_required(req) {
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
        if (user.dataValues.ativo === 0) {        
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
