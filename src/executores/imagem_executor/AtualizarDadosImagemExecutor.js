"use strict";

// eslint-disable-next-line no-unused-vars
const debug = require("debug")("database.cric:AtualizarDadosImagemExecutor");

const HttpStatus = require("http-status-codes");
const validator = require('validator');

const ImagemRepositorio = require("../../repositorios/imagem_repositorio");

const Excecao = require("../../utils/enumeracoes/mensagem_excecoes");
const ObjetoExcecao = require("../../utils/enumeracoes/controle_de_excecoes");
const ValidadorDeSessao = require("../../utils/validador_de_sessao");

module.exports = {

    async Executar(req, res) {

        await validarRequisicao(req);

        let requisicao = {
            id_imagem: req.params.id_imagem,
            codigo_lamina: req.body.codigo_lamina,
            dt_aquisicao: req.body.dt_aquisicao
        };

        const atualizarImagemTask = ImagemRepositorio.atualizarImagem(requisicao);
        await Promise.all([atualizarImagemTask]);
    }
};

async function validarRequisicao(req) {

    if (!validator.isNumeric(req.params.id_imagem)) {
        ObjetoExcecao.status = HttpStatus.BAD_REQUEST;
        ObjetoExcecao.title = Excecao.PARAMETROS_INVALIDOS;
        ObjetoExcecao.detail = "Route parameter invalid";
        throw ObjetoExcecao;
    }

    if (!req.body.codigo_lamina || !req.body.dt_aquisicao) {
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

    await ValidadorDeSessao.login_required(req, imagem.id_usuario);
}
