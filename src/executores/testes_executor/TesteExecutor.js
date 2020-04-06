'use strict';
const ObjetoExcecao = require('../../utils/enumeracoes/controle_de_excecoes');

module.exports = {

    async ExecutarTesteObterUsuarioPorEmail(req) {

        ObjetoExcecao.status_code = 400;
        ObjetoExcecao.mensagem = "Mensagem de teste";
        throw ObjetoExcecao;
    }
};