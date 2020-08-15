"use strict";

// eslint-disable-next-line no-unused-vars
const debug = require("debug")("database.cric:CadastrarLesaoExecutor");

const HttpStatus = require("http-status-codes");
const validator = require('validator');

const ImagemRepositorio = require("../../repositorios/imagem_repositorio");

const Excecao = require("../../utils/enumeracoes/mensagem_excecoes");
const ObjetoExcecao = require("../../utils/enumeracoes/controle_de_excecoes");
const ValidadorDeSessao = require("../../utils/validador_de_sessao");

module.exports = {

    async Executar(req, res) {

        await ValidadorDeSessao.admin_required(req);
        await validarRequisicao(req);
        await ImagemRepositorio.cadastrarLesao(req.body);
    }
};

async function validarRequisicao(req) {
    if(!req.body.nome || !validator.isAlphanumeric(req.body.nome)) {
        ObjetoExcecao.status = HttpStatus.BAD_REQUEST;
        ObjetoExcecao.title = Excecao.PARAMETROS_INVALIDOS;
        ObjetoExcecao.detail = "Missing nome";
        throw ObjetoExcecao;
    }

    if(!req.body.grade || !validator.isNumeric(req.body.grade)) {
        ObjetoExcecao.status = HttpStatus.BAD_REQUEST;
        ObjetoExcecao.title = Excecao.PARAMETROS_INVALIDOS;
        ObjetoExcecao.detail = "Missing grade";
        throw ObjetoExcecao;
    }
}
