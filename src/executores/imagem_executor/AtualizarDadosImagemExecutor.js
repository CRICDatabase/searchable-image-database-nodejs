"use strict";

// eslint-disable-next-line no-unused-vars
const debug = require("debug")("database.cric:AtualizarDadosImagemExecutor");

const HttpStatus = require("http-status-codes");
const validator = require("validator");

const ImagemRepositorio = require("../../repositorios/imagem_repositorio");

const Excecao = require("../../utils/enumeracoes/mensagem_excecoes");
const ObjetoExcecao = require("../../utils/enumeracoes/controle_de_excecoes");

module.exports = {

    async Executar(req, res) {

        await validarRequisicao(req, res);

        let requisicao = {
            id_imagem: req.params.id_imagem,
            codigo_lamina: req.body.codigo_lamina,
            dt_aquisicao: req.body.dt_aquisicao
        };

        const atualizarImagemTask = ImagemRepositorio.atualizarImagem(requisicao);
        await Promise.all([atualizarImagemTask]);
    }
};

async function validarRequisicao(req, res) {

    if (!req.body.codigo_lamina || !validator.isLength(req.body.codigo_lamina, { min: 3 }) ||
        !req.body.dt_aquisicao || !validator.isDate(req.body.dt_aquisicao)) {
        ObjetoExcecao.status = HttpStatus.BAD_REQUEST;
        ObjetoExcecao.title = Excecao.PARAMETROS_INVALIDOS;
        ObjetoExcecao.detail = "Body request is invalid";
        throw ObjetoExcecao;
    }

    const imagemTask = ImagemRepositorio.obterImagemPorId(req.params.id_imagem);
    const [imagem] = await Promise.all([imagemTask]);

    if (!imagem) {
        ObjetoExcecao.status = HttpStatus.NOT_FOUND;
        ObjetoExcecao.title = Excecao.IMAGEM_NAO_ENCONTRADA;
        throw ObjetoExcecao;
    }

    if (!res.locals.user || (res.locals.user.admin === false || imagem.id_usuario !== res.locals.user.id)) {
        ObjetoExcecao.status = HttpStatus.FORBIDDEN;
        throw ObjetoExcecao;
    }
}
