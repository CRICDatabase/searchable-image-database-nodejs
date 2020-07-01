"use strict";

// eslint-disable-next-line no-unused-vars
const debug = require("debug")("database.cric:ListarImagensExecutor");

const Excecao = require("../../utils/enumeracoes/mensagem_excecoes");
const ObjetoExcecao = require("../../utils/enumeracoes/controle_de_excecoes");
const HttpStatus = require("http-status-codes");
const ImagemRepositorio = require("../../repositorios/imagem_repositorio");
const UsuarioRepositorio = require("../../repositorios/usuario_repositorio");
const ValidarTipo = require("../../utils/validacao_de_tipos");
const ValidadorDeSessao = require("../../utils/validador_de_sessao");

module.exports = {

    async Executar(req) {

        await validarRequisicao(req);

        const todasImagensTask = ImagemRepositorio.listarImagensValidasNoSistema(req.params.id_usuario);
        const [todasImagens] = await Promise.all([todasImagensTask]);

        if(todasImagens.length == 0) {
            ObjetoExcecao.status = HttpStatus.NOT_FOUND;
            ObjetoExcecao.title = Excecao.IMAGEM_NAO_ENCONTRADA;
            throw ObjetoExcecao;
        }

        return await enrich_images(todasImagens);
    }
};

async function validarRequisicao(req) {

    if (!ValidarTipo.ehNumero(req.params.id_usuario)) {

        ObjetoExcecao.status = HttpStatus.BAD_REQUEST;
        ObjetoExcecao.title = Excecao.PARAMETROS_INVALIDOS;
        throw ObjetoExcecao;
    }

    const usuario = await UsuarioRepositorio.obterUsuarioBasePorId(req.params.id_usuario);
    if (!usuario) {
        ObjetoExcecao.status = HttpStatus.NOT_FOUND;
        ObjetoExcecao.title = Excecao.USUARIO_BASE_NAO_ENCONTRATO;
        throw ObjetoExcecao;
    }

    if (usuario.id > 1) {
        await ValidadorDeSessao.login_required(req, usuario.id);
    }
}

async function enrich_images(listaImagens) {

    let resultado = [];
    for(let i = 0;  i < listaImagens.length; i++) {

        const lesao = await ImagemRepositorio.obterLesaoPorId(listaImagens[i].dataValues.id_lesao);
        const totalClassificacoes = await ImagemRepositorio.obterTotalClassificacoesImagem(listaImagens[i].dataValues.id);
        const totalSegmentacoes = await ImagemRepositorio.obterTotalSegmentacoesImagem(listaImagens[i].dataValues.id);

        resultado.push({
            id: listaImagens[i].dataValues.id,
            nome: listaImagens[i].dataValues.nome,
            codigo_lamina: listaImagens[i].dataValues.codigo_lamina,
            excluida: listaImagens[i].dataValues.excluida,
            classificacao_aprovada: listaImagens[i].dataValues.classificacao_aprovada,
            dt_aquisicao: listaImagens[i].dataValues.dt_aquisicao,
            fonte_aquisicao: listaImagens[i].dataValues.fonte_aquisicao,
            caminho_imagem: listaImagens[i].dataValues.caminho_imagem,
            altura: listaImagens[i].dataValues.altura,
            largura: listaImagens[i].dataValues.largura,
            createdAt: listaImagens[i].dataValues.createdAt,
            updatedAt: listaImagens[i].dataValues.updatedAt,
            id_usuario: listaImagens[i].dataValues.id_usuario,
            lesao: lesao,
            total_segmentacoes: totalSegmentacoes,
            total_classificacoes: totalClassificacoes
        });
    }

    return resultado;
}
