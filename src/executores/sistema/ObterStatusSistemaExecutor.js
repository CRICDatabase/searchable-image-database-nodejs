'use strict'

const Excecao = require('../../utils/enumeracoes/mensagem_excecoes');
const ObjetoExcecao = require('../../utils/enumeracoes/controle_de_excecoes');
const HttpStatus = require('http-status-codes');
const ValidarTipo = require('../../utils/validacao_de_tipos');

module.exports = {

    Executar(req) {

        const informacoesDoSistema = {
            descricao: 'CRIC - Cell Recognition For Inspection of Cervix',
            versao: '1.0.0'
        };

        return informacoesDoSistema;
    }
}