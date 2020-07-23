"use strict";

// eslint-disable-next-line no-unused-vars
const debug = require("debug")("database.cric:CadastrarLesaoExecutor");

const Excecao = require("../../utils/enumeracoes/mensagem_excecoes");
const ObjetoExcecao = require("../../utils/enumeracoes/controle_de_excecoes");
const HttpStatus = require("http-status-codes");
const ValidarTipo = require("../../utils/validacao_de_tipos");
const ValidadorDeSessao = require("../../utils/validador_de_sessao");
const ListarLesoes = require("../imagem_executor/ListarLesoesExecutor");
const ImagemRepositorio = require("../../repositorios/imagem_repositorio");
const UsuarioRepositorio = require("../../repositorios/usuario_repositorio");

module.exports = {

    async Executar(req) {

        await ValidadorDeSessao.admin_required(req);
        await validarRequisicao(req);
        await ImagemRepositorio.cadastrarLesao(req.body);
    }
};

async function validarRequisicao(req) {
    if(!req.body.nome) {
        ObjetoExcecao.status = HttpStatus.BAD_REQUEST;
        ObjetoExcecao.title = Excecao.PARAMETROS_INVALIDOS;
        ObjetoExcecao.detail = `Missing nome`;
        throw ObjetoExcecao;
    }

    if(!req.body.grade) {
        ObjetoExcecao.status = HttpStatus.BAD_REQUEST;
        ObjetoExcecao.title = Excecao.PARAMETROS_INVALIDOS;
        ObjetoExcecao.detail = `Missing grade`;
        throw ObjetoExcecao;
    }
}
