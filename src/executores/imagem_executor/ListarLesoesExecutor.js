"use strict";

// eslint-disable-next-line no-unused-vars
const debug = require("debug")("database.cric:ListarLesoesExecutor");

const HttpStatus = require("http-status-codes");

const Excecao = require("../../utils/enumeracoes/mensagem_excecoes");
const ObjetoExcecao = require("../../utils/enumeracoes/controle_de_excecoes");
const ImagemRepositorio = require("../../repositorios/imagem_repositorio");

module.exports = {

    async Executar() {
        const todasLesoes = await ImagemRepositorio.listarLesoes();

        if(todasLesoes.length == 0) {
            ObjetoExcecao.status = HttpStatus.NOT_FOUND;
            ObjetoExcecao.title = Excecao.LESAO_NAO_ENCONTRADA;
            throw ObjetoExcecao;
        }

        return todasLesoes;
    }
};
