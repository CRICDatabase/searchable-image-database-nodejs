"use strict";

const HttpStatus = require("http-status-codes");

const ImagemRepositorio = require("../../repositorios/imagem_repositorio");
const UsuarioRepositorio = require("../../repositorios/usuario_repositorio");

const Excecao = require("../../utils/enumeracoes/mensagem_excecoes");
const ObjetoExcecao = require("../../utils/enumeracoes/controle_de_excecoes");
const ValidadorDeSessao = require("../../utils/validador_de_sessao");
const ValidarTipo = require("../../utils/validacao_de_tipos");
const image_utils = require("../../utils/image");

module.exports = {

    async Executar(req) {

        await validarRequisicao(req);
        
        const id_imagem = Number(req.params.id_imagem);

        let requisicao = {
            id_imagem: id_imagem,
            id_lesao_celula: req.body.id_lesao_celula,
            id_celula: req.body.id_celula
        };

        const atualizarCelulaTask = ImagemRepositorio.atualizarCelula(requisicao);
        await Promise.all([atualizarCelulaTask]);

        const todasClassificacoes = await ImagemRepositorio.listarClassificacoesCelula(id_imagem);
        await image_utils.atualizarLesaoMaisGraveNaImagem(
            id_imagem,
            todasClassificacoes
        );
    }
};

async function validarRequisicao(req) {

    if (!ValidarTipo.ehNumero(req.params.id_imagem)) {
        ObjetoExcecao.status = HttpStatus.BAD_REQUEST;
        ObjetoExcecao.title = Excecao.PARAMETROS_INVALIDOS;
        ObjetoExcecao.detail = "Route parameter invalid";
        throw ObjetoExcecao;
    }

    if (!req.body.codigo_lamina || !req.body.dt_aquisicao || !ValidarTipo.ehNumero(req.body.id_lesao_celula) ||
        !ValidarTipo.ehNumero(req.body.id_celula)) {
        ObjetoExcecao.status = HttpStatus.BAD_REQUEST;
        ObjetoExcecao.title = Excecao.PARAMETROS_INVALIDOS;
        ObjetoExcecao.detail = "Body request is invalid";
        throw ObjetoExcecao;
    }

    const imagemTask = ImagemRepositorio.obterImagemPorId(req.params.id_imagem);
    const celulaTask = ImagemRepositorio.obterCelulaPorId(req.body.id_celula);
    const [imagem, celula] = await Promise.all([imagemTask, celulaTask]);

    if (!imagem) {
        ObjetoExcecao.status = HttpStatus.NOT_FOUND;
        ObjetoExcecao.title = Excecao.IMAGEM_NAO_ENCONTRADA;
        throw ObjetoExcecao;
    }

    if(!celula) {
        ObjetoExcecao.status = HttpStatus.NOT_FOUND;
        ObjetoExcecao.title = Excecao.CELULA_NAO_ENCONTRADA;
        throw ObjetoExcecao;
    }

    await ValidadorDeSessao.login_required(req, usuario.id);
}
