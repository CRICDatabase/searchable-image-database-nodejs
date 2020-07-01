"use strict";

const HttpStatus = require("http-status-codes");

const Excecao = require("../../utils/enumeracoes/mensagem_excecoes");
const ObjetoExcecao = require("../../utils/enumeracoes/controle_de_excecoes");
const ValidarTipo = require("../../utils/validacao_de_tipos");
const ImagemRepositorio = require("../../repositorios/imagem_repositorio");
const UsuarioRepositorio = require("../../repositorios/usuario_repositorio");
const ValidadorDeSessao = require("../../utils/validador_de_sessao");

module.exports = {

    async Executar(req) {

        await validarRequisicao(req);

        const id_usuario = parseInt(req.params.id_usuario);
        const id_imagem = parseInt(req.params.id_imagem);

        const todasClassificacoes = await ImagemRepositorio.listarClassificacoesCelula(id_imagem);
        await prepararMensagemRetorno(todasClassificacoes);
        return todasClassificacoes;
    }
};

async function validarRequisicao(req) {
    let session_is_valid = false;

    if (!ValidarTipo.ehNumero(req.params.id_usuario) || !ValidarTipo.ehNumero(req.params.id_imagem)) {

        ObjetoExcecao.status = HttpStatus.BAD_REQUEST;
        ObjetoExcecao.title = Excecao.PARAMETROS_INVALIDOS;
        throw ObjetoExcecao;
    }

    if (req.params.id_usuario > 1) {
        await ValidadorDeSessao.login_required(req, req.params.id_usuario);
        session_is_valid = true;
    }

    const usuarioTask = UsuarioRepositorio.obterUsuarioBasePorId(req.params.id_usuario);
    const imagemTask = ImagemRepositorio.obterImagemPorId(req.params.id_imagem);
    const [usuario, imagem] = await Promise.all([usuarioTask, imagemTask]);

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

    if (imagem.id_usuario > 1) {
        if (imagem.id_usuario !== usuario.id) {
            ObjetoExcecao.status = HttpStatus.UNAUTHORIZED;
            ObjetoExcecao.title = Excecao.OPERACAO_PROIBIDA_PARA_O_USUARIO;
            ObjetoExcecao.detail = `User ${usuario.id} can't change image ${imagem.id}`;
            throw ObjetoExcecao;
        }

        if (!session_is_valid) {
            await ValidadorDeSessao.login_required(req, usuario.id);
        }
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
}
