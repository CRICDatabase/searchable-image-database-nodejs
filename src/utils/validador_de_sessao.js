"use strict";

const Excecao = require("./enumeracoes/mensagem_excecoes");
const ObjetoExcecao = require("./enumeracoes/controle_de_excecoes");
const HttpStatus = require("http-status-codes");
const SessaoRepositorio = require("../repositorios/sessao_repositorio");
const GeradorIdUnico = require("../utils/gerador_identificador_unico");

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