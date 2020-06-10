"use strict";

const HttpStatus = require("http-status-codes");

const Excecao = require("../../utils/enumeracoes/mensagem_excecoes");
const ObjetoExcecao = require("../../utils/enumeracoes/controle_de_excecoes");
const ImagemRepositorio = require("../../repositorios/imagem_repositorio");

module.exports = {

    async Executar(req) {

        validarRequisicao(req);
        const imagem = await ImagemRepositorio.obterImagemPorId(req.params.id_imagem);
        if(!imagem) {
            ObjetoExcecao.status = HttpStatus.NOT_FOUND;
            ObjetoExcecao.title = Excecao.IMAGEM_NAO_ENCONTRADA;
            throw ObjetoExcecao;
        }
        return await prepararRetorno(imagem); 
    }
};

function validarRequisicao(req) {

    if(Number.isNaN(parseInt(req.params.id_imagem))) {
        ObjetoExcecao.status = HttpStatus.BAD_REQUEST;
        ObjetoExcecao.title = Excecao.PARAMETROS_INVALIDOS;
        throw ObjetoExcecao;
    }
}

async function prepararRetorno(imagem) {

    let resultado = {
        ...imagem.dataValues
    };

    resultado.lesao = await ImagemRepositorio.obterLesaoPorId(
        resultado.id_lesao
    );

    delete resultado.id_lesao;

    return resultado;
}
