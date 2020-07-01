"use strict";

const Excecao = require("../../utils/enumeracoes/mensagem_excecoes");
const ObjetoExcecao = require("../../utils/enumeracoes/controle_de_excecoes");
const HttpStatus = require("http-status-codes");
const ValidarTipo = require("../../utils/validacao_de_tipos");
const UsuarioRepositorio = require("../../repositorios/usuario_repositorio");
const ImagemRepositorio = require("../../repositorios/imagem_repositorio");
const ValidadorDeSessao = require("../../utils/validador_de_sessao");
const ObterImagemExecutor = require("../../executores/imagem_executor/ObterImagemExecutor");
const ListarClassificacaoCelulaExecutor = require("../imagem_executor/ListarClassificacaoCelulaExecutor");

module.exports = {

    async Executar(req) {

        await validarRequisicao(req);

        let requisicao = {
            id_imagem: req.params.id_imagem,
            id_usuario: req.params.id_usuario,
            codigo_lamina: req.body.codigo_lamina,
            dt_aquisicao: req.body.dt_aquisicao,
            id_lesao_celula: req.body.id_lesao_celula,
            id_celula: req.body.id_celula
        };

        const atualizarImagemTask = ImagemRepositorio.atualizarImagem(requisicao);
        const atualizarCelulaTask = ImagemRepositorio.atualizarCelula(requisicao);
        await Promise.all([atualizarImagemTask, atualizarCelulaTask]);
        
        const listaDeClassificacoes = await ListarClassificacaoCelulaExecutor.Executar(req);
        await atualizarLesaoMaisGraveNaImagem(requisicao.id_imagem, listaDeClassificacoes);
        return await ObterImagemExecutor.Executar(req);
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

async function atualizarLesaoMaisGraveNaImagem(id_imagem, listaDeClassificacoes) {

    if(listaDeClassificacoes.celulas.length > 0) {

        let idLesaoMaisGrave = 1;
        listaDeClassificacoes.celulas.forEach(celula => {
            if(celula.lesao.id > idLesaoMaisGrave) {
                idLesaoMaisGrave = celula.lesao.id;
            }
        });

        return ImagemRepositorio.atualizarLesaoImagem(id_imagem, idLesaoMaisGrave);
    }
}
