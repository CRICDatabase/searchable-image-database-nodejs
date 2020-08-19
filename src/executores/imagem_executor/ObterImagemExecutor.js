"use strict";

// eslint-disable-next-line no-unused-vars
const debug = require("debug")("database.cric:ObterImagemExecutor");

const HttpStatus = require("http-status-codes");

const UsuarioRepositorio = require("../../repositorios/usuario_repositorio");
const ImagemRepositorio = require("../../repositorios/imagem_repositorio");

const Excecao = require("../../utils/enumeracoes/mensagem_excecoes");
const ObjetoExcecao = require("../../utils/enumeracoes/controle_de_excecoes");

module.exports = {

    async Executar(req, res) {

        await validarRequisicao(req);
        const imagem = await ImagemRepositorio.obterImagemPorId(req.params.id_imagem);
        if(!imagem) {
            ObjetoExcecao.status = HttpStatus.NOT_FOUND;
            ObjetoExcecao.title = Excecao.IMAGEM_NAO_ENCONTRADA;
            throw ObjetoExcecao;
        }
        return await prepararRetorno(imagem);
    }
};

async function validarRequisicao(req) {

    const imagemTask = ImagemRepositorio.obterImagemPorId(req.params.id_imagem);
    const [imagem] = await Promise.all([imagemTask]);

    if (!imagem) {
        ObjetoExcecao.status = HttpStatus.NOT_FOUND;
        ObjetoExcecao.title = Excecao.IMAGEM_NAO_ENCONTRADA;
        throw ObjetoExcecao;
    }

    if (imagem.id_usuario > 1) {
    }
}

async function prepararRetorno(imagem) {

    let resultado = {
        ...imagem.dataValues
    };

    resultado.lesao = await ImagemRepositorio.obterLesaoPorId(
        resultado.id_lesao
    );

    resultado.usuario = await UsuarioRepositorio.obterUsuarioBasePorId(
        resultado.id_usuario
    );

    delete resultado.id_lesao;
    delete resultado.id_usuario;

    return resultado;
}
