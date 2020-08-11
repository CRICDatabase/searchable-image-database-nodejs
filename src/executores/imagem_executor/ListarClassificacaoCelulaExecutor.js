"use strict";

// eslint-disable-next-line no-unused-vars
const debug = require("debug")("database.cric:ListarClassificacaoCelulaExecutor");

const HttpStatus = require("http-status-codes");

const Excecao = require("../../utils/enumeracoes/mensagem_excecoes");
const ObjetoExcecao = require("../../utils/enumeracoes/controle_de_excecoes");
const ValidarTipo = require("../../utils/validacao_de_tipos");
const ImagemRepositorio = require("../../repositorios/imagem_repositorio");
const UsuarioRepositorio = require("../../repositorios/usuario_repositorio");
const ValidadorDeSessao = require("../../utils/validador_de_sessao");

module.exports = {

    async Executar(req, res) {

        await validarRequisicao(req);

        const id_imagem = parseInt(req.params.id_imagem);

        const todasClassificacoes = await ImagemRepositorio.listarClassificacoesCelula(id_imagem);
        return await prepararMensagemRetorno(todasClassificacoes);
    }
};

async function validarRequisicao(req) {
    let session_is_valid = false;

    if (!ValidarTipo.ehNumero(req.params.id_usuario) || !ValidarTipo.ehNumero(req.params.id_imagem)) {
        ObjetoExcecao.status = HttpStatus.BAD_REQUEST;
        ObjetoExcecao.title = Excecao.PARAMETROS_INVALIDOS;
        throw ObjetoExcecao;
    }

    const id_usuario = Number(req.params.id_usuario);
    const id_imagem = Number(req.params.id_imagem);

    if (id_usuario > 1) {
        await ValidadorDeSessao.login_required(req, id_usuario);
        session_is_valid = true;
    }

    const usuarioTask = UsuarioRepositorio.obterUsuarioBasePorId(id_usuario);
    const imagemTask = ImagemRepositorio.obterImagemPorId(id_imagem);
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

async function prepararMensagemRetorno(raw_cells) {
    let cells = [];

    let all_injuries = {};
    await ImagemRepositorio.listarLesoes()
        .then(
            (response) => {
                for (let injury of response) {
                    all_injuries[injury.dataValues.id] = injury.dataValues;
                }
            }
        );

    for (let cell of raw_cells) {
        cells.push(
            {
                id: cell.id,
                coord_centro_nucleo_x: cell.coord_centro_nucleo_x,
                coord_centro_nucleo_y: cell.coord_centro_nucleo_y,
                lesao: all_injuries[cell.id_lesao]
            }
        );
    }

    return cells;
}
