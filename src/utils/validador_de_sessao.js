"use strict";

const HttpStatus = require("http-status-codes");

const Excecao = require("./enumeracoes/mensagem_excecoes");
const ObjetoExcecao = require("./enumeracoes/controle_de_excecoes");
const SessaoRepositorio = require("../repositorios/sessao_repositorio");

module.exports = {

    async validarAcessoAServicos(req) {
        let resultado = await SessaoRepositorio.validarTokenAutenticacao(
            req.headers.token_autenticacao
        );
        if (resultado.length == 0) {        
            ObjetoExcecao.status = HttpStatus.UNAUTHORIZED;
            ObjetoExcecao.title = Excecao.TOKEN_AUTORIZACAO_EXPIRADO;
            throw ObjetoExcecao;
        }
    }
};