"use strict";

// eslint-disable-next-line no-unused-vars
const debug = require("debug")("database.cric:AtualizarClassificacaoExecutor");

const HttpStatus = require("http-status-codes");

const ImagemRepositorio = require("../../repositorios/imagem_repositorio");

const Excecao = require("../../utils/enumeracoes/mensagem_excecoes");
const ObjetoExcecao = require("../../utils/enumeracoes/controle_de_excecoes");
const image_utils = require("../../utils/image");

module.exports = {

    async Executar(req, res) {

        await validarRequisicao(req, res);
        
        const id_imagem = Number(req.params.id_imagem);

        let requisicao = {
            id_imagem: id_imagem,
            id_lesao_celula: req.body.id_lesao_celula,
            id_celula: req.params.id_celula
        };

        const atualizarCelulaTask = ImagemRepositorio.atualizarClassificacao(requisicao);
        await Promise.all([atualizarCelulaTask]);

        const todasClassificacoes = await ImagemRepositorio.listarClassificacoesCelula(id_imagem);
        await image_utils.atualizarLesaoMaisGraveNaImagem(
            id_imagem,
            todasClassificacoes
        );
    }
};

async function validarRequisicao(req, res) {
    if (!req.body.id_lesao_celula || typeof req.body.id_lesao_celula !== "number") {
        ObjetoExcecao.status = HttpStatus.BAD_REQUEST;
        ObjetoExcecao.title = Excecao.PARAMETROS_INVALIDOS;
        ObjetoExcecao.detail = "Body request is invalid";
        throw ObjetoExcecao;
    }

    const imagemTask = ImagemRepositorio.obterImagemPorId(req.params.id_imagem);
    const celulaTask = ImagemRepositorio.obterClassificacaoPorId(req.params.id_celula);
    const [imagem, celula] = await Promise.all([imagemTask, celulaTask]);

    if (!imagem) {
        ObjetoExcecao.status = HttpStatus.NOT_FOUND;
        ObjetoExcecao.title = Excecao.IMAGEM_NAO_ENCONTRADA;
        throw ObjetoExcecao;
    }

    if (res.locals.user && imagem.id_usuario !== res.locals.user.id) {
        ObjetoExcecao.status = HttpStatus.FORBIDDEN;
        throw ObjetoExcecao;
    }

    if(!celula) {
        ObjetoExcecao.status = HttpStatus.NOT_FOUND;
        ObjetoExcecao.title = Excecao.CELULA_NAO_ENCONTRADA;
        throw ObjetoExcecao;
    }

}
