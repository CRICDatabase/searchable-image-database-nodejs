'use strict';
const ObjetoExcecao = require('../../utils/enumeracoes/controle_de_excecoes');

module.exports = {

    async ExecutarTesteObterUsuarioPorEmail(req) {

        ObjetoExcecao.status = 400;
        ObjetoExcecao.title = "Mensagem de teste";
        throw ObjetoExcecao;
    }
};