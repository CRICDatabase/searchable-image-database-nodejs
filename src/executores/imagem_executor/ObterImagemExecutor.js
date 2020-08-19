"use strict";

// eslint-disable-next-line no-unused-vars
const debug = require("debug")("database.cric:ObterImagemExecutor");

const HttpStatus = require("http-status-codes");

const UsuarioRepositorio = require("../../repositorios/usuario_repositorio");
const ImagemRepositorio = require("../../repositorios/imagem_repositorio");

const Excecao = require("../../utils/enumeracoes/mensagem_excecoes");
const ObjetoExcecao = require("../../utils/enumeracoes/controle_de_excecoes");
const gate_keeper = require("../../utils/gate_keeper");

module.exports = {

    async Executar(req, res) {

        const imagem = await ImagemRepositorio.obterImagemPorId(req.params.id_imagem);

        if(!imagem) {
            ObjetoExcecao.status = HttpStatus.NOT_FOUND;
            ObjetoExcecao.title = Excecao.IMAGEM_NAO_ENCONTRADA;
            throw ObjetoExcecao;
        }

        gate_keeper.check_loose_ownership(
            imagem,
            res.locals.user
        );

        return await prepararRetorno(imagem);
    }
};

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
