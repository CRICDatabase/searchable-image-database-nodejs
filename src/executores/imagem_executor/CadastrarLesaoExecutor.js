"use strict";

// eslint-disable-next-line no-unused-vars
const debug = require("debug")("database.cric:CadastrarLesaoExecutor");

const HttpStatus = require("http-status-codes");

const ImagemRepositorio = require("../../repositorios/imagem_repositorio");

const Excecao = require("../../utils/enumeracoes/mensagem_excecoes");
const ObjetoExcecao = require("../../utils/enumeracoes/controle_de_excecoes");

module.exports = {

    async Executar(req, res) {

        await validarRequisicao(req);
        await ImagemRepositorio.cadastrarLesao(req.body);
    }
};

async function validarRequisicao(req) {
    if(!req.body.nome || typeof req.body.nome !== "string") {
        ObjetoExcecao.status = HttpStatus.BAD_REQUEST;
        ObjetoExcecao.title = Excecao.PARAMETROS_INVALIDOS;
        ObjetoExcecao.detail = "Missing nome";
        throw ObjetoExcecao;
    }

    if(!req.body.grade || typeof req.body.grade !== "number") {
        ObjetoExcecao.status = HttpStatus.BAD_REQUEST;
        ObjetoExcecao.title = Excecao.PARAMETROS_INVALIDOS;
        ObjetoExcecao.detail = "Missing grade";
        throw ObjetoExcecao;
    }
}
