"use strict";

// eslint-disable-next-line no-unused-vars
const debug = require("debug")("database.cric:CadastrarClassificacaoExecutor");

const HttpStatus = require("http-status-codes");

const ImagemRepositorio = require("../../repositorios/imagem_repositorio");
const UsuarioRepositorio = require("../../repositorios/usuario_repositorio");

const ConverterPonto = require("../../utils/transformacao_de_pontos");
const Excecao = require("../../utils/enumeracoes/mensagem_excecoes");
const ObjetoExcecao = require("../../utils/enumeracoes/controle_de_excecoes");
const image_utils = require("../../utils/image");

module.exports = {

    async Executar(req, res) {

        await validarRequisicao(req);
        const id_usuario = parseInt(req.params.id_usuario);
        const id_imagem = parseInt(req.params.id_imagem);

        let parametros = {
            coord_x: req.body.coord_centro_nucleo_x,
            coord_y: req.body.coord_centro_nucleo_y,
            alturaCanvas: req.body.alturaCanvas,
            larguraCanvas: req.body.larguraCanvas,
            alturaOriginalImg: req.body.alturaOriginalImg,
            larguraOriginalImg: req.body.larguraOriginalImg
        };

        let resultado = ConverterPonto.converterPontoParaArmazenarNoBanco(parametros);
        const classificacaoCadastrada = 
              await ImagemRepositorio.cadastrarClassificacaoCelula(
                  id_usuario,
                  id_imagem,
                  req.body.id_lesao,
                  resultado.coord_x,
                  resultado.coord_y
              );

        if (classificacaoCadastrada) {
            const todasClassificacoes = await ImagemRepositorio.listarClassificacoesCelula(id_imagem);
            await image_utils.atualizarLesaoMaisGraveNaImagem(
                id_imagem,
                todasClassificacoes
            );
        }
    }
};

async function validarRequisicao(req) {

    if (!req.body.id_lesao || typeof req.body.id_lesao !== "number" ||
        !req.body.alturaCanvas || typeof req.body.alturaCanvas !== "number" ||
        !req.body.larguraCanvas || typeof req.body.larguraCanvas !== "number" ||
        !req.body.alturaOriginalImg || typeof req.body.alturaOriginalImg !== "number" ||
        !req.body.larguraOriginalImg || typeof req.body.larguraOriginalImg !== "number" ||
        !req.body.coord_centro_nucleo_x || typeof req.body.coord_centro_nucleo_x !== "number" ||
        !req.body.coord_centro_nucleo_y || typeof req.body.coord_centro_nucleo_y !== "number") {

        ObjetoExcecao.status = HttpStatus.BAD_REQUEST;
        ObjetoExcecao.title = Excecao.PARAMETROS_INVALIDOS;
        throw ObjetoExcecao;
    }

    const usuarioTask = UsuarioRepositorio.obterUsuarioBasePorId(req.params.id_usuario);
    const imagemTask = ImagemRepositorio.obterImagemPorId(req.params.id_imagem);
    const lesaoTask = ImagemRepositorio.obterLesaoPorId(req.body.id_lesao);
    const [usuario, imagem, lesao] = await Promise.all([usuarioTask, imagemTask, lesaoTask]);

    if (!usuario) {
        ObjetoExcecao.status = HttpStatus.NOT_FOUND;
        ObjetoExcecao.title = Excecao.USUARIO_BASE_NAO_ENCONTRATO;
        throw ObjetoExcecao;
    }

    if (!lesao) {
        ObjetoExcecao.status = HttpStatus.NOT_FOUND;
        ObjetoExcecao.title = Excecao.LESAO_NAO_ENCONTRADA;
        throw ObjetoExcecao;
    }

    if (!imagem) {
        ObjetoExcecao.status = HttpStatus.NOT_FOUND;
        ObjetoExcecao.title = Excecao.IMAGEM_NAO_ENCONTRADA;
        throw ObjetoExcecao;
    }


    if (imagem.id_usuario !== usuario.id) {
        ObjetoExcecao.status = HttpStatus.UNAUTHORIZED;
        ObjetoExcecao.title = Excecao.USUARIO_NAO_AUTORIZADO;
        ObjetoExcecao.detail = "User can only add classification to own image";
        throw ObjetoExcecao;
    }
    
}
