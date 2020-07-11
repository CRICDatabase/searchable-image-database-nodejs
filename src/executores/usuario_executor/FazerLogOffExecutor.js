"use strict";

const Excecao = require("../../utils/enumeracoes/mensagem_excecoes");
const ObjetoExcecao = require("../../utils/enumeracoes/controle_de_excecoes");
const HttpStatus = require("http-status-codes");
const SessaoRepositorio = require("../../repositorios/sessao_repositorio");
const ValidadorDeSessao = require("../../utils/validador_de_sessao");

module.exports = {

    async Executar(req) {

        validarRequisicao(req);
        await ValidadorDeSessao.login_required(req);
        return await SessaoRepositorio.anularRegistroDeSessao(req.params.Authorization);
    }
};

function validarRequisicao(req){

    if(!req.params.Authorization){
        ObjetoExcecao.status = HttpStatus.BAD_REQUEST;
        ObjetoExcecao.title = Excecao.PARAMETROS_INVALIDOS;
        throw ObjetoExcecao;
    }
}
