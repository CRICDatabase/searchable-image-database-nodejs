'use strict';

const Excecao = require('../../utils/enumeracoes/mensagem_excecoes');
const ObjetoExcecao = require('../../utils/enumeracoes/controle_de_excecoes');
const HttpStatus = require('http-status-codes');
const ImagemRepositorio = require('../../repositorios/imagem_repositorio');
const ValidadorDeSessao = require('../../utils/validador_de_sessao');

module.exports = {

    async Executar(req) {
        
        await ValidadorDeSessao.validarAcessoAServicos(req);
        const todasDescricoes = await ImagemRepositorio.listarDescricoes();

        if(todasDescricoes.length == 0) {
            ObjetoExcecao.status = HttpStatus.NOT_FOUND;
            ObjetoExcecao.title = Excecao.DESCRICAO_NAO_ENCONTRADA;
            throw ObjetoExcecao;
        }

        return todasDescricoes;
    }
};