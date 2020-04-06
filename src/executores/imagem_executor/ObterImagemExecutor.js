'use strict';

const Excecao = require('../../utils/enumeracoes/mensagem_excecoes');
const ObjetoExcecao = require('../../utils/enumeracoes/controle_de_excecoes');
const HttpStatus = require('http-status-codes');
const ImagemModel = require('../../models/ImagemModel');
const ValidadorDeSessao = require('../../utils/validador_de_sessao');
const ImagemRepositorio = require('../../repositorios/imagem_repositorio');
module.exports = {

    async Executar(req) {

        await ValidadorDeSessao.validarAcessoAServicos(req);
        validarRequisicao(req);
        const imagem = await ImagemRepositorio.obterImagemPorId(req.params.id_imagem);
        if(!imagem) {
            ObjetoExcecao.status_code = HttpStatus.NOT_FOUND;
            ObjetoExcecao.mensagem = Excecao.IMAGEM_NAO_ENCONTRADA;
            throw ObjetoExcecao;
        }
        return await prepararRetorno(imagem); 
    }
};

function validarRequisicao(req) {

    if(Number.isNaN(parseInt(req.params.id_imagem))) {
        ObjetoExcecao.status_code = HttpStatus.BAD_REQUEST;
        ObjetoExcecao.mensagem = Excecao.PARAMETROS_INVALIDOS;
        throw ObjetoExcecao;
    }
}

async function prepararRetorno(imagem) {

    let resultado;
    const lesao = await ImagemRepositorio.obterLesaoPorId(imagem.dataValues.id_lesao);

    resultado = {
        id: imagem.dataValues.id,
        nome: imagem.dataValues.nome,
        codigo_lamina: imagem.dataValues.codigo_lamina,
        excluida: imagem.dataValues.excluida,
        classificacao_aprovada: imagem.dataValues.classificacao_aprovada,
        dt_aquisicao: imagem.dataValues.dt_aquisicao,
        fonte_aquisicao: imagem.dataValues.fonte_aquisicao,
        caminho_imagem: imagem.dataValues.caminho_imagem,
        altura: imagem.dataValues.altura,
        largura: imagem.dataValues.largura,
        createdAt: imagem.dataValues.createdAt,
        updatedAt: imagem.dataValues.updatedAt,
        id_usuario: imagem.dataValues.id_usuario,
        lesao: lesao
    };

    return resultado;
}