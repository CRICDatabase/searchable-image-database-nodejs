"use strict";

// eslint-disable-next-line no-unused-vars
const debug = require("debug")("database.cric:put_injury");

const HttpStatus = require("http-status-codes");
const validator = require("validator");

const ImagemRepositorio = require("../../repositorios/imagem_repositorio");

const Excecao = require("../../utils/enumeracoes/mensagem_excecoes");
const ObjetoExcecao = require("../../utils/enumeracoes/controle_de_excecoes");

module.exports = {

    async Executar(req, res) {
        await validarRequisicao(req, res);
        return await ImagemRepositorio.update_injury(
            {
                id: req.params.id_lesoes,
                ...req.body
            }
        );
    }
};

async function validarRequisicao(req, res) {

    if (!req.body.nome || typeof req.body.nome !== "string" ||
        !req.body.detalhes || typeof req.body.detalhes !== "string" ||
        !req.body.grade) {
        ObjetoExcecao.status = HttpStatus.BAD_REQUEST;
        ObjetoExcecao.title = Excecao.PARAMETROS_INVALIDOS;
        ObjetoExcecao.detail = "Body request is invalid";
        throw ObjetoExcecao;
    }

    debug(req.params);
    const injury_task = ImagemRepositorio.obterLesaoPorId(req.params.id_lesoes);
    const [injury] = await Promise.all([injury_task]);

    if (!injury) {
        ObjetoExcecao.status = HttpStatus.NOT_FOUND;
        throw ObjetoExcecao;
    }
}
