"use strict";

// eslint-disable-next-line no-unused-vars
const debug = require("debug")("database.cric:ExcluirClassificacaoExecutor");

const HttpStatus = require("http-status-codes");

const ImagemRepositorio = require("../../repositorios/imagem_repositorio");

const Excecao = require("../../utils/enumeracoes/mensagem_excecoes");
const ObjetoExcecao = require("../../utils/enumeracoes/controle_de_excecoes");
const image_utils = require("../../utils/image");
const gate_keeper = require("../../utils/gate_keeper");

module.exports = {

    async Executar(req, res) {
        await validarRequisicao(req, res);

        const id_celula = Number(req.params.id_celula);
        const id_imagem = Number(req.params.id_imagem);

        await ImagemRepositorio.excluirClassificacaoDeCelula(id_celula);
        await ImagemRepositorio.excluirCelula(
            id_celula,
            id_imagem
        );

        const todasClassificacoes = await ImagemRepositorio.listarClassificacoesCelula(id_imagem);
        const todasLesoes = await ImagemRepositorio.listarLesoes();
        await image_utils.atualizarLesaoMaisGraveNaImagem(
            id_imagem,
            todasClassificacoes,
            todasLesoes
        );
    }
};

async function validarRequisicao(req, res) {

    const imagemTask = ImagemRepositorio.obterImagemPorId(req.params.id_imagem);
    const [imagem] = await Promise.all([imagemTask]);

    if (!imagem) {
        ObjetoExcecao.status = HttpStatus.NOT_FOUND;
        ObjetoExcecao.title = Excecao.IMAGEM_NAO_ENCONTRADA;
        throw ObjetoExcecao;
    }

    gate_keeper.check_strict_ownership(
        imagem,
        res.locals.user
    );
}
