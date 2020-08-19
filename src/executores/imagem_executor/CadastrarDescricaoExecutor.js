"use strict";

// eslint-disable-next-line no-unused-vars
const debug = require("debug")("database.cric:CadastrarDescricaoExecutor");

const HttpStatus = require("http-status-codes");

const ImagemRepositorio = require("../../repositorios/imagem_repositorio");
const UsuarioRepositorio = require("../../repositorios/usuario_repositorio");

const Excecao = require("../../utils/enumeracoes/mensagem_excecoes");
const ObjetoExcecao = require("../../utils/enumeracoes/controle_de_excecoes");

const ListarDescricoes = require("../imagem_executor/ListarDescricoesExecutor");

module.exports = {

    async Executar(req, res) {

        await validarRequisicao(req);
        const total = req.body.length;

        for (let i = 0; i < total; i++) {
            await ImagemRepositorio.cadastrarDescricao(req.body[i]);
        }

        return await ListarDescricoes.Executar(req, res);
    }
};

async function validarRequisicao(req) {
    let descricoes = req.body;

    if(descricoes.length == 0) {
        ObjetoExcecao.status = HttpStatus.BAD_REQUEST;
        ObjetoExcecao.title = Excecao.PARAMETROS_INVALIDOS;
        ObjetoExcecao.detail = "Body must be a array";
        throw ObjetoExcecao;
    }

    descricoes.forEach(descricao => {

        if(!descricao.codigo || typeof descricao.codigo !== "number") {
            ObjetoExcecao.status = HttpStatus.BAD_REQUEST;
            ObjetoExcecao.title = Excecao.PARAMETROS_INVALIDOS;
            ObjetoExcecao.detail = `Missing 'codigo' in ${descricao}`;
            throw ObjetoExcecao;
        }
    });
}
