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

    let lesoes = req.body;

    if(!ValidarTipo.ehNumero(req.params.id_usuario) || lesoes.length == 0) {
        ObjetoExcecao.status = HttpStatus.BAD_REQUEST;
        ObjetoExcecao.title = Excecao.PARAMETROS_INVALIDOS;
        throw ObjetoExcecao;
    }

    lesoes.forEach(lesao => {

        if(!lesao.nome) {
            ObjetoExcecao.status = HttpStatus.BAD_REQUEST;
            ObjetoExcecao.title = Excecao.PARAMETROS_INVALIDOS;
            ObjetoExcecao.detail = `Missing nome in ${lesao}`;
            throw ObjetoExcecao;
        }

        if(!lesao.grade) {
            ObjetoExcecao.status = HttpStatus.BAD_REQUEST;
            ObjetoExcecao.title = Excecao.PARAMETROS_INVALIDOS;
            ObjetoExcecao.detail = `Missing grade in ${lesao}`;
            throw ObjetoExcecao;
        }

    });

    const usuario = await UsuarioRepositorio.obterUsuarioBasePorId(req.params.id_usuario);
    if(!usuario) {
        ObjetoExcecao.status = HttpStatus.NOT_FOUND;
        ObjetoExcecao.title = Excecao.USUARIO_BASE_NAO_ENCONTRATO;
        throw ObjetoExcecao;
    }
}
