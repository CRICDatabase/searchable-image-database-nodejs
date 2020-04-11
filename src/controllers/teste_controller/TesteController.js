'use strict'

const HttpStatus = require('http-status-codes');
const TesteExecutor = require('../../executores/testes_executor/TesteExecutor');
const PromiseExecutor = require('../../executores/testes_executor/PromiseExecutor');

module.exports = {

    async metodoTeste_01(req, res) {

        try {
            const resultado = await TesteExecutor.ExecutarTesteObterUsuarioPorEmail(req);
            return res.status(HttpStatus.OK).json(resultado);

        }
        catch (erro) {

            if(erro.status_code == HttpStatus.BAD_REQUEST) {
                return res.status(HttpStatus.BAD_REQUEST).json(erro);
            }

            return res.status(HttpStatus.BAD_REQUEST).json(erro);
        }
    },

    async escrevendoUmaPromise(req, res) {

        try {
            const resultado = await PromiseExecutor.Executar(req);
            return res.status(HttpStatus.OK).json(resultado);

        }
        catch (erro) {
            return res.status(HttpStatus.BAD_REQUEST).json(erro);
        }
    },
}