"use strict";

// eslint-disable-next-line no-unused-vars
const debug = require("debug")("database.cric:ListarImagensExecutor");

const HttpStatus = require("http-status-codes");
const validator = require('validator');

const ImagemRepositorio = require("../../repositorios/imagem_repositorio");
const UsuarioRepositorio = require("../../repositorios/usuario_repositorio");

const Excecao = require("../../utils/enumeracoes/mensagem_excecoes");
const ObjetoExcecao = require("../../utils/enumeracoes/controle_de_excecoes");

module.exports = {

    async Executar(req, res) {

        await validarRequisicao(req);
        const user_id = req.query.id_usuario ? Number(req.query.id_usuario) : undefined;

        let todasImagensTask;
        if (typeof res.locals.user === "undefined") {
            todasImagensTask = ImagemRepositorio.list_public_images_from_user(user_id);
        }
        else {
            if (res.locals.user.admin) {
                todasImagensTask = ImagemRepositorio.list_all_images_from_user(user_id);
            }
            else {
                if (res.locals.user.id === user_id) {
                    todasImagensTask = ImagemRepositorio.list_images_from_user(user_id);
                }
                else {
                    todasImagensTask = ImagemRepositorio.list_public_images_from_user(user_id);
                }
            }
        }
        const [todasImagens] = await Promise.all([todasImagensTask]);

        return await enrich_images(todasImagens);
    }
};

async function validarRequisicao(req) {

    if (req.query.id_usuario) {
        if (!validator.isNumeric(req.query.id_usuario)) {

            ObjetoExcecao.status = HttpStatus.BAD_REQUEST;
            ObjetoExcecao.title = Excecao.PARAMETROS_INVALIDOS;
            throw ObjetoExcecao;
        }

        const usuario = await UsuarioRepositorio.obterUsuarioBasePorId(req.query.id_usuario);
        if (!usuario) {
            ObjetoExcecao.status = HttpStatus.NOT_FOUND;
            ObjetoExcecao.title = Excecao.USUARIO_BASE_NAO_ENCONTRATO;
            throw ObjetoExcecao;
        }
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
