"use strict";

const HttpStatus = require("http-status-codes");
const debug = require("debug")("database.cric:list-classification");

const Excecao = require("../../utils/enumeracoes/mensagem_excecoes");
const ObjetoExcecao = require("../../utils/enumeracoes/controle_de_excecoes");
const ValidarTipo = require("../../utils/validacao_de_tipos");
const ImagemRepositorio = require("../../repositorios/imagem_repositorio");
const UsuarioRepositorio = require("../../repositorios/usuario_repositorio");

module.exports = {

    async Executar(req) {

        await validarRequisicao(req);

        const id_usuario = parseInt(req.params.id_usuario);
        const id_imagem = parseInt(req.params.id_imagem);

        const todasClassificacoes = await ImagemRepositorio.listarClassificacoesCelula(id_imagem, id_usuario);
        await prepararMensagemRetorno(todasClassificacoes);
        return todasClassificacoes;
    }
};

async function validarRequisicao(req) {

    if (!ValidarTipo.ehNumero(req.params.id_usuario) || !ValidarTipo.ehNumero(req.params.id_imagem)) {

        ObjetoExcecao.status = HttpStatus.BAD_REQUEST;
        ObjetoExcecao.title = Excecao.PARAMETROS_INVALIDOS;
        throw ObjetoExcecao;
    }

    const usuarioTask = UsuarioRepositorio.obterUsuarioBasePorId(req.params.id_usuario);
    const analistaTask = UsuarioRepositorio.obterAnalistaPorId(req.params.id_usuario);
    const imagemTask = ImagemRepositorio.obterImagemPorId(req.params.id_imagem);
    const [usuario, analista, imagem] = await Promise.all([usuarioTask, analistaTask, imagemTask]);

    if (!usuario) {
        ObjetoExcecao.status = HttpStatus.NOT_FOUND;
        ObjetoExcecao.title = Excecao.USUARIO_BASE_NAO_ENCONTRATO;
        throw ObjetoExcecao;
    }

    if (!imagem) {
        ObjetoExcecao.status = HttpStatus.NOT_FOUND;
        ObjetoExcecao.title = Excecao.IMAGEM_NAO_ENCONTRADA;
        throw ObjetoExcecao;
    }

    if (!analista) {
        ObjetoExcecao.status = HttpStatus.NOT_FOUND;
        ObjetoExcecao.title = Excecao.ANALISTA_NAO_ENCONTRADO;
        throw ObjetoExcecao;
    }
}

async function prepararMensagemRetorno(todasCelulas) {

    let all_injuries = {};
    await ImagemRepositorio.listarLesoes()
        .then(
            (response) => {
                for (let injury of response) {
                    all_injuries[injury.dataValues.id] = injury.dataValues;
                }
            }
        );

    for (let cell of todasCelulas) {
        cell.lesao = all_injuries[cell.id_lesao];
    }

    return cells;
}