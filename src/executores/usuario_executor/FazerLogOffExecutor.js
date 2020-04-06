'use strict';

const Excecao = require('../../utils/enumeracoes/mensagem_excecoes');
const ObjetoExcecao = require('../../utils/enumeracoes/controle_de_excecoes');
const HttpStatus = require('http-status-codes');
const SessaoRepositorio = require('../../repositorios/sessao_repositorio');
const ValidadorDeSessao = require('../../utils/validador_de_sessao');

module.exports = {

    async Executar(req) {

        await ValidadorDeSessao.validarAcessoAServicos(req);
        validarRequisicao(req);
        return await SessaoRepositorio.anularRegistroDeSessao(req.params.token_autenticacao);
    }
};

function validarRequisicao(req){

    if(!req.params.token_autenticacao){
        ObjetoExcecao.status = HttpStatus.BAD_REQUEST;
        ObjetoExcecao.title = Excecao.PARAMETROS_INVALIDOS;
        throw ObjetoExcecao;
    }
}