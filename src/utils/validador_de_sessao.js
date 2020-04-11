'use strict'

const Excecao = require('./enumeracoes/mensagem_excecoes');
const ObjetoExcecao = require('./enumeracoes/controle_de_excecoes');
const HttpStatus = require('http-status-codes');
const SessaoRepositorio = require('../repositorios/sessao_repositorio');
const GeradorIdUnico = require('../utils/gerador_identificador_unico');

module.exports = {

    async validarAcessoAServicos(req) {

        if(req.headers.token_autenticacao != GeradorIdUnico.obterTokenCuringa()) {

            let resultado = await SessaoRepositorio.validarTokenAutenticacao(req.headers.token_autenticacao);
            if (resultado.length == 0) {
            
                ObjetoExcecao.status_code = HttpStatus.UNAUTHORIZED;
                ObjetoExcecao.mensagem = Excecao.TOKEN_AUTORIZACAO_EXPIRADO;
                throw ObjetoExcecao;
            }
        }
    },
}