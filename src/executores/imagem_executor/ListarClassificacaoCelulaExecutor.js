'use strict';

const Excecao = require('../../utils/enumeracoes/mensagem_excecoes');
const ObjetoExcecao = require('../../utils/enumeracoes/controle_de_excecoes');
const HttpStatus = require('http-status-codes');
const ValidarTipo = require('../../utils/validacao_de_tipos');
const ImagemRepositorio = require('../../repositorios/imagem_repositorio');
const UsuarioRepositorio = require('../../repositorios/usuario_repositorio');
const ValidadorDeSessao = require('../../utils/validador_de_sessao');

module.exports = {

    async Executar(req) {

        await ValidadorDeSessao.validarAcessoAServicos(req);
        await validarRequisicao(req);

        const id_usuario = parseInt(req.params.id_usuario);
        const id_imagem = parseInt(req.params.id_imagem);

        const analistaCompleto = await UsuarioRepositorio.obterAnalistaPorId(id_usuario);
        const analista = {
            id: analistaCompleto.dataValues.id,
            total_classificacoes: analistaCompleto.dataValues.total_classificacoes,
            total_segmentacoes: analistaCompleto.dataValues.total_segmentacoes
        };

        const todasClassificacoes = await ImagemRepositorio.listarClassificacoesCelula(id_imagem, id_usuario);
        if (todasClassificacoes.length == 0) {            
            let resultado = {
                id_imagem: req.params.id_imagem,
                analista: analista,
                celulas: todasClassificacoes
            };
            return resultado;
        }

        let resultado = {
            id_imagem: req.params.id_imagem,
            analista: analista,
            celulas: await prepararMensagemRetorno(req, todasClassificacoes)
        };

        return resultado;
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

async function prepararMensagemRetorno(req, todasCelulas) {

    let celulas = [];

    for (let i = 0; i < todasCelulas.length; i++) {

        let lesao = await obterLesao(todasCelulas[i].id_lesao);
        celulas.push({
            id_celula: todasCelulas[i].id_celula,
            id_classificacao: todasCelulas[i].id_classificacao,
            tipo_analise_realizada: todasCelulas[i].tipo_analise_realizada,
            coord_centro_nucleo_x: todasCelulas[i].coord_centro_nucleo_x,
            coord_centro_nucleo_y: todasCelulas[i].coord_centro_nucleo_y,
            lesao: lesao
        });
    }

    return celulas;
}

async function obterLesao(id_lesao) {

    const lesaoCompleta = await ImagemRepositorio.obterLesaoPorId(id_lesao);
    const lesao = {
        id: lesaoCompleta.dataValues.id,
        nome: lesaoCompleta.dataValues.nome,
        detalhes: lesaoCompleta.dataValues.detalhes
    };

    return lesao;
}
