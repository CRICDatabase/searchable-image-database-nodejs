"use strict";

// eslint-disable-next-line no-unused-vars
const debug = require("debug")("database.cric:ListarClassificacaoCelulaExecutor");

const HttpStatus = require("http-status-codes");

const ImagemRepositorio = require("../../repositorios/imagem_repositorio");
const UsuarioRepositorio = require("../../repositorios/usuario_repositorio");

const Excecao = require("../../utils/enumeracoes/mensagem_excecoes");
const ObjetoExcecao = require("../../utils/enumeracoes/controle_de_excecoes");
const gate_keeper = require("../../utils/gate_keeper");

module.exports = {

    async Executar(req, res) {

        await validarRequisicao(req, res);

        const id_imagem = parseInt(req.params.id_imagem);

        const todasClassificacoes = await ImagemRepositorio.listarClassificacoesCelula(id_imagem);
        return await prepararMensagemRetorno(todasClassificacoes);
    }
};

async function validarRequisicao(req, res) {

    const id_usuario = Number(req.params.id_usuario);
    const id_imagem = Number(req.params.id_imagem);

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

    gate_keeper.check_loose_ownership(
        imagem,
        res.locals.user
    );
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
                id_usuario: cell.id_usuario,
                coord_centro_nucleo_x: cell.coord_centro_nucleo_x,
                coord_centro_nucleo_y: cell.coord_centro_nucleo_y,
                lesao: all_injuries[cell.id_lesao]
            }
        );
    }

    return cells;
}
